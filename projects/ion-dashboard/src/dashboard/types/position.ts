import { IField, IEntityState } from 'ion-core';

export interface IPositionForm {
  readonly participantId: IField<string>;
  readonly cusip: IField<string>;
  readonly date: IField<string>;
}

export interface IPositionSummary {
  readonly security: string;
  readonly ticker: string;
  readonly cusip: string;
  readonly netAdditions: number;
  readonly minimumAmount: number;
  readonly memoSegregation: number;
  readonly totalFreeExcess: number;
  readonly pledged: number;
  readonly totalPositions: number;
}

export interface IPositionDialog {
  readonly cusip: boolean;
}

export interface IPositionState extends IEntityState {
  readonly form: IPositionForm;
  readonly summary: IPositionSummary | null;
  readonly dialog: IPositionDialog;
}
