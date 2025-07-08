import { registerEnumType } from '@nestjs/graphql';

export enum PaymentState {
  PAID = 'paid',
  PENDING = 'pending',
  CANCELLED = 'cancelled',
}

registerEnumType(PaymentState, {
  name: 'PaymentState',
});

export enum PaymentMethod {
  CARD = 'card',
  TRANSFER = 'transfer',
  CASH = 'cash',
  CLIP = 'clip',
}

registerEnumType(PaymentMethod, {
  name: 'PaymentMethod',
});
