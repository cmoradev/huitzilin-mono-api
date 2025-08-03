import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { ClipAccount, ClipLink, Discount } from 'src/miscellaneous';
import { Debit } from 'src/school';
import { DataSource, In, Repository } from 'typeorm';
import { CreateConceptInput } from '../concept/dto/create-concept.input';
import { Concept } from '../concept/entities/concept.entity';
import { Payment } from '../payment/entities/payment.entity';
import { PaymentState } from '../payment/enum';
import { AddPaymentInput } from './dto';
import { AccountsReceivableInput } from './dto/accounts-receivable.input';
import {
  CreateIncomeInput,
  CreateLinkIncomeInput,
} from './dto/create-income.input';
import { Income } from './entities/income.entity';
import {
  applyCalculationsInConcepts,
  applyPaymentsInConcepts,
  buildIncomesWithoutPayments,
  buildIncomesWithPayments,
  createLinkClip,
  matchConceptWithDebit,
} from './helpers';
import { CreateIncomePayload } from './types';

@Injectable()
export class IncomeService extends TypeOrmQueryService<Income> {
  constructor(
    @InjectRepository(Income)
    private readonly _incomeRepository: Repository<Income>,
    @InjectRepository(Debit)
    private readonly _debitRepository: Repository<Debit>,
    @InjectRepository(Discount)
    private readonly _discountRepository: Repository<Discount>,
    @InjectRepository(ClipAccount)
    private readonly _clipAccountRepository: Repository<ClipAccount>,
    @InjectRepository(Concept)
    private readonly _conceptRepository: Repository<Concept>,
    @InjectDataSource() public dataSource: DataSource,
  ) {
    super(_incomeRepository, { useSoftDelete: true });
  }

  public async getAccountsReceivable(params: AccountsReceivableInput) {
    const { debitId } = params;

    const debitQuery = this._debitRepository.createQueryBuilder('debit');

    debitQuery.leftJoinAndMapOne(
      'debit.related',
      (query) =>
        query
          .select(['related.conceptsId', 'related.debtsId'])
          .from('concepts_to_debits', 'related')
          .distinctOn(['related.debtsId'])
          .orderBy('related.debtsId', 'ASC'),
      'related',
      'related."related_debtsId" = debit.id',
    );

    debitQuery.select([
      'debit.id',
      'debit.state',
      'debit.dueDate',
      'debit.paymentDate',
      'related."related_conceptsId"',
    ]);

    debitQuery.where('debit.id = :debitId', { debitId });

    const debit = await debitQuery.getRawOne();

    const conceptId = debit?.related_conceptsId;

    if (!conceptId) throw new NotFoundException('¡Concepto no encontrado!');

    const incomeQuery = this._incomeRepository.createQueryBuilder('income');

    incomeQuery.leftJoinAndSelect('income.concepts', 'concept');
    incomeQuery.leftJoinAndSelect('concept.discounts', 'discount');
    incomeQuery.leftJoinAndSelect('income.payments', 'payment');
    incomeQuery.leftJoinAndSelect('income.clipLinks', 'links');

    incomeQuery.where('concept.id = :conceptId', { conceptId });

    const income = await incomeQuery.getOne();

    if (!income) throw new NotFoundException('Ingreso no encontrado!');

    return income;
  }

  public async addPaymentToIncome(params: AddPaymentInput) {
    const { id, payments } = params;

    const { income, concepts } = await this._fetchIncome(id);

    console.log(income, concepts, payments);

    return income;
  }

  public async createLinkIncomes(params: CreateLinkIncomeInput) {
    const { concepts, branchID, studentIDs } = params;

    const debits = await this._fetchDebitsFromConcepts(concepts);
    const matches = matchConceptWithDebit(concepts, debits);
    const discounts = await this._fetchDiscountsFromConcepts(concepts);
    const calculations = applyCalculationsInConcepts(matches, discounts);

    const income = buildIncomesWithoutPayments(
      calculations,
      branchID,
      studentIDs,
    );

    return this._saveIncome(income, true);
  }

  public async createIncomes(params: CreateIncomeInput) {
    const { concepts, payments, branchID, studentIDs } = params;

    const debits = await this._fetchDebitsFromConcepts(concepts);
    const matches = matchConceptWithDebit(concepts, debits);
    const discounts = await this._fetchDiscountsFromConcepts(concepts);
    const calculations = applyCalculationsInConcepts(matches, discounts);
    const { details } = applyPaymentsInConcepts(calculations, payments);

    const income = buildIncomesWithPayments(
      details,
      payments,
      branchID,
      studentIDs,
    );

    return this._saveIncome(income);
  }

  private async _saveIncome(
    payload: CreateIncomePayload,
    createPaymentLink: boolean = false,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const {
        amount,
        discount,
        subtotal,
        taxes,
        total,
        pendingPayment,
        branchId,
        state,
        studentIds,
        concepts,
        payments,
      } = payload;

      const studentIdsSet = new Set(studentIds);

      const income = await queryRunner.manager.save(Income, {
        date: new Date().toISOString(),
        students: Array.from(studentIdsSet).map((id) => ({ id })),
        state,
        amount,
        discount,
        subtotal,
        taxes,
        total,
        pendingPayment,
        branchId,
      });

      // Concepts
      if (concepts?.length) {
        const payloadConcepts = concepts.map((concept) => {
          const { discounts = [] } = concept;

          const debit = concept.debitId
            ? {
                id: concept.debitId,
              }
            : undefined;

          return {
            incomeId: income.id,
            description: concept.description,
            unitPrice: concept.unitPrice,
            quantity: concept.quantity,
            amount: concept.amount,
            discount: concept.discount,
            subtotal: concept.subtotal,
            taxes: concept.taxes,
            total: concept.total,
            pendingPayment: concept.pendingPayment,
            withTax: concept.withTax,
            discounts: discounts.map((d) => ({ id: d.id }) as Discount),
            debits: debit ? [debit] : [],
          };
        });

        income.concepts = await queryRunner.manager.save(
          Concept,
          payloadConcepts,
        );

        if (createPaymentLink) {
          const clipAccount = await this._getClipAccount(branchId);

          if (!clipAccount) {
            throw new NotFoundException(
              '¡No hemos podido encontrar la cuenta CLIP!',
            );
          }

          const link = await createLinkClip(clipAccount, income);

          if (link) {
            const clipLink: ClipLink = await queryRunner.manager.save(
              ClipLink,
              {
                amount: income.pendingPayment,
                qr: link.qr_image_url,
                link: link.payment_request_url,
                expiresAt: new Date(link.expires_at),
                requestId: link.payment_request_id,
                incomeId: income.id,
                accountId: clipAccount.id,
              },
            );

            income.clipLinks = [clipLink];
          }
        }
      }

      if (payments?.length) {
        const payloadPayments: Payment[] = payments.map(
          (payment) =>
            ({
              method: payment.method,
              amount: payment.amount,
              date: payment.date,
              state: PaymentState.PAID,
              bank: payment.bank,
              transaction: payment.transaction,
              incomeId: income.id,
            }) as Payment,
        );

        income.payments = await queryRunner.manager.save(
          Payment,
          payloadPayments,
        );
      }

      if (payload.concepts?.length) {
        const debitUpdates: Debit[] = concepts
          .filter(
            (concept) =>
              !!concept.debitId && !!concept.state && !!concept.paymentDate,
          )
          .map(
            (concept) =>
              ({
                id: concept.debitId,
                state: concept.state,
                paymentDate: concept.paymentDate,
              }) as Debit,
          );

        await queryRunner.manager.save(Debit, debitUpdates);
      }

      await queryRunner.commitTransaction();

      return income;
    } catch (error) {
      console.error('Error saving incomes:', error);
      await queryRunner.rollbackTransaction();
      throw new NotFoundException('¡No hemos podido crear la venta!');
    } finally {
      await queryRunner.release();
    }
  }

  private async _fetchDebitsFromConcepts(concepts: CreateConceptInput[]) {
    const debitIds = concepts
      .filter((concept) => !!concept.debitId)
      .map((concept) => concept.debitId);

    if (!debitIds.length) return [];

    return this._debitRepository.find({
      where: { id: In(debitIds) },
      relations: ['enrollment'],
      order: { dueDate: 'ASC' },
    });
  }

  private async _fetchDiscountsFromConcepts(concepts: CreateConceptInput[]) {
    const discountIds = concepts.flatMap((concept) =>
      concept.discounts.map((d) => d.id),
    );

    if (!discountIds.length) return [];

    return this._discountRepository.find({
      where: { id: In(discountIds) },
    });
  }

  private async _getClipAccount(branchId: string) {
    return this._clipAccountRepository.findOne({
      where: { branchs: { id: branchId } },
    });
  }

  private async _fetchIncome(ID: string) {
    const income = await this._incomeRepository.findOne({ where: { id: ID } });

    if (!income) {
      throw new NotFoundException('¡Venta no encontrada!');
    }

    const concepts = await this._conceptRepository.find({
      where: {
        incomeId: ID,
      },
      relations: ['discounts', 'debits'],
    });

    return {
      income,
      concepts,
    };
  }
}
