import { IField, IEntityState } from 'ion-core';

export interface IPrepositionRequest {
  cusip: string;
  pledgeInstruction: string;
  amount: number;
}

export interface IPrepositionResponse {
  rowNo: number;
  status: number;
  message: string | null;
  errorMessages: { [key: string]: string };
}

export interface IPrepositionForm {
  readonly participantId: IField<string>;
}

export interface IPreposition {
  readonly id: IField<number>;
  readonly cusip: IField<string>;
  readonly action: IField<string>;
  readonly quantity: IField<string>;
  readonly cusipName: string;
}

export interface IPrepositionDialog {
  readonly cusip: boolean;
}

export interface IPrepositionSummary {
  readonly prepositions: IPreposition[];
  readonly dialog: { [key: number]: IPrepositionDialog };
}

export interface IPrepositionState extends IEntityState {
  readonly form: IPrepositionForm;
  readonly summary: IPrepositionSummary | null;
}
