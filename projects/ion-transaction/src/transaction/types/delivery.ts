import { IField, IEntityState } from 'ion-core';

export interface IDeliveryForm {
  readonly participantId: IField<string>;
}

export interface IDelivery {
  readonly id: string;
  readonly operation: string;
  readonly deliverer: string;
  readonly receiver: string;
  readonly cusip: string;
  readonly quantity: string;
  readonly amount: string;
  readonly prefunded: boolean;
  readonly date: string;
  readonly comment: string;
  readonly status: string;
  readonly reason: string;
}

export interface IDeliveryFilter {
  readonly kind: string;
  readonly value: string;
}

export interface IDeliverySummary {
  readonly deliveries: IDelivery[];
  readonly filter: IDeliveryFilter;
}

export interface IDeliveryState extends IEntityState {
  readonly form: IDeliveryForm;
  readonly summary: IDeliverySummary | null;
}

export interface IDeliverySearchResponse {
  bilateralTransactionId: string;
  receiverId: string;
  delivererId: string;
  comment: string;
  prefunded: boolean;
  securityId: string;
  settlementAmount: string;
  settlementDate: string;
  shrQty: string;
  bilateralTradeStatus: string;
  pendingReasonCode: string;
}

export interface IDeliverySubmitResponse {
  id: string;
  rowNo: number;
  status: number;
  message: string | null;
  errorMessages: { [key: string]: string };
}
