import { ConflictException } from '@nestjs/common';
import { addDays, endOfDay } from 'date-fns';
import Decimal from 'decimal.js';
import { RequestOptions } from 'https';
import {
  calculateAmount,
  calculateSubtotalAndDiscount,
  calculateTotalFromBaseAndTax,
  TaxEnum,
} from 'src/common/lib/calculations';
import { ClipAccount, Discount } from 'src/miscellaneous';
import { Debit } from 'src/school';
import { DebitState } from 'src/school/debit/enums';
import {
  CreateConceptInput,
  CreateConceptInputWithDebit,
} from '../concept/dto/create-concept.input';
import { Concept } from '../concept/entities/concept.entity';
import { CreateConceptPayload } from '../concept/types';
import { CreatePaymentInput } from '../payment/dto/create-payment.input';
import { Income } from './entities/income.entity';
import { IncomeState } from './enum';
import { CreateIncomePayload } from './types';

export const matchConceptWithDebit = (
  concepts: CreateConceptInput[],
  debits: Debit[],
): CreateConceptInputWithDebit[] => {
  return concepts.map((concept) => {
    const debit = debits.find((d) => d.id === concept.debitId);

    if (!debit) {
      throw new ConflictException(`Debit with ID ${concept.debitId} not found`);
    }

    return { ...concept, debit };
  });
};

export const applyCalculationsInConcepts = (
  concepts: CreateConceptInputWithDebit[],
  allDiscounts: Discount[],
): CreateConceptPayload[] => {
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
      pendingPayment: total,
      dueDate: new Date(concept.debit.dueDate),
      paymentDate: null,
      state: DebitState.DEBT,
      withTax: concept.withTax,
      debitId: concept.debit.id,
      studentId: concept.debit.enrollment.studentId,
      branchId: concept.debit.enrollment.branchId,
      discounts: discounts.map((d) => ({
        id: d.id,
      })),
    };
  });
};

export const applyPaymentsInConcepts = (
  details: CreateConceptPayload[],
  payments: CreatePaymentInput[],
) => {
  payments.sort((a, b) => b.amount - a.amount);

  details.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());

  let received = payments.reduce(
    (acc, payment) => acc.plus(payment.amount),
    new Decimal(0),
  );

  for (const concept of details) {
    const total = new Decimal(concept.total);

    if (received.greaterThan(0)) {
      const paidAmount = Decimal.min(received, total);
      received = received.minus(paidAmount);

      const pendingPayment = total.minus(paidAmount);

      concept.pendingPayment = pendingPayment.toNumber();
      concept.paymentDate = new Date();
      concept.state = pendingPayment.equals(0)
        ? DebitState.PAID
        : DebitState.PARTIALLY_PAID;
    } else break;
  }

  return {
    balance: Number(received.toFixed(2)),
    details,
  };
};

export const detailsGroupByBranchID = (details: CreateConceptPayload[]) => {
  return details.reduce((acc, current) => {
    if (!acc.has(current.branchId)) {
      acc.set(current.branchId, []);
    }

    acc.get(current.branchId)?.push(current);

    return acc;
  }, new Map<string, CreateConceptPayload[]>());
};

export const buildBreakdown = (details: CreateConceptPayload[]) => {
  const initial = {
    amount: new Decimal(0),
    discount: new Decimal(0),
    subtotal: new Decimal(0),
    taxes: new Decimal(0),
    total: new Decimal(0),
    pendingPayment: new Decimal(0),
  };

  const { amount, discount, subtotal, taxes, total, pendingPayment } =
    details.reduce(
      (acc, curr) => ({
        amount: acc.amount.plus(curr.amount),
        discount: acc.discount.plus(curr.discount),
        subtotal: acc.subtotal.plus(curr.subtotal),
        taxes: acc.taxes.plus(curr.taxes),
        total: acc.total.plus(curr.total),
        pendingPayment: acc.pendingPayment.plus(curr.pendingPayment),
      }),
      initial,
    );

  return {
    amount: Number(amount.toFixed(2)),
    discount: Number(discount.toFixed(2)),
    subtotal: Number(subtotal.toFixed(2)),
    taxes: Number(taxes.toFixed(2)),
    total: Number(total.toFixed(2)),
    pendingPayment: Number(pendingPayment.toFixed(2)),
  };
};

export const buildIncomesWithoutPayments = (
  groupDetails: Map<string, CreateConceptPayload[]>,
): Omit<CreateIncomePayload, 'payments'>[] => {
  const incomes: Omit<CreateIncomePayload, 'payments'>[] = [];

  groupDetails.forEach((concepts, branchId) => {
    const studentIds = concepts.map((c) => c.studentId);

    const { amount, discount, subtotal, taxes, total, pendingPayment } =
      buildBreakdown(concepts);

    incomes.push({
      amount,
      discount,
      subtotal,
      taxes,
      total,
      pendingPayment,
      branchId,
      studentIds,
      state: IncomeState.PENDING,
      concepts,
    });
  });

  return incomes;
};

export const buildIncomesWithPayments = (
  groupDetails: Map<string, CreateConceptPayload[]>,
  payments: CreatePaymentInput[],
): CreateIncomePayload[] => {
  let currentPayments = [...payments].sort((a, b) => b.amount - a.amount);

  const incomes: CreateIncomePayload[] = [];

  groupDetails.forEach((concepts, branchId) => {
    const studentIds = concepts.map((c) => c.studentId);

    const { amount, discount, subtotal, taxes, total, pendingPayment } =
      buildBreakdown(concepts);

    const withPending = concepts.some((concept) => concept.pendingPayment > 0);

    const { adjustedPayments, remainingPayments } = distributePaymentsByBranch(
      total,
      currentPayments,
    );

    currentPayments = remainingPayments;

    incomes.push({
      amount,
      discount,
      subtotal,
      taxes,
      total,
      pendingPayment,
      branchId,
      studentIds,
      payments: adjustedPayments,
      state: withPending ? IncomeState.PENDING : IncomeState.PAID,
      concepts,
    });
  });

  return incomes;
};

export const distributePaymentsByBranch = (
  total: number,
  payments: CreatePaymentInput[],
) => {
  let totalDecimal = new Decimal(total);
  // Crear copia de los pagos para no mutar el original
  let remainingPayments = [...payments].sort((a, b) => b.amount - a.amount);

  const adjustedPayments: CreatePaymentInput[] = [];

  remainingPayments.forEach((payment) => {
    const paymentDecimal = new Decimal(payment.amount);

    if (totalDecimal.greaterThanOrEqualTo(paymentDecimal)) {
      adjustedPayments.push(payment);
      totalDecimal = totalDecimal.minus(paymentDecimal);
      payment.amount = 0; // Marcar como pagado
    } else if (paymentDecimal.greaterThanOrEqualTo(totalDecimal)) {
      // Si el pago es mayor que lo que falta por pagar, ajustar el pago
      adjustedPayments.push({
        ...payment,
        amount: totalDecimal.toNumber(),
      });
      payment.amount = paymentDecimal.minus(totalDecimal).toNumber();
    }
  });

  remainingPayments = remainingPayments.filter((payment) => payment.amount > 0);

  return {
    adjustedPayments,
    remainingPayments,
  };
};

export const createLinkClip = (clipAccount: ClipAccount, income: Income) => {
  const {
    token,
    webhook,
    success: successUrl,
    error: errorUrl,
    default: defaultUrl,
  } = clipAccount;

  const { pendingPayment, id, concepts } = income;

  const expireDate = endOfDay(addDays(new Date(), 7)).toISOString();

  const purchaseDescription = generatePurchaseDescription(concepts);

  const data = JSON.stringify({
    amount: pendingPayment,
    currency: 'MXN',
    webhook_url: webhook,
    purchase_description: purchaseDescription,
    metadata: { external_reference: id },
    expires_at: expireDate,
    redirection_url: {
      success:
        'https://my-website.com/redirection/success?external_reference=OID123456789',
      error:
        'https://my-website.com/redirection/error?external_reference=OID123456789',
      default: 'https://my-website.com/redirection/default',
    },
  });

  const options: RequestOptions = {
    hostname: 'api.payclip.com',
    path: '/v2/checkout',
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
  };
  console.log('Clip Account Token:', data, options);
  // request();

  return {
    token,
    webhook,
    error: errorUrl,
    success: successUrl,
    default: defaultUrl,
  };
};

export const generatePurchaseDescription = (concepts: Concept[]): string => {
  const lines = concepts.map((c) => {
    return `• ${c.description}`;
  });

  return `Compra realizada:\n${lines.join('\n')}}`;
};
