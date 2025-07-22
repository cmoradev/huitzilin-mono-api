import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { Debit } from 'src/school';
import { DataSource, In, Repository } from 'typeorm';
import { CreateConceptInput } from '../concept/dto/create-concept.input';
import {
  CreateIncomeInput,
  CreateLinkIncomeInput,
} from './dto/create-income.input';
import { Income } from './entities/income.entity';
import { ClipAccount, ClipLink, Discount } from 'src/miscellaneous';
import {
  applyCalculationsInConcepts,
  applyPaymentsInConcepts,
  buildIncomesWithoutPayments,
  buildIncomesWithPayments,
  createLinkClip,
  detailsGroupByBranchID,
  matchConceptWithDebit,
} from './helpers';
import { CreateIncomePayload } from './types';
import { Concept } from '../concept/entities/concept.entity';
import { Payment } from '../payment/entities/payment.entity';
import { PaymentState } from '../payment/enum';

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
    @InjectDataSource() public dataSource: DataSource,
  ) {
    super(_incomeRepository, { useSoftDelete: true });
  }

  public async createLinkIncomes(params: CreateLinkIncomeInput) {
    const { concepts } = params;

    const debits = await this._fetchDebitsFromConcepts(concepts);
    const matches = matchConceptWithDebit(concepts, debits);
    const discounts = await this._fetchDiscountsFromConcepts(concepts);
    const details = applyCalculationsInConcepts(matches, discounts);
    const groupDetails = detailsGroupByBranchID(details);
    const incomes = buildIncomesWithoutPayments(groupDetails);
    return this._saveIncomes(incomes, true);
  }

  public async createIncomes(params: CreateIncomeInput) {
    const { concepts, payments } = params;

    const debits = await this._fetchDebitsFromConcepts(concepts);
    const discounts = await this._fetchDiscountsFromConcepts(concepts);
    const matches = matchConceptWithDebit(concepts, debits);
    const calculations = applyCalculationsInConcepts(matches, discounts);
    const { details } = applyPaymentsInConcepts(calculations, payments);
    const groupDetails = detailsGroupByBranchID(details);
    const incomes = buildIncomesWithPayments(groupDetails, payments);

    return this._saveIncomes(incomes);
  }

  private async _saveIncomes(
    bulk: CreateIncomePayload[],
    createPaymentLink: boolean = false,
  ) {
    if (bulk.length === 0) {
      throw new NotFoundException('¡No hemos podido crear la venta!');
    }

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const incomes: Income[] = [];

    try {
      for (const payload of bulk) {
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
        } = payload;

        const income = await queryRunner.manager.save(Income, {
          date: new Date().toISOString(),
          students: studentIds.map((id) => ({ id })),
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
        if (payload.concepts?.length) {
          const conceptsWithIncome: Concept[] = payload.concepts.map(
            (concept) =>
              ({
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
                incomeId: income.id,
                discounts: concept.discounts.map(
                  (d) =>
                    ({
                      id: d.id,
                    }) as Discount,
                ),
                debits: [{ id: concept.debitId } as Debit],
              }) as Concept,
          );

          income.concepts = await queryRunner.manager.save(
            Concept,
            conceptsWithIncome,
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

        if (payload.payments?.length) {
          const paymentsWithIncome: Payment[] = payload.payments.map(
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
          // const payments =
          await queryRunner.manager.save(Payment, paymentsWithIncome);
        }

        if (payload.concepts?.length) {
          const debitUpdates: Debit[] = payload.concepts.map(
            (concept) =>
              ({
                id: concept.debitId,
                state: concept.state,
                paymentDate: concept.paymentDate,
              }) as Debit,
          );

          await queryRunner.manager.save(Debit, debitUpdates);
        }

        incomes.push(income);
      }

      await queryRunner.commitTransaction();

      return incomes;
    } catch (error) {
      console.error('Error saving incomes:', error);
      await queryRunner.rollbackTransaction();
      throw new NotFoundException('¡No hemos podido crear la venta!');
    } finally {
      await queryRunner.release();
    }
  }

  private async _fetchDebitsFromConcepts(concepts: CreateConceptInput[]) {
    const debitIds = concepts.map((concept) => concept.debitId);

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

    return this._discountRepository.find({
      where: { id: In(discountIds) },
    });
  }

  private async _getClipAccount(branchId: string) {
    return this._clipAccountRepository.findOne({
      where: { branchs: { id: branchId } },
    });
  }
}
