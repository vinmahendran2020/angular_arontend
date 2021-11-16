import { Action } from '@ngrx/store';
import { ISchedule, IScheduleInProgress } from '../../types/schedule';

export class EndSchedulePageLoaded implements Action {
  static Type = 'Admin/End/Schedule/PageLoaded' as const;
  readonly type = EndSchedulePageLoaded.Type;
}

export class EndSchedulePageDestroyed implements Action {
  static Type = 'Admin/End/Schedule/PageDestroyed' as const;
  readonly type = EndSchedulePageDestroyed.Type;
}

export class EndSchedulePageRefreshed implements Action {
  static Type = 'Admin/End/Schedule/PageRefreshed' as const;
  readonly type = EndSchedulePageRefreshed.Type;
}

export class EndScheduleClearPageError implements Action {
  static Type = 'Admin/End/Schedule/ClearPageError' as const;
  readonly type = EndScheduleClearPageError.Type;
}

export class EndScheduleClearPageSuccess implements Action {
  static Type = 'Admin/End/Schedule/ClearPageSuccess' as const;
  readonly type = EndScheduleClearPageSuccess.Type;
}

export class EndScheduleSettlementDateChange implements Action {
  static Type = 'Admin/End/Schedule/SettlementDateChange' as const;
  readonly type = EndScheduleSettlementDateChange.Type;
  constructor(public settlementDate: string) {}
}

export class EndScheduleFetch implements Action {
  static Type = 'Admin/End/Schedule/Fetch' as const;
  readonly type = EndScheduleFetch.Type;
}

export class EndScheduleFetchResult implements Action {
  static Type = 'Admin/End/Schedule/FetchResult' as const;
  readonly type = EndScheduleFetchResult.Type;
  constructor(public inProgressState: IScheduleInProgress, public schedule: ISchedule) {}
}

export class EndScheduleFetchError implements Action {
  static Type = 'Admin/End/Schedule/FetchError' as const;
  readonly type = EndScheduleFetchError.Type;
  constructor(public error: string) {}
}

export class EndScheduleRun implements Action {
  static Type = 'Admin/End/Schedule/Run' as const;
  readonly type = EndScheduleRun.Type;
}

export class EndScheduleRunResult implements Action {
  static Type = 'Admin/End/Schedule/RunResult' as const;
  readonly type = EndScheduleRunResult.Type;
  constructor(public message: string) {}
}

export class EndScheduleRunError implements Action {
  static Type = 'Admin/End/Schedule/RunError' as const;
  readonly type = EndScheduleRunError.Type;
  constructor(public error: string) {}
}

export class EndScheduleEditOpen implements Action {
  static Type = 'Admin/End/Schedule/EditOpen' as const;
  readonly type = EndScheduleEditOpen.Type;
}

export class EndScheduleEditClose implements Action {
  static Type = 'Admin/End/Schedule/EditClose' as const;
  readonly type = EndScheduleEditClose.Type;
}

export class EndScheduleSubmit implements Action {
  static Type = 'Admin/End/Schedule/Submit' as const;
  readonly type = EndScheduleSubmit.Type;
  constructor(public schedule: ISchedule) {}
}

export class EndScheduleSubmitResult implements Action {
  static Type = 'Admin/End/Schedule/SubmitResult' as const;
  readonly type = EndScheduleSubmitResult.Type;
  constructor(public schedule: ISchedule) {}
}

export class EndScheduleSubmitError implements Action {
  static Type = 'Admin/End/Schedule/SubmitError' as const;
  readonly type = EndScheduleSubmitError.Type;
  constructor(public error: string) {}
}

export class EndScheduleToggle implements Action {
  static Type = 'Admin/End/Schedule/Toggle' as const;
  readonly type = EndScheduleToggle.Type;
  constructor(public checked: boolean) {}
}

export class EndScheduleToggleResult implements Action {
  static Type = 'Admin/End/Schedule/ToggleResult' as const;
  readonly type = EndScheduleToggleResult.Type;
  constructor(public schedule: ISchedule) {}
}

export class EndScheduleToggleError implements Action {
  static Type = 'Admin/End/Schedule/ToggleError' as const;
  readonly type = EndScheduleToggleError.Type;
  constructor(public error: string) {}
}

export class EndScheduleClearCommitMessage implements Action {
  static Type = 'Admin/End/Schedule/ClearCommitMessage' as const;
  readonly type = EndScheduleClearCommitMessage.Type;
}
