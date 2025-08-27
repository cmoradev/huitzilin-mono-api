import Decimal from 'decimal.js';
import { DiscountBy } from 'src/miscellaneous/discounts/enums';

/**
 * Calcula la base y el impuesto a partir del total (con impuestos) y el porcentaje de impuestos.
 * @param total Importe total con impuestos incluidos
 * @param taxRate Porcentaje de impuestos (por ejemplo, 16 para 16%)
 * @returns Un objeto con base (sin impuestos), impuestos y total
 */
export function calculateAllFromTotal(
  total: number,
  taxRate: number = TaxEnum.Sixteen,
) {
  const rateDecimal = new Decimal(taxRate).dividedBy(100);

  const totalDecimal = new Decimal(total);
  const baseDecimal = totalDecimal.dividedBy(1.197);
  const comissionsDecimal = totalDecimal.times(0.037);
  const taxesDecimal = baseDecimal.times(rateDecimal);

  return {
    base: Number(baseDecimal.toFixed(6)),
    taxes: Number(taxesDecimal.toFixed(6)),
    comissions: Number(comissionsDecimal.toFixed(6)),
    total: Number(totalDecimal.toFixed(6)),
  };
}

/**
 * Calculates the tax based on a fixed rate.
 */
export enum TaxEnum {
  Zero = 0,
  Sixteen = 16,
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
    total: Number(total.toFixed(6)),
    taxes: Number(taxes.toFixed(6)),
    amount: Number(amountDecimal.toFixed(6)),
  };
}

/**
 * Calcula la base y el impuesto a partir del total (con impuestos) y el porcentaje de impuestos.
 * @param total Importe total con impuestos incluidos
 * @param taxRate Porcentaje de impuestos (por ejemplo, 16 para 16%)
 * @returns Un objeto con base (sin impuestos), impuestos y total
 */
export function calculateBaseAndTaxFromTotal(
  total: number,
  taxRate: number = TaxEnum.Sixteen,
) {
  const totalDecimal = new Decimal(total);
  const rateDecimal = new Decimal(taxRate).dividedBy(100);
  const divisor = new Decimal(1).plus(rateDecimal);

  const amountDecimal = totalDecimal.dividedBy(divisor);
  const taxes = totalDecimal.minus(amountDecimal);

  return {
    amount: Number(amountDecimal.toFixed(6)),
    taxes: Number(taxes.toFixed(6)),
    total: Number(totalDecimal.toFixed(6)),
  };
}
/**
 * Calculates the subtotal, taxes, and total from unit price, quantity, discount, and tax rate.
 * @param unitPrice Price per unit
 * @param quantity Number of units
 * @param discount Discount amount
 * @param taxRate Tax rate percentage (default 16)
 * @returns An object with unitPrice, quantity, amount, discount, subtotal, taxes, and total
 */
export function calculateTotalFromUnitPriceQuantityDiscountAndTax(
  unitPrice: number,
  quantity: number,
  discount: number,
  taxRate: TaxEnum = TaxEnum.Sixteen,
) {
  const rateTaxDecimal = new Decimal(taxRate).dividedBy(100);

  const unitPriceDecimal = new Decimal(unitPrice);
  const quantityDecimal = new Decimal(quantity);
  const amountDecimal = unitPriceDecimal.times(quantityDecimal);
  const discountDecimal = new Decimal(discount);
  if (discountDecimal.greaterThan(amountDecimal)) {
    throw new Error('Discount cannot be greater than the amount.');
  }
  const subtotalDecimal = amountDecimal.minus(discountDecimal);
  const taxes = subtotalDecimal.times(rateTaxDecimal);
  const totalDecimal = subtotalDecimal.plus(taxes);

  return {
    unitPrice: Number(unitPriceDecimal.toFixed(6)),
    quantity: Number(quantityDecimal.toFixed(6)),
    amount: Number(amountDecimal.toFixed(6)),
    discount: Number(discountDecimal.toFixed(6)),
    subtotal: Number(subtotalDecimal.toFixed(6)),
    taxes: Number(taxes.toFixed(6)),
    total: Number(totalDecimal.toFixed(6)),
  };
}

/**
 * Calcula el descuento a partir de un importe y una lista de descuentos.
 * @param amount Importe total
 * @param discounts Lista de descuentos aplicables
 * @returns Un objeto con el descuento total y el subtotal después de aplicar los descuentos
 */
export function calculateSubtotalAndDiscount(
  amount: number,
  discounts: { value: number; type: DiscountBy }[],
) {
  const amountDecimal = new Decimal(amount);

  let discountTotal = new Decimal(0);

  for (const discount of discounts) {
    const valueDecimal = new Decimal(discount.value);

    if (discount.type === DiscountBy.PERCENTAGE) {
      discountTotal = discountTotal.plus(
        amountDecimal.times(valueDecimal).dividedBy(100),
      );
    } else if (discount.type === DiscountBy.FIXED) {
      discountTotal = discountTotal.plus(valueDecimal);
    }
  }

  const subtotalDecimal = amountDecimal.minus(discountTotal);

  return {
    discount: Number(discountTotal.toFixed(6)),
    subtotal: Number(subtotalDecimal.toFixed(6)),
  };
}

/**
 * Calcula el monto total a partir del precio unitario y la cantidad.
 *
 * Utiliza la librería Decimal para realizar cálculos precisos con decimales.
 * Retorna un objeto con el precio unitario, la cantidad y el monto total,
 * todos redondeados a dos decimales.
 *
 * @param {number} unitPrice - Precio unitario del producto o servicio.
 * @param {number} quantity - Cantidad de productos o servicios.
 * @returns {{ unitPrice: number; quantity: number; amount: number }}
 *   Objeto con el precio unitario, la cantidad y el monto total.
 */
export function calculateAmount(unitPrice: number, quantity: number) {
  const unitPriceDecimal = new Decimal(unitPrice);
  const quantityDecimal = new Decimal(quantity);

  const amountDecimal = unitPriceDecimal.times(quantityDecimal);

  return {
    unitPrice: Number(unitPriceDecimal.toFixed(6)),
    quantity: Number(quantityDecimal.toFixed(6)),
    amount: Number(amountDecimal.toFixed(6)),
  };
}
