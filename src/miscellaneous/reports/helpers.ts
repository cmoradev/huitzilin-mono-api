import Decimal from 'decimal.js';
import { Grouped, IncomeData } from './types'; // Ajusta la ruta si es necesario

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
