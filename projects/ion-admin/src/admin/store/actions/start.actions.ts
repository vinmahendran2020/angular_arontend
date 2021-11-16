import { Action } from '@ngrx/store';
import { ISchedule, IScheduleInProgress } from '../../types/schedule';

export class StartSchedulePageLoaded implements Action {
  static Type = 'Admin/Start/Schedule/PageLoaded' as const;
  readonly type = StartSchedulePageLoaded.Type;
}

export class StartSchedulePageDestroyed implements Action {
  static Type = 'Admin/Start/Schedule/PageDestroyed' as const;
  readonly type = StartSchedulePageDestroyed.Type;
}

export class StartSchedulePageRefreshed implements Action {
  static Type = 'Admin/Start/Schedule/PageRefreshed' as const;
  readonly type = StartSchedulePageRefreshed.Type;
}

export class StartScheduleClearPageError implements Action {
  static Type = 'Admin/Start/Schedule/ClearPageError' as const;
  readonly type = StartScheduleClearPageError.Type;
}

export class StartScheduleClearPageSuccess implements Action {
  static Type = 'Admin/Start/Schedule/ClearPageSuccess' as const;
  readonly type = StartScheduleClearPageSuccess.Type;
}

export class StartScheduleSettlementDateChange implements Action {
  static Type = 'Admin/Start/Schedule/SettlementDateChange' as const;
  readonly type = StartScheduleSettlementDateChange.Type;
  constructor(public settlementDate: string) {}
}

export class StartScheduleFetch implements Action {
  static Type = 'Admin/Start/Schedule/Fetch' as const;
  readonly type = StartScheduleFetch.Type;
}

export class StartScheduleFetchResult implements Action {
  static Type = 'Admin/Start/Schedule/FetchResult' as const;
  readonly type = StartScheduleFetchResult.Type;
  constructor(public inProgressState: IScheduleInProgress, public schedule: ISchedule) {}
}

export class StartScheduleFetchError implements Action {
  static Type = 'Admin/Start/Schedule/FetchError' as const;
  readonly type = StartScheduleFetchError.Type;
  constructor(public error: string) {}
}

export class StartScheduleRun implements Action {
  static Type = 'Admin/Start/Schedule/Run' as const;
  readonly type = StartScheduleRun.Type;
}

export class StartScheduleRunResult implements Action {
  static Type = 'Admin/Start/Schedule/RunResult' as const;
  readonly type = StartScheduleRunResult.Type;
  constructor(public message: string) {}
}

export class StartScheduleRunError implements Action {
  static Type = 'Admin/Start/Schedule/RunError' as const;
  readonly type = StartScheduleRunError.Type;
  constructor(public error: string) {}
}

export class StartScheduleEditOpen implements Action {
  static Type = 'Admin/Start/Schedule/EditOpen' as const;
  readonly type = StartScheduleEditOpen.Type;
}

export class StartScheduleEditClose implements Action {
  static Type = 'Admin/Start/Schedule/EditClose' as const;
  readonly type = StartScheduleEditClose.Type;
}

export class StartScheduleSubmit implements Action {
  static Type = 'Admin/Start/Schedule/Submit' as const;
  readonly type = StartScheduleSubmit.Type;
  constructor(public schedule: ISchedule) {}
}

export class StartScheduleSubmitResult implements Action {
  static Type = 'Admin/Start/Schedule/SubmitResult' as const;
  readonly type = StartScheduleSubmitResult.Type;
  constructor(public schedule: ISchedule) {}
}

export class StartScheduleSubmitError implements Action {
  static Type = 'Admin/Start/Schedule/SubmitError' as const;
  readonly type = StartScheduleSubmitError.Type;
  constructor(public error: string) {}
}

export class StartScheduleToggle implements Action {
  static Type = 'Admin/Start/Schedule/Toggle' as const;
  readonly type = StartScheduleToggle.Type;
  constructor(public checked: boolean) {}
}

export class StartScheduleToggleResult implements Action {
  static Type = 'Admin/Start/Schedule/ToggleResult' as const;
  readonly type = StartScheduleToggleResult.Type;
  constructor(public schedule: ISchedule) {}
}

export class StartScheduleToggleError implements Action {
  static Type = 'Admin/Start/Schedule/ToggleError' as const;
  readonly type = StartScheduleToggleError.Type;
  constructor(public error: string) {}
}

export class StartScheduleClearCommitMessage implements Action {
  static Type = 'Admin/Start/Schedule/ClearCommitMessage' as const;
  readonly type = StartScheduleClearCommitMessage.Type;
}
