import { IField, IEntityState } from 'ion-core';

export interface IAdjustmentForm {
  readonly transactionId: IField<string>;
  readonly settlementDate: IField<string>;
  readonly action: IField<string>;
  readonly status: IField<string>;
  readonly creationDate: IField<string>;
}

export interface IAdjustment {
  readonly participantId: string;
  readonly transactionId: string;
  readonly settlementDate: string;
  readonly action: string;
  readonly amount: number;
  readonly status: string;
  readonly creationDate: string;
  readonly creationTime: string;
}

export interface IAdjustmentSummary {
  readonly adjustments: IAdjustment[];
  readonly filteredAdjustments: IAdjustment[];
}

export interface IAdjustmentState extends IEntityState {
  readonly form: IAdjustmentForm;
  readonly summary: IAdjustmentSummary;
}

export interface IAdjustmentResponse {
  participantAccountId: string;
  netCCAAmount: number;
  ccaDirection: string;
  ccaStatus: string;
  ccaSettlementDate: string;
  ccaId: string;
}
