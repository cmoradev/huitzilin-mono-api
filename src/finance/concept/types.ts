import { NestedIdInput } from 'src/common/dtos';
import { DebitState } from 'src/school/debit/enums';

export class CreateConceptPayload {
  id?: string;
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
  state: DebitState | null;
  paymentDate: Date | null;
  debitId: string | null;
  branchID: string;
  discounts: NestedIdInput[];
}
