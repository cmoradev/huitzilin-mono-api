import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ListenPaymentDto } from './dto/listen-payment.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { ClipLink } from '../clip-links/entities/clip-link.entity';
import { Repository, MoreThan, DataSource } from 'typeorm';
import { getStateLink } from './helpers';
import { ConceptMetadata, LinkClipStatus } from 'src/finance/income/types';
import { StateLinkResponse } from './types';
import { Concept, Income, Payment } from 'src/finance';
import { IncomeState } from 'src/finance/income/enum';
import { CreatePaymentInput } from 'src/finance/payment/dto/create-payment.input';
import { PaymentMethod, PaymentState } from 'src/finance/payment/enum';
import {
  applyClipPaymentInConcepts,
  applyClipPaymentInIncome,
  prepareConceptWithDebit,
} from 'src/finance/income/helpers';
import { Debit } from 'src/school';

@Injectable()
export class WebhookService {
  constructor(
    @InjectRepository(ClipLink)
    private readonly _clipLinkRepository: Repository<ClipLink>,
    @InjectRepository(Income)
    private readonly _incomeRepository: Repository<Income>,
    @InjectRepository(Payment)
    private readonly _paymentRepository: Repository<Payment>,
    @InjectRepository(Concept)
    private readonly _conceptRepository: Repository<Concept>,
    @InjectDataSource() public dataSource: DataSource,
  ) {}

  /**
   * TODO: Implementar colas
   */
  async listenClipUpdates(params: ListenPaymentDto) {
    const { account } = await this.getAccount(params);

    const state = await getStateLink(params.id, account.token);

    await this.saveOnlyPayment(state);

    return params;
  }

  async saveOnlyPayment(state: StateLinkResponse) {
    if (state.status === LinkClipStatus.CHECKOUT_COMPLETED) {
      const {
        metadata: { external_reference },
      } = state;

      const { income, concepts } = await this.getIncome(external_reference);

      if (!income.pendingPayment || income.state !== IncomeState.PENDING)
        return;

      const conceptBulk = prepareConceptWithDebit(concepts);

      const payment: CreatePaymentInput = {
        date: new Date(),
        bank: 'Clip',
        amount: state.amount,
        transaction: state.receipt_no,
        method: PaymentMethod.CLIP,
      };

      const updatedConcepts = applyClipPaymentInConcepts(conceptBulk, payment);

      const updatedIncome = applyClipPaymentInIncome(income, payment);

      await this._saveClipPayment(updatedIncome, updatedConcepts, payment);
    }
  }

  private async _saveClipPayment(
    income: Income,
    concepts: ConceptMetadata[],
    payment: CreatePaymentInput,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(Income, {
        id: income.id,
        state: income.state,
        pendingPayment: income.pendingPayment,
      });

      await queryRunner.manager.save(Payment, {
        method: payment.method,
        amount: payment.amount,
        date: payment.date,
        state: PaymentState.PAID,
        bank: payment.bank,
        transaction: payment.transaction,
        incomeId: income.id,
      });

      const conceptUpdates: Concept[] = concepts.map(
        (concept) =>
          ({
            id: concept.conceptId,
            pendingPayment: concept.conceptPendingPayment,
          }) as Concept,
      );

      await queryRunner.manager.save(Concept, conceptUpdates);

      const debitUpdates: Debit[] = concepts.map(
        (concept) =>
          ({
            id: concept.debitId,
            state: concept.debitState,
            paymentDate: concept.debitPaymentDate,
          }) as Debit,
      );

      await queryRunner.manager.save(Debit, debitUpdates);

      await queryRunner.commitTransaction();
    } catch (error) {
      console.error('Error error:', error);
      console.error('Error income:', income);
      console.error('Error concepts:', concepts);
      console.error('Error payment:', payment);
      await queryRunner.rollbackTransaction();
      throw new NotFoundException('¡No hemos podido actualizar la venta!');
    } finally {
      await queryRunner.release();
    }
  }

  private async getIncome(incomeId: string) {
    const income = await this._incomeRepository.findOne({
      where: { id: incomeId },
    });

    if (!income) {
      throw new ConflictException(
        `No se encontró el ingreso con id: ${incomeId}`,
      );
    }

    const concepts: Array<Concept> = await this._conceptRepository.find({
      where: { incomeId: income.id, pendingPayment: MoreThan(0) },
      relations: ['debits'],
    });

    return {
      income,
      concepts,
    };
  }

  private async getAccount(params: ListenPaymentDto) {
    const link = await this._clipLinkRepository.findOne({
      where: { requestId: params.id },
      relations: ['account'],
    });

    if (!link?.id && !link?.account?.id) {
      throw new ConflictException(
        `No se encontró el link con requestId: ${params.id}`,
      );
    }

    return {
      account: link.account,
      linkId: link.id,
    };
  }
}
