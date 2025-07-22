import { ConflictException, Logger } from '@nestjs/common';
import { addDays, endOfDay } from 'date-fns';
import Decimal from 'decimal.js';
import { request, RequestOptions } from 'https';
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
import {
  ConceptMetadata,
  CreateIncomePayload,
  LinkClipResponse,
} from './types';

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
    const total = new Decimal(concept.pendingPayment);

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

export const applyClipPaymentInConcepts = (
  concepts: ConceptMetadata[],
  payment: CreatePaymentInput,
) => {
  let received = new Decimal(payment.amount);

  for (const concept of concepts) {
    const total = new Decimal(concept.conceptPendingPayment);

    if (received.greaterThan(0)) {
      const paidAmount = Decimal.min(received, total);
      received = received.minus(paidAmount);

      const pendingPayment = total.minus(paidAmount);

      concept.conceptPendingPayment = pendingPayment.toNumber();
      concept.debitPaymentDate = new Date();
      concept.debitState = pendingPayment.equals(0)
        ? DebitState.PAID
        : DebitState.PARTIALLY_PAID;
    } else break;
  }

  return concepts;
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

export const prepareConceptWithDebit = (
  concepts: Concept[],
): ConceptMetadata[] => {
  return concepts.map((concept) => {
    const { id, pendingPayment, debits } = concept;

    const debit = debits.find(() => true);

    return {
      conceptId: id,
      conceptPendingPayment: pendingPayment,
      debitId: debit?.id || null,
      debitPaymentDate: new Date(),
      debitState: DebitState.DEBT,
    };
  });
};

export const applyClipPaymentInIncome = (
  income: Income,
  payment: CreatePaymentInput,
) => {
  let pendingPayment = new Decimal(income.pendingPayment);
  const received = new Decimal(payment.amount);

  pendingPayment = pendingPayment.minus(received);

  income.pendingPayment = pendingPayment.toNumber();
  income.state = pendingPayment.greaterThan(0)
    ? IncomeState.PENDING
    : IncomeState.PAID;

  return income;
};

export const createLinkClip = (clipAccount: ClipAccount, income: Income) => {
  const logger = new Logger('Clip');

  return new Promise<LinkClipResponse>((resolve, reject) => {
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
      purchase_description: purchaseDescription,
      webhook_url: webhook,
      metadata: { external_reference: id },
      expires_at: expireDate,
      redirection_url: {
        success: `${successUrl}/${id}`,
        error: `${errorUrl}/${id}`,
        default: `${defaultUrl}`,
      },
    });

    const options: RequestOptions = {
      hostname: 'api.payclip.com',
      path: '/v2/checkout',
      method: 'POST',
      headers: {
        authorization: `Basic ${token}`,
        'content-type': 'application/json',
        accept: 'application/json',
        'content-length': Buffer.byteLength(data),
      },
    };

    const req = request(options, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        if (res.statusCode !== 200) {
          logger.error(`Error al crear el link de pago en Clip: ${body}`);
          return reject(new Error(`Clip API error: ${res.statusCode}`));
        }

        try {
          const response: LinkClipResponse = JSON.parse(body);

          resolve(response);
        } catch (error) {
          logger.error(
            `Error al procesar la respuesta de Clip: ${error instanceof Error ? error.message : JSON.stringify(error)}`,
            error instanceof Error ? error.stack : undefined,
          );

          reject(new Error('Error al procesar la respuesta de Clip'));
        }
      });
    });

    req.on('error', (error) => {
      logger.error(
        `Error al crear el link de pago en Clip: ${error instanceof Error ? error.message : JSON.stringify(error)}`,
        error instanceof Error ? error.stack : undefined,
      );

      reject(error);
    });

    req.write(data);
    req.end();
  });
};

export const generatePurchaseDescription = (concepts: Concept[]): string => {
  const lines = concepts.map((c) => `~ ${c.description}`);

  return `${lines.join(' | ')}`;
};
