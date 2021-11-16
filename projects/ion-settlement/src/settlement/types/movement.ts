import { IField, IEntityState } from 'ion-core';

export interface IMovementForm {
  readonly action: IField<string>;
  readonly date: IField<string>;
}

export interface IMovement {
  readonly participantId: string;
  readonly transactionId: string;
  readonly action: string;
  readonly amount: number;
  readonly date: string;
  readonly status: string;
  readonly timeStamp: string;
}

export interface IMovementSummary {
  readonly movements: IMovement[];
  readonly filteredMovements: IMovement[];
}

export interface IMovementState extends IEntityState {
  readonly form: IMovementForm;
  readonly summary: IMovementSummary;
}

export interface IMovementResponse {
  action: string;
  amount: number;
  clearingBroker: string;
  issuer: string;
  timeStamp: string;
  participantId: string;
  cashEventId: string;
  status: string;
}
