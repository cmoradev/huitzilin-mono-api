import { IncomeState } from 'src/finance/income/enum';
import { PaymentMethod, PaymentState } from 'src/finance/payment/enum';
import { DebitState } from 'src/school/debit/enums';

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
  withTax: boolean;
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

export type IncomeDisciplineData = {
  incomeId: string;
  incomeFolio: number;
  incomeState: IncomeState;
  incomeDate: string;
  branchId: string;
  branchName: string;
  received: number;
  students: Array<StudentData>;
};

export type ConceptData = {
  conceptId: string;
  conceptDescription: string;
  conceptTotal: string;
  conceptPendingPayment: string;
  conceptReceived: string;
  incomeId: string;
  debitId: string;
  enrollmentId: string;
};

export type PaymentData = {
  paymentId: string;
  paymentState: PaymentState;
  paymentDate: string;
  paymentAmount: string;
};

export type DebitData = {
  debitId: string;
  debitDescription: string;
  debitAmount: string;
  debitDiscount: string;
  debitSubtotal: string;
  debitTaxes: string;
  debitTotal: string;
  debitWithTax: boolean;
  debitState: DebitState;
  debitDueDate: string;
  debitPaymentDate: string | null;
  branchId: string;
  branchName: string;
  studentId: string;
  studentFullname: string;
  conceptId: string | null;
  conceptDescription: string | null;
  conceptSubtotal: string | null;
  conceptTaxes: string | null;
  conceptTotal: string | null;
  conceptPendingPayment: string | null;
  conceptReceived: string | null;
  conceptWithTax: boolean | null;
};

export type Grouped = {
  id: string;
  name: string;
  count: string;
};

export type ScheduleData = {
  enrollmentId: string;
  enrollmentHours: number;
  studentId: string;
  studentFullname: string;
  disciplineId: string;
  disciplineName: string;
  disciplineTotalHours: number;
};

export type HoursByDiscipline = {
  disciplineId: string;
  disciplineName: string;
  totalHours: number;
};
