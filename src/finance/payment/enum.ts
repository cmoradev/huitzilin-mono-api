import { registerEnumType } from '@nestjs/graphql';

export enum PaymentState {
  PAID = 'paid',
  PENDING = 'pending',
  STAMPING = 'stamping',
  ATTEMPTED_STAMPING = 'attempted_stamping',
  GLOBAL_STAMPING = 'global_stamping',
  CANCELLED = 'cancelled',
}

registerEnumType(PaymentState, {
  name: 'PaymentState',
});
