import { Action } from '@ngrx/store';
import { IScheduleInterval } from '../../types';

export class ShellCurrentPageRefresh implements Action {
  static Type = 'Shell/CurrentPageRefresh' as const;
  readonly type = ShellCurrentPageRefresh.Type;
}

export class ShellClearPageError implements Action {
  static Type = 'Shell/ClearPageError' as const;
  readonly type = ShellClearPageError.Type;
}

export class ShellClearPageSuccess implements Action {
  static Type = 'Shell/ClearPageSuccess' as const;
  readonly type = ShellClearPageSuccess.Type;
}

export class ShellLayoutLoaded implements Action {
  static Type = 'Shell/LayoutLoaded' as const;
  readonly type = ShellLayoutLoaded.Type;
}

export class ScheduleIntervalFetch implements Action {
  static Type = 'Shell/Schedule/Interval/Fetch' as const;
  readonly type = ScheduleIntervalFetch.Type;
}

export class ScheduleIntervalFetchResult implements Action {
  static Type = 'Shell/Schedule/Interval/FetchResult' as const;
  readonly type = ScheduleIntervalFetchResult.Type;
  constructor(public schedule: IScheduleInterval) {}
}

export class ScheduleIntervalFetchError implements Action {
  static Type = 'Shell/Schedule/Interval/FetchError' as const;
  readonly type = ScheduleIntervalFetchError.Type;
  constructor(public error: string) {}
}

export class ShellParticipantChanged implements Action {
  static Type = 'Shell/ParticipantChanged' as const;
  readonly type = ShellParticipantChanged.Type;
  constructor(public participant: string) {}
}

export class ShellParticipantSwitched implements Action {
  static Type = 'Shell/ParticipantSwitched' as const;
  readonly type = ShellParticipantSwitched.Type;
  constructor(public current: string, public previous: string | null) {}
}
