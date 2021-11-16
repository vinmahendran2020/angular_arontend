import { IField, IEntityState } from 'ion-core';

export interface ICCAForm {
  readonly participantId: IField<string>;
  readonly settlementDate: IField<string[]>;
}

export interface IClearingCashAdjustment {
  readonly ccaId: string;
  readonly settlementDate: string;
  readonly debitCredit: string;
  readonly netCCAAmount: number;
  readonly settlementStatus: string;
}

export interface ICCASummary {
  readonly participantId: string;
  readonly adjustments: IClearingCashAdjustment[];
}

export interface ICCATransaction {
  readonly netObligationId: string;
  readonly cusip: string;
  readonly ticker: string;
  readonly ccaAmount: number;
  readonly netBuySell: string;
  readonly netQuantity: number;
  readonly closePrice: number;
  readonly netTradeAmount: number;
  readonly netObligationStatus: string;
  readonly direction: string;
}

export interface ICCATransactionDetail {
  readonly ccaId: string;
  cusip: string;
  readonly debits: ICCATransaction[];
  readonly credits: ICCATransaction[];
}

export interface ICCAState extends IEntityState {
  readonly form: ICCAForm;
  readonly summary: ICCASummary | null;
  readonly detail: ICCATransactionDetail;
}
