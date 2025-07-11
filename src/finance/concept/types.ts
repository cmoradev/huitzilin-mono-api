import { NestedIdInput } from 'src/common/dtos';
import { DebitState } from 'src/school/debit/enums';

export class CreateConceptPayload {
  description: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  discount: number;
  subtotal: number;
  taxes: number;
  total: number;
  pendingPayment: number;
  withTax: boolean;
  dueDate: Date;
  state: DebitState;
  paymentDate: Date | null;
  discounts: NestedIdInput[];
  branchId: string;
  debitId: string;
  studentId: string;
}
