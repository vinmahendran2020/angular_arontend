import { IField, IEntityState } from 'ion-core';

export interface ICash {
  securityName: string;
  ticker: string;
  cash: {
    partId: string;
    balance: number;
    createTimeStamp: string;
    updateTimeStamp: string;
  };
}

export interface ICashForm {
  readonly participantId: IField<string>;
}

export interface ICashActivity {
  readonly operation: IField<string>;
  readonly amount: IField<string>;
}

export interface ICashSummary {
  readonly balance: number;
  readonly currency: string;
  readonly holder: string;
  readonly issuer: string;
}

export interface ICashActionResponse {
  readonly status: string;
  readonly message: string;
  readonly data: string;
}

export interface ICashState extends IEntityState {
  readonly form: ICashForm;
  readonly summary: ICashSummary | null;
  readonly activity: ICashActivity | null;
}

export interface ICashSearchResponse {
  amount: number;
  issuer: string;
  holder: string;
  currency: string;
}

export interface ICashSubmitResponse {
  status: number;
  message: string;
  data: unknown;
}
