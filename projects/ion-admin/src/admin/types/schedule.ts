export interface ISchedule {
  readonly scheduleType: ScheduleType;
  readonly startTime: string;
  readonly endTime: string;
  readonly timezone: string;
  readonly status: string;
  readonly hours: number;
  readonly minutes: number;
}

export interface IScheduleStatus {
  readonly netting: string;
  readonly securitiesSettlement: string;
  readonly cash: string;
  readonly start: string;
  readonly end: string;
}

export interface IScheduleInProgress {
  readonly progress: boolean;
  readonly inProgressMessage: string;
}

export interface IScheduleDetails {
  readonly status: IScheduleStatus;
  readonly schedule: ISchedule;
}

export type ScheduleType =
  | 'Cash'
  | 'Netting'
  | 'SecuritiesSettlement'
  | 'StartOfDay'
  | 'EndOfDay';

export interface IScheduleResponse {
  statuses: {
    Netting: string;
    SecuritiesSettlement: string;
    Cash: string;
    StartOfDay: string;
    EndOfDay: string;
  };
  schedule: {
    scheduleType: string;
    startTime: string;
    endTime: string;
    timezone: string;
    intervalHours: number;
    intervalMinutes: number;
    status: string;
  };
}
