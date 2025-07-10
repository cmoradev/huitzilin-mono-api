import { NestedIdInput } from 'src/common/dtos';

export class CreateConceptPayload {
  branchId: string;
  debitId: string;
  description: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  discount: number;
  subtotal: number;
  taxes: number;
  total: number;
  withTax: boolean;
  discounts: NestedIdInput[];
}
