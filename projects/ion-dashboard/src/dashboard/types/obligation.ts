import { IField, IEntityState } from 'ion-core';

export interface IObligationForm {
  readonly participantId: IField<string>;
}

export interface INetObligation {
  readonly netObligationId: string;
  readonly securityName: string;
  readonly cusip: string;
  readonly ticker: string;
  readonly isin: string;
  readonly netQuantity: number;
  readonly netTradeAmount: number;
  readonly settlementValue: number;
  readonly settlementDate: string;
  readonly closePrice: number;
  readonly settlementStatus: string;
}

export type ObligationSortBy =
  | 'netQuantity'
  | 'netTradeAmount'
  | 'settlementValue'
  | undefined;

export interface IObligationSummary {
  readonly cusip: string;
  readonly sortBy: ObligationSortBy;
  readonly longs: INetObligation[];
  readonly shorts: INetObligation[];
  readonly closed: INetObligation[];
}

export interface IObligationDialog {
  readonly cusip: boolean;
}

export interface IObligationTransaction {
  readonly transactionId: string;
  readonly cusip: string;
  readonly contra: number;
  readonly deliverReceiver: string;
  readonly quantity: number;
  readonly tradeAmount: number;
  readonly status: string;
  readonly activity: string;
  readonly source: string;
  readonly reason: string;
}

export interface IObligationTrade {
  readonly tradeId: string;
  readonly ticker: string;
  readonly cusip: string;
  readonly buySell: string;
  readonly quantity: number;
  readonly tradePrice: number;
  readonly tradeAmount: number;
  readonly settlementDate: string;
  readonly market: string;
  readonly tradeDate: string;
}

export interface IObligationSelection {
  readonly itemId: string | null;
  readonly pendingId: string | null;
  readonly transactions: IObligationTransaction[];
  readonly trades: IObligationTrade[];
}

export interface IObligationState extends IEntityState {
  readonly form: IObligationForm;
  readonly summary: IObligationSummary | null;
  readonly selection: IObligationSelection;
  readonly dialog: IObligationDialog | null;
}
