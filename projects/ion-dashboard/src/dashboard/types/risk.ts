import { IField, IEntityState } from 'ion-core';

export interface IRiskForm {
  readonly participantId: IField<string>;
  readonly collateralId: IField<string>;
}

export interface IRiskSummary {
  readonly participantId: string;
  readonly collateralId: string;
  readonly settlementBalance: number;
  readonly netDepitCap: number;
  readonly collateralMonitor: number;
  readonly sppNetActivity: number;
  readonly netDirection: string;
  readonly valueAtRisk: number;
}

export interface IRiskState extends IEntityState {
  readonly form: IRiskForm;
  readonly summary: IRiskSummary | null;
}
