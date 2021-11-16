import { Action } from '@ngrx/store';
import { ISchedule, IScheduleInProgress } from '../../types/schedule';

export class SecuritySchedulePageLoaded implements Action {
  static Type = 'Admin/Security/Schedule/PageLoaded' as const;
  readonly type = SecuritySchedulePageLoaded.Type;
}

export class SecuritySchedulePageDestroyed implements Action {
  static Type = 'Admin/Security/Schedule/PageDestroyed' as const;
  readonly type = SecuritySchedulePageDestroyed.Type;
}

export class SecuritySchedulePageRefreshed implements Action {
  static Type = 'Admin/Security/Schedule/PageRefreshed' as const;
  readonly type = SecuritySchedulePageRefreshed.Type;
}

export class SecurityScheduleClearPageError implements Action {
  static Type = 'Admin/Security/Schedule/ClearPageError' as const;
  readonly type = SecurityScheduleClearPageError.Type;
}

export class SecurityScheduleClearPageSuccess implements Action {
  static Type = 'Admin/Security/Schedule/ClearPageSuccess' as const;
  readonly type = SecurityScheduleClearPageSuccess.Type;
}

export class SecurityScheduleSettlementDateChange implements Action {
  static Type = 'Admin/Security/Schedule/SettlementDateChange' as const;
  readonly type = SecurityScheduleSettlementDateChange.Type;
  constructor(public settlementDate: string) {}
}

export class SecurityScheduleFetch implements Action {
  static Type = 'Admin/Security/Schedule/Fetch' as const;
  readonly type = SecurityScheduleFetch.Type;
}

export class SecurityScheduleFetchResult implements Action {
  static Type = 'Admin/Security/Schedule/FetchResult' as const;
  readonly type = SecurityScheduleFetchResult.Type;
  constructor(public inProgressState: IScheduleInProgress, public schedule: ISchedule) {}
}

export class SecurityScheduleFetchError implements Action {
  static Type = 'Admin/Security/Schedule/FetchError' as const;
  readonly type = SecurityScheduleFetchError.Type;
  constructor(public error: string) {}
}

export class SecurityScheduleRun implements Action {
  static Type = 'Admin/Security/Schedule/Run' as const;
  readonly type = SecurityScheduleRun.Type;
}

export class SecurityScheduleRunResult implements Action {
  static Type = 'Admin/Security/Schedule/RunResult' as const;
  readonly type = SecurityScheduleRunResult.Type;
  constructor(public message: string) {}
}

export class SecurityScheduleRunError implements Action {
  static Type = 'Admin/Security/Schedule/RunError' as const;
  readonly type = SecurityScheduleRunError.Type;
  constructor(public error: string) {}
}

export class SecurityScheduleEditOpen implements Action {
  static Type = 'Admin/Security/Schedule/EditOpen' as const;
  readonly type = SecurityScheduleEditOpen.Type;
}

export class SecurityScheduleEditClose implements Action {
  static Type = 'Admin/Security/Schedule/EditClose' as const;
  readonly type = SecurityScheduleEditClose.Type;
}

export class SecurityScheduleSubmit implements Action {
  static Type = 'Admin/Security/Schedule/Submit' as const;
  readonly type = SecurityScheduleSubmit.Type;
  constructor(public schedule: ISchedule) {}
}

export class SecurityScheduleSubmitResult implements Action {
  static Type = 'Admin/Security/Schedule/SubmitResult' as const;
  readonly type = SecurityScheduleSubmitResult.Type;
  constructor(public schedule: ISchedule) {}
}

export class SecurityScheduleSubmitError implements Action {
  static Type = 'Admin/Security/Schedule/SubmitError' as const;
  readonly type = SecurityScheduleSubmitError.Type;
  constructor(public error: string) {}
}

export class SecurityScheduleToggle implements Action {
  static Type = 'Admin/Security/Schedule/Toggle' as const;
  readonly type = SecurityScheduleToggle.Type;
  constructor(public checked: boolean) {}
}

export class SecurityScheduleToggleResult implements Action {
  static Type = 'Admin/Security/Schedule/ToggleResult' as const;
  readonly type = SecurityScheduleToggleResult.Type;
  constructor(public schedule: ISchedule) {}
}

export class SecurityScheduleToggleError implements Action {
  static Type = 'Admin/Security/Schedule/ToggleError' as const;
  readonly type = SecurityScheduleToggleError.Type;
  constructor(public error: string) {}
}

export class SecurityScheduleClearCommitMessage implements Action {
  static Type = 'Admin/Security/Schedule/ClearCommitMessage' as const;
  readonly type = SecurityScheduleClearCommitMessage.Type;
}
