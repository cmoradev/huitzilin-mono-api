import Decimal from 'decimal.js';

/**
 * Calculates the tax based on a fixed rate.
 */
export enum TaxEnum {
  Zero = 0,
  Sixteen = 16,
}

/**
 * Calcula el importe base y los impuestos a partir del total y el porcentaje de impuestos.
 * @param total Monto total (importe + impuestos)
 * @param taxRate Porcentaje de impuestos (por ejemplo, 16 para 16%)
 * @returns Un objeto con importe e impuestos
 */
export function calculateAmountFromTotalAndTax(
  total: number,
  taxRate: number = TaxEnum.Sixteen,
): { amount: number; taxes: number } {
  const totalDecimal = new Decimal(total);
  const rateDecimal = new Decimal(taxRate).dividedBy(100);
  const amount = totalDecimal.dividedBy(rateDecimal.plus(1));
  const taxes = totalDecimal.minus(amount);

  return {
    amount: Number(amount.toFixed(2)),
    taxes: Number(taxes.toFixed(2)),
  };
}

/**
 * Calcula el total y los impuestos a partir del importe base y el porcentaje de impuestos.
 * @param importe Importe base sin impuestos
 * @param taxRate Porcentaje de impuestos (por ejemplo, 16 para 16%)
 * @returns Un objeto con total e impuestos
 */
export function calculateTotalFromBaseAndTax(
  amount: number,
  taxRate: number = TaxEnum.Sixteen,
) {
  const amountDecimal = new Decimal(amount);
  const rateDecimal = new Decimal(taxRate).dividedBy(100);
  const taxes = amountDecimal.times(rateDecimal);
  const total = amountDecimal.plus(taxes);

  return {
    total: Number(total.toFixed(2)),
    taxes: Number(taxes.toFixed(2)),
  };
}
