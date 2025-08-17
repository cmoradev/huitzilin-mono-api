import Decimal from 'decimal.js';
import { Grouped, IncomeData } from './types'; // Ajusta la ruta si es necesario
import { PaymentMethod } from 'src/finance/payment/enum';

/**
 * Agrupa los ingresos por método de pago.
 */
export function groupIncomeByPaymentMethod(data: IncomeData[]): Grouped[] {
  const result: Record<string, Grouped> = {};

  data.forEach((item) => {
    const method = String(item.paymentMethod);
    const income = new Decimal(item.paymentAmount);

    if (!result[method]) {
      result[method] = { id: method, name: method, count: '0' };
    }

    const lastCount = new Decimal(result[method].count || '0');
    result[method].count = lastCount.plus(income).toString();
  });

  return Object.values(result);
}

/**
 * Agrupa los ingresos por método de pago.
 */
export function groupIncomeByBranch(data: IncomeData[]) {
  const result = new Map<string, IncomeData[]>();

  data.forEach((item) => {
    const branchName = String(item.branchName);

    if (!result.has(branchName)) {
      result.set(branchName, []);
    }

    result.get(branchName)?.push(item);
  });

  return result;
}

/**
 * Suma todos los paymentAmount usando decimal.js.
 */
export function totalIncome(data: IncomeData[]): string {
  return data
    .reduce(
      (acc, item) => acc.plus(new Decimal(item.paymentAmount)),
      new Decimal(0),
    )
    .toString();
}

export const getMethodName = (value: PaymentMethod): string => {
  switch (value) {
    case PaymentMethod.CARD:
      return 'Tarjeta';
    case PaymentMethod.TRANSFER:
      return 'Transferencia';
    case PaymentMethod.CASH:
      return 'Efectivo';
    case PaymentMethod.CLIP:
      return 'Clip';
    default:
      return value;
  }
};

/**
 * Genera un folio a partir de un número.
 */
export const generateFolio = (value: number): string => {
  return value.toString().padStart(6, '0');
};

/**
 * Devuelve un estilo de tabla aleatorio entre TableStyleLight9 y TableStyleLight14.
 */
export function getRandomTableStyle():
  | 'TableStyleLight9'
  | 'TableStyleLight10'
  | 'TableStyleLight11'
  | 'TableStyleLight12'
  | 'TableStyleLight13'
  | 'TableStyleLight14' {
  const styles = [
    'TableStyleLight9',
    'TableStyleLight10',
    'TableStyleLight11',
    'TableStyleLight12',
    'TableStyleLight13',
    'TableStyleLight14',
  ] as const;

  const index = Math.floor(Math.random() * styles.length);

  return styles[index];
}
