import { IField, IEntityState } from 'ion-core';

export interface IMemoForm {
  readonly action: IField<string>;
  readonly cusipName: IField<string>;
  readonly cusipId: IField<string>;
}

export interface IMemo {
  readonly participantId: string;
  readonly transactionId: string;
  readonly cusipName: string;
  readonly cusipId: string;
  readonly action: string;
  readonly quantity: number;
  readonly status: string;
  readonly timeStamp: string;
}

export interface IMemoSummary {
  readonly memos: IMemo[];
  readonly filteredMemos: IMemo[];
}

export interface IMemoState extends IEntityState {
  readonly form: IMemoForm;
  readonly summary: IMemoSummary;
}

export interface IMemoResponse {
  linearId: string;
  memoSegAction: string;
  participantId: string;
  quantity: number;
  securityId: string;
  securityName: string;
  status: string;
  timeStamp: string;
}
