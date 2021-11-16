import { IField, IEntityState } from 'ion-core';

export interface IMemoForm {
  readonly participantId: IField<string>;
}

export interface IMemo {
  readonly id: IField<number>;
  readonly action: IField<string>;
  readonly cusip: IField<string>;
  readonly quantity: IField<string>;
  readonly cusipName: string;
  readonly totalPositions: number | null;
  readonly memoSegregation: number | null;
  readonly totalFreeExcess: number | null;
}

export interface IMemoDialog {
  readonly cusip: boolean;
}

export interface IMemoSummary {
  readonly memos: IMemo[];
  readonly dialog: { [key: number]: IMemoDialog };
}

export interface IMemoState extends IEntityState {
  readonly form: IMemoForm;
  readonly summary: IMemoSummary | null;
}

export interface IMemoBalace {
  readonly participantId: string;
  readonly cusipId: string;
  readonly cusipName: string;
  readonly memoSegregation: number;
  readonly totalFreeExcess: number;
  readonly totalPositions: number;
}

export interface IMemoRequest {
  action: string;
  cusip: string;
  quantity: string;
}

export interface IMemoResponse {
  rowNo: number;
  status: number;
  message: string | null;
  errorMessages: { [key: string]: string };
}

export interface IMemoBalanceResponse {
  securityName: string;
  cusip: string;
  ticker: string;
  position: {
    partId: string;
    naQty: number;
    maQty: number;
    msegQty: number;
    pledgeQty: number;
    createTimeStamp: string;
    updateTimeStamp: string;
  };
}
