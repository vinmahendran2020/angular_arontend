import { IField, IEntityState } from 'ion-core';

export interface IPrepositionForm {
  readonly cusipName: IField<string>;
  readonly cusipId: IField<string>;
  readonly action: IField<string>;
}

export interface IPreposition {
  readonly transactionId: string;
  readonly participantId: string;
  readonly cusipName: string;
  readonly cusipId: string;
  readonly action: string;
  readonly quantity: number;
  readonly status: string;
}

export interface IPrepositionSummary {
  readonly prepositions: IPreposition[];
  readonly filteredPrepositions: IPreposition[];
}

export interface IPrepositionState extends IEntityState {
  readonly form: IPrepositionForm;
  readonly summary: IPrepositionSummary;
}

export interface IPrepositionResponse {
  clearingBroker: string;
  dtccMinter: string;
  pledgeId: string;
  message: string;
  cusip: string;
  securityName: string;
  status: string;
  timeStamp: string;
  eventType: string;
  quantity: number;
  participantId: string;
}
