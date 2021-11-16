import { IField, IEntityState } from 'ion-core';

export interface ICashForm {
  readonly action: IField<string>;
  readonly date: IField<string>;
}

export interface ICash {
  readonly participantId: string;
  readonly transactionId: string;
  readonly action: string;
  readonly amount: number;
  readonly date: string;
  readonly time: string;
  readonly status: string;
}

export interface ICashSummary {
  readonly cashs: ICash[];
  readonly filteredCashs: ICash[];
}

export interface ICashState extends IEntityState {
  readonly form: ICashForm;
  readonly summary: ICashSummary;
}

export interface ICashResponse {
  broker: string;
  creditBalance: number;
  debitBalance: number;
  dtccBroker: string;
  netBalance: number;
  netDirection: string;
  participantAccountId: string;
  status: string;
  transactionId: string;
  creationDate: string;
}
