import { CreateConceptPayload } from '../concept/types';
import { CreatePaymentInput } from '../payment/dto/create-payment.input';
import { IncomeState } from './enum';

export type CreateIncomePayload = {
  branchId: string;
  state: IncomeState;
  amount: number;
  discount: number;
  subtotal: number;
  taxes: number;
  total: number;
  pendingPayment: number;
  studentIds: string[];
  payments: CreatePaymentInput[];
  concepts: CreateConceptPayload[];
};
