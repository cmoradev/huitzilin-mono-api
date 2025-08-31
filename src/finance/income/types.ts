import { DebitState } from 'src/school/debit/enums';
import { CreateConceptPayload } from '../concept/types';
import { CreatePaymentInput } from '../payment/dto/create-payment.input';
import { IncomeState } from './enum';
import { ConceptApplication } from '../concept/enum';

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
  payments?: CreatePaymentInput[];
  concepts: CreateConceptPayload[];
};

export enum LinkClipStatus {
  CHECKOUT_CREATED = 'CHECKOUT_CREATED',
  CHECKOUT_PENDING = 'CHECKOUT_PENDING',
  CHECKOUT_CANCELLED = 'CHECKOUT_CANCELLED',
  CHECKOUT_EXPIRED = 'CHECKOUT_EXPIRED',
  CHECKOUT_COMPLETED = 'CHECKOUT_COMPLETED',
}

export type LinkClipResponse = {
  payment_request_id: string;
  object_type: 'payment_link';
  status: LinkClipStatus;
  last_status_message: string;
  created_at: string;
  payment_request_url: string;
  modified_at: string;
  expires_at: string;
  qr_image_url: string;
  api_version: string;
};

export type ConceptMetadata = {
  conceptId: string;
  conceptPendingPayment: number;
  conceptApplication: ConceptApplication;
  debitId: string | null;
  debitPaymentDate: Date;
  debitState: DebitState;
  debitDueDate: Date;
};
