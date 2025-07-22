import { LinkClipStatus } from 'src/finance/income/types';

export type StateLinkResponse = {
  amount: number;
  currency: string;
  purchase_description: string;
  redirection_url: {
    success: string;
    error: string;
    default: string;
  };
  metadata: {
    external_reference: string;
  };
  webhook_url: string;
  payment_request_id: string;
  object_type: 'payment_link';
  status: LinkClipStatus;
  last_status_message: string;
  created_at: string;
  payment_request_url: string;
  modified_at: string;
  expires_at: string;
  receipt_no: string;
  payment_id: string;
  api_version: string;
};
