import { IncomeState } from 'src/finance/income/enum';
import { PaymentMethod, PaymentState } from 'src/finance/payment/enum';

export type StudentData = {
  id: string;
  fullname: string;
};

export type IncomeData = {
  paymentId: string;
  paymentFolio: number;
  paymentState: PaymentState;
  paymentMethod: PaymentMethod;
  paymentDate: string;
  paymentAmount: string;
  paymentTransaction: string;
  paymentBank: string;
  incomeId: string;
  incomeFolio: number;
  incomeState: IncomeState;
  incomeDate: string;
  incomeAmount: string;
  incomeDiscount: string;
  incomeSubtotal: string;
  incomeTaxes: string;
  incomeTotal: string;
  incomePendingPayment: string;
  branchId: string;
  branchName: string;
  students: Array<StudentData>;
};

export type Grouped = {
  id: string;
  name: string;
  count: string;
};
