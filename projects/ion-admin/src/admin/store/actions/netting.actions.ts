import { Action } from '@ngrx/store';
import { ISchedule, IScheduleStatus, IScheduleInProgress } from '../../types/schedule';

export class NettingSchedulePageLoaded implements Action {
  static Type = 'Admin/Netting/Schedule/PageLoaded' as const;
  readonly type = NettingSchedulePageLoaded.Type;
}

export class NettingSchedulePageDestroyed implements Action {
  static Type = 'Admin/Netting/Schedule/PageDestroyed' as const;
  readonly type = NettingSchedulePageDestroyed.Type;
}

export class NettingSchedulePageRefreshed implements Action {
  static Type = 'Admin/Netting/Schedule/PageRefreshed' as const;
  readonly type = NettingSchedulePageRefreshed.Type;
}

export class NettingScheduleClearPageError implements Action {
  static Type = 'Admin/Netting/Schedule/ClearPageError' as const;
  readonly type = NettingScheduleClearPageError.Type;
}

export class NettingScheduleClearPageSuccess implements Action {
  static Type = 'Admin/Netting/Schedule/ClearPageSuccess' as const;
  readonly type = NettingScheduleClearPageSuccess.Type;
}

export class NettingScheduleFetch implements Action {
  static Type = 'Admin/Netting/Schedule/Fetch' as const;
  readonly type = NettingScheduleFetch.Type;
}

export class NettingScheduleFetchResult implements Action {
  static Type = 'Admin/Netting/Schedule/FetchResult' as const;
  readonly type = NettingScheduleFetchResult.Type;
  constructor(public inProgressState: IScheduleInProgress, public schedule: ISchedule) {}
}

export class NettingScheduleFetchError implements Action {
  static Type = 'Admin/Netting/Schedule/FetchError' as const;
  readonly type = NettingScheduleFetchError.Type;
  constructor(public error: string) {}
}

export class NettingScheduleRun implements Action {
  static Type = 'Admin/Netting/Schedule/Run' as const;
  readonly type = NettingScheduleRun.Type;
}

export class NettingScheduleRunResult implements Action {
  static Type = 'Admin/Netting/Schedule/RunResult' as const;
  readonly type = NettingScheduleRunResult.Type;
  constructor(public message: string) {}
}

export class NettingScheduleRunError implements Action {
  static Type = 'Admin/Netting/Schedule/RunError' as const;
  readonly type = NettingScheduleRunError.Type;
  constructor(public error: string) {}
}

export class NettingScheduleEditOpen implements Action {
  static Type = 'Admin/Netting/Schedule/EditOpen' as const;
  readonly type = NettingScheduleEditOpen.Type;
}

export class NettingScheduleEditClose implements Action {
  static Type = 'Admin/Netting/Schedule/EditClose' as const;
  readonly type = NettingScheduleEditClose.Type;
}

export class NettingScheduleSubmit implements Action {
  static Type = 'Admin/Netting/Schedule/Submit' as const;
  readonly type = NettingScheduleSubmit.Type;
  constructor(public schedule: ISchedule) {}
}

export class NettingScheduleSubmitResult implements Action {
  static Type = 'Admin/Netting/Schedule/SubmitResult' as const;
  readonly type = NettingScheduleSubmitResult.Type;
  constructor(public schedule: ISchedule) {}
}

export class NettingScheduleSubmitError implements Action {
  static Type = 'Admin/Netting/Schedule/SubmitError' as const;
  readonly type = NettingScheduleSubmitError.Type;
  constructor(public error: string) {}
}

export class NettingScheduleToggle implements Action {
  static Type = 'Admin/Netting/Schedule/Toggle' as const;
  readonly type = NettingScheduleToggle.Type;
  constructor(public checked: boolean) {}
}

export class NettingScheduleToggleResult implements Action {
  static Type = 'Admin/Netting/Schedule/ToggleResult' as const;
  readonly type = NettingScheduleToggleResult.Type;
  constructor(public schedule: ISchedule) {}
}

export class NettingScheduleToggleError implements Action {
  static Type = 'Admin/Netting/Schedule/ToggleError' as const;
  readonly type = NettingScheduleToggleError.Type;
  constructor(public error: string) {}
}

export class NettingScheduleClearCommitMessage implements Action {
  static Type = 'Admin/Netting/Schedule/ClearCommitMessage' as const;
  readonly type = NettingScheduleClearCommitMessage.Type;
}
