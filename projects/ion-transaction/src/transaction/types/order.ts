import { IField, IEntityState } from 'ion-core';

export interface IOrderForm {
  readonly participantId: IField<string>;
}

export interface IOrder {
  readonly id: IField<number>;
  readonly receiver: IField<string>;
  readonly cusip: IField<string>;
  readonly quantity: IField<string>;
  readonly amount: IField<string>;
  readonly prefunded: IField<boolean>;
  readonly date: IField<string>;
  readonly comment: IField<string>;
}

export interface IOrderDialog {
  readonly cusip: boolean;
}

export interface IOrderSummary {
  readonly orders: IOrder[];
  readonly dialog: { [key: number]: IOrderDialog };
}

export interface IOrderState extends IEntityState {
  readonly form: IOrderForm;
  readonly summary: IOrderSummary | null;
}

export interface IOrderRequest {
  buyClearingBroker: string;
  comment: string;
  prefunded: boolean;
  securityId: string;
  settlementAmount: number;
  settlementDate: string;
  shrQty: number;
}

export interface IOrderResponse {
  rowNo: number;
  status: number;
  message: string | null;
  errorMessages: { [key: string]: string };
}
