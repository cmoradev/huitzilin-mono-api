import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import Decimal from 'decimal.js';
import { Debit } from 'src/school';
import { In, Repository } from 'typeorm';
import {
  CreateConceptInput,
  CreateConceptInputWithDebit,
} from '../concept/dto/create-concept.input';
import { CreatePaymentInput } from '../payment/dto/create-payment.input';
import { CreateIncomeInput } from './dto/create-income.input';
import { Income } from './entities/income.entity';
import {
  calculateAmount,
  calculateSubtotalAndDiscount,
  calculateTotalFromBaseAndTax,
  TaxEnum,
} from 'src/common/lib/calculations';
import { Discount } from 'src/miscellaneous';
import { CreateConceptPayload } from '../concept/types';

@Injectable()
export class IncomeService extends TypeOrmQueryService<Income> {
  constructor(
    @InjectRepository(Income)
    private readonly _incomeRepository: Repository<Income>,
    @InjectRepository(Debit)
    private readonly _debitRepository: Repository<Debit>,
    @InjectRepository(Discount)
    private readonly _discountRepository: Repository<Discount>,
  ) {
    super(_incomeRepository, { useSoftDelete: true });
  }

  public async createIncomes(params: CreateIncomeInput) {
    const { concepts, payments } = params;

    const debits = await this._fetchDebitsFromConcepts(concepts);

    const discounts = await this._fetchDiscountsFromConcepts(concepts);

    const matches = this._matchConceptWithDebit(concepts, debits);

    const details = this._applyCalculationsInConcepts(matches, discounts);

    this._applyPaymentsInConcepts(details, payments);

    console.log('Details:', details);

    // this._buildIncomes(matches, payments);

    // const debitGroups = await this._groupDebitsByBranch(concepts);

    // debitGroups.forEach((debits, branchId) => {});

    // console.log('Creating incomes with params:', params);

    return [];
  }

  private _applyPaymentsInConcepts(
    details: CreateConceptPayload[],
    payments: CreatePaymentInput[],
  ) {
    payments.sort((a, b) => b.amount - a.amount);

    details.sort((a, b) => b.dueDate.getTime() - a.dueDate.getTime());

    const received = payments.reduce(
      (acc, payment) => acc.plus(payment.amount),
      new Decimal(0),
    );

    console.log('Received amount:', received.toString());
    console.log('Payments:', payments);
    console.log('Details:', details);

    // matches.forEach((concepts, branchId) => {
    //   // TODO: Revisar los calculos de pagos y conceptos
    //   concepts.forEach((concept) => {
    //     const { unitPrice, quantity, amount } = calculateAmount(
    //       concept.unitPrice,
    //       concept.quantity,
    //     );

    //     if (received.greaterThanOrEqualTo(concept.total)) {
    //       received = received.minus(concept.total);
    //       // concept.debit.paymentDate = new Date();
    //       // concept.debit.state = DebitState.PAID;
    //       // concept.pendingPayment = 0;
    //     } else if (received.greaterThan(0)) {
    //       received = new Decimal(0);
    //       // concept.debit.paymentDate = new Date();
    //       // concept.debit.state = DebitState.PARTIALLY_PAID;

    //       // const total = new Decimal(concept.total);
    //       // concept.pendingPayment = total.minus(received).toNumber();
    //     }
    //   });

    //   console.log(`Branch ID: ${branchId}`);
    //   console.log('Concepts:', concepts);
    // });
  }

  private _applyCalculationsInConcepts(
    concepts: CreateConceptInputWithDebit[],
    allDiscounts: Discount[],
  ): CreateConceptPayload[] {
    return concepts.map((concept) => {
      const { unitPrice, quantity, amount } = calculateAmount(
        concept.unitPrice,
        concept.quantity,
      );

      // Optimiza la búsqueda de descuentos usando un Set para O(1) lookups
      const discountIdsSet = new Set(concept.discounts.map((c) => c.id));
      const discounts = allDiscounts.filter((d) => discountIdsSet.has(d.id));

      const { discount, subtotal } = calculateSubtotalAndDiscount(
        amount,
        discounts,
      );

      const { taxes, total } = calculateTotalFromBaseAndTax(
        subtotal,
        concept.withTax ? TaxEnum.Sixteen : TaxEnum.Zero,
      );

      return {
        description: concept.description,
        amount,
        unitPrice,
        quantity,
        subtotal,
        discount,
        taxes,
        total,
        dueDate: new Date(concept.debit.dueDate),
        withTax: concept.withTax,
        debitId: concept.debit.id,
        branchId: concept.debit.enrollment.branchId,
        discounts: discounts.map((d) => ({
          id: d.id,
        })),
      };
    });
  }

  private _matchConceptWithDebit(
    concepts: CreateConceptInput[],
    debits: Debit[],
  ): CreateConceptInputWithDebit[] {
    return concepts.map((concept) => {
      const debit = debits.find((d) => d.id === concept.debitId);

      if (!debit) {
        throw new ConflictException(
          `Debit with ID ${concept.debitId} not found`,
        );
      }

      return { ...concept, debit };
    });
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
}
