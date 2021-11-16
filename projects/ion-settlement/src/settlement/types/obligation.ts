import { IField, IEntityState } from 'ion-core';

export interface IObligationForm {
  readonly cusipName: IField<string>;
  readonly cusipId: IField<string>;
  readonly direction: IField<string>;
  readonly settlementStatus: IField<string>;
}

export interface IObligation {
  readonly transactionId: string;
  readonly parentId: string;
  readonly participantId: string;
  readonly cusipName: string;
  readonly cusipId: string;
  readonly direction: string;
  readonly quantity: number;
  readonly amount: number;
  readonly closePrice: number;
  readonly settlementValue: number;
  readonly settlementDate: string;
  readonly settlementStatus: string;
  readonly pendingReason: string;
}

export interface IObligationSummary {
  readonly obligations: IObligation[];
  readonly filteredObligations: IObligation[];
}

export interface IObligationState extends IEntityState {
  readonly form: IObligationForm;
  readonly summary: IObligationSummary;
}

export interface IObligationResponse {
  netObligationId: string;
  nettedObligationId: string;
  securityName: string;
  cusip: string;
  ticker: string;
  isin: string;
  participantAccountId: string;
  netQuantity: number;
  netTradeAmount: number;
  settlementValue: number;
  settlementDate: string;
  closePrice: number;
  tradeDirectionInd: string;
  settlementStatus: string;
  tradeStatus: string;
  parentObligationId: string;
  pendingReasonCode: string;
}
