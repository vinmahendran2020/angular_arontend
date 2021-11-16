import { IField, IEntityState } from 'ion-core';

export interface IOrderForm {
  readonly delivererId: IField<string>;
  readonly receiverId: IField<string>;
  readonly cusipName: IField<string>;
  readonly cusipId: IField<string>;
  readonly prefunded: IField<string>;
  readonly settlementStatus: IField<string>;
  readonly pendingReason: IField<string>;
}

export interface IOrder {
  readonly transactionId: string;
  readonly delivererId: string;
  readonly receiverId: string;
  readonly cusipName: string;
  readonly cusipId: string;
  readonly quantity: number;
  readonly amount: number;
  readonly prefunded: string;
  readonly settlementDate: string;
  readonly settlementStatus: string;
  readonly pendingReason: string;
}

export interface IOrderSummary {
  readonly orders: IOrder[];
  readonly filteredOrders: IOrder[];
}

export interface IOrderState extends IEntityState {
  readonly form: IOrderForm;
  readonly summary: IOrderSummary;
}

export interface IOrderResponse {
  bilateralTransactionId: string;
  buyClearingBroker: string;
  receiverId: string;
  delivererId: string;
  comment: string;
  prefunded: boolean;
  securityId: string;
  securityName: string;
  settlementAmount: number;
  settlementDate: string;
  shrQty: number;
  bilateralTradeStatus: string;
  pendingReasonCode: string;
}
