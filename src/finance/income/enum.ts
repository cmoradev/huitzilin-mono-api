import { registerEnumType } from '@nestjs/graphql';

export enum IncomeState {
  PAID = 'paid',
  PENDING = 'pending',
  CANCELLED = 'cancelled',
}

registerEnumType(IncomeState, {
  name: 'IncomeState',
});
