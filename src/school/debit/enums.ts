import { registerEnumType } from '@nestjs/graphql';

/**
 * Enumera los posibles estados de una deuda.
 * 
 * @enum {string}
 * @readonly
 */
export enum DebitState {
  DEBT = 'debt',
  PAID = 'paid',
  PARTIALLY_PAID = 'partially_paid',
  CONDONED = 'condoned',
  CANCELED = 'canceled',
}

registerEnumType(DebitState, {
  name: 'DebitState',
});
