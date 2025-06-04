import { registerEnumType } from '@nestjs/graphql';

/**
 * Enum representing the type of discount applied.
 *
 * @enum {string}
 * @readonly
 */
export enum DiscountBy {
  PERCENTAGE = 'percentage',
  FIXED = 'fixed',
}

registerEnumType(DiscountBy, {
  name: 'DiscountBy',
});
