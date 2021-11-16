import { Action } from '@ngrx/store';
import { ISchedule, IScheduleInProgress } from '../../types/schedule';

export class CashSchedulePageLoaded implements Action {
  static Type = 'Admin/Cash/Schedule/PageLoaded' as const;
  readonly type = CashSchedulePageLoaded.Type;
}

export class CashSchedulePageDestroyed implements Action {
  static Type = 'Admin/Cash/Schedule/PageDestroyed' as const;
  readonly type = CashSchedulePageDestroyed.Type;
}

export class CashSchedulePageRefreshed implements Action {
  static Type = 'Admin/Cash/Schedule/PageRefreshed' as const;
  readonly type = CashSchedulePageRefreshed.Type;
}

export class CashScheduleClearPageError implements Action {
  static Type = 'Admin/Cash/Schedule/ClearPageError' as const;
  readonly type = CashScheduleClearPageError.Type;
}

export class CashScheduleClearPageSuccess implements Action {
  static Type = 'Admin/Cash/Schedule/ClearPageSuccess' as const;
  readonly type = CashScheduleClearPageSuccess.Type;
}

export class CashScheduleSettlementDateChange implements Action {
  static Type = 'Admin/Cash/Schedule/SettlementDateChange' as const;
  readonly type = CashScheduleSettlementDateChange.Type;
  constructor(public settlementDate: string) {}
}

export class CashScheduleFetch implements Action {
  static Type = 'Admin/Cash/Schedule/Fetch' as const;
  readonly type = CashScheduleFetch.Type;
}

export class CashScheduleFetchResult implements Action {
  static Type = 'Admin/Cash/Schedule/FetchResult' as const;
  readonly type = CashScheduleFetchResult.Type;
  constructor(public inProgressState: IScheduleInProgress, public schedule: ISchedule) {}
}

export class CashScheduleFetchError implements Action {
  static Type = 'Admin/Cash/Schedule/FetchError' as const;
  readonly type = CashScheduleFetchError.Type;
  constructor(public error: string) {}
}

export class CashScheduleRun implements Action {
  static Type = 'Admin/Cash/Schedule/Run' as const;
  readonly type = CashScheduleRun.Type;
}

export class CashScheduleRunResult implements Action {
  static Type = 'Admin/Cash/Schedule/RunResult' as const;
  readonly type = CashScheduleRunResult.Type;
  constructor(public message: string) {}
}

export class CashScheduleRunError implements Action {
  static Type = 'Admin/Cash/Schedule/RunError' as const;
  readonly type = CashScheduleRunError.Type;
  constructor(public error: string) {}
}

export class CashScheduleEditOpen implements Action {
  static Type = 'Admin/Cash/Schedule/EditOpen' as const;
  readonly type = CashScheduleEditOpen.Type;
}

export class CashScheduleEditClose implements Action {
  static Type = 'Admin/Cash/Schedule/EditClose' as const;
  readonly type = CashScheduleEditClose.Type;
}

export class CashScheduleSubmit implements Action {
  static Type = 'Admin/Cash/Schedule/Submit' as const;
  readonly type = CashScheduleSubmit.Type;
  constructor(public schedule: ISchedule) {}
}

export class CashScheduleSubmitResult implements Action {
  static Type = 'Admin/Cash/Schedule/SubmitResult' as const;
  readonly type = CashScheduleSubmitResult.Type;
  constructor(public schedule: ISchedule) {}
}

export class CashScheduleSubmitError implements Action {
  static Type = 'Admin/Cash/Schedule/SubmitError' as const;
  readonly type = CashScheduleSubmitError.Type;
  constructor(public error: string) {}
}

export class CashScheduleToggle implements Action {
  static Type = 'Admin/Cash/Schedule/Toggle' as const;
  readonly type = CashScheduleToggle.Type;
  constructor(public checked: boolean) {}
}

export class CashScheduleToggleResult implements Action {
  static Type = 'Admin/Cash/Schedule/ToggleResult' as const;
  readonly type = CashScheduleToggleResult.Type;
  constructor(public schedule: ISchedule) {}
}

export class CashScheduleToggleError implements Action {
  static Type = 'Admin/Cash/Schedule/ToggleError' as const;
  readonly type = CashScheduleToggleError.Type;
  constructor(public error: string) {}
}

export class CashScheduleClearCommitMessage implements Action {
  static Type = 'Admin/Cash/Schedule/ClearCommitMessage' as const;
  readonly type = CashScheduleClearCommitMessage.Type;
}
