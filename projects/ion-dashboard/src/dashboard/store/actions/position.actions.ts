import { Action } from '@ngrx/store';
import { IPositionSummary } from '../../types/position';

export class PositionPageLoaded implements Action {
  static Type = 'Dashboard/Position/PageLoaded' as const;
  readonly type = PositionPageLoaded.Type;
}

export class PositionPageRefreshed implements Action {
  static Type = 'Dashboard/Position/PageRefreshed' as const;
  readonly type = PositionPageRefreshed.Type;
}

export class PositionPageDestroyed implements Action {
  static Type = 'Dashboard/Position/PageDestroyed' as const;
  readonly type = PositionPageDestroyed.Type;
}

export class PositionClearPageError implements Action {
  static Type = 'Dashboard/Position/ClearPageError' as const;
  readonly type = PositionClearPageError.Type;
}

export class PositionClearPageSuccess implements Action {
  static Type = 'Dashboard/Position/ClearPageSuccess' as const;
  readonly type = PositionClearPageSuccess.Type;
}

export class PositionParticipantIdChange implements Action {
  static Type = 'Dashboard/Position/ParticipantIdChange' as const;
  readonly type = PositionParticipantIdChange.Type;
  constructor(public participantId: string, public triggerSearch: boolean) {}
}

export class PositionParticipantIdFound implements Action {
  static Type = 'Dashboard/Position/ParticipantIdFound' as const;
  readonly type = PositionParticipantIdFound.Type;
  constructor(public participantId: string, public triggerSearch: boolean) {}
}

export class PositionParticipantIdError implements Action {
  static Type = 'Dashboard/Position/ParticipantIdError' as const;
  readonly type = PositionParticipantIdError.Type;
  constructor(public participantIdError: string) {}
}

export class PositionCusipChange implements Action {
  static Type = 'Dashboard/Position/CusipChange' as const;
  readonly type = PositionCusipChange.Type;
  constructor(public cusip: string) {}
}

export class PositionDateChange implements Action {
  static Type = 'Dashboard/Position/DateChange' as const;
  readonly type = PositionDateChange.Type;
  constructor(public date: string) {}
}

export class PositionFormEnterKeyed implements Action {
  static Type = 'Dashboard/Position/FormEnterKeyed' as const;
  readonly type = PositionFormEnterKeyed.Type;
}

export class PositionResetForm implements Action {
  static Type = 'Dashboard/Position/ResetForm' as const;
  readonly type = PositionResetForm.Type;
}

export class PositionSummarySearch implements Action {
  static Type = 'Dashboard/Position/SummarySearch' as const;
  readonly type = PositionSummarySearch.Type;
  constructor(public payload?: unknown) {}
}

export class PositionSummaryFound implements Action {
  static Type = 'Dashboard/Position/SummaryFound' as const;
  readonly type = PositionSummaryFound.Type;
  constructor(public summary: IPositionSummary) {}
}

export class PositionSummaryError implements Action {
  static Type = 'Dashboard/Position/SummaryError' as const;
  readonly type = PositionSummaryError.Type;
  constructor(public error: string) {}
}

export class PositionSummaryServerError implements Action {
  static Type = 'Dashboard/Position/SummaryServerError' as const;
  readonly type = PositionSummaryServerError.Type;
  constructor(public error: string) {}
}

export class PositionCusipSearchOpen implements Action {
  static Type = 'Dashboard/Position/CusipSearchOpen' as const;
  readonly type = PositionCusipSearchOpen.Type;
}

export class PositionCusipSearchClose implements Action {
  static Type = 'Dashboard/Position/CusipSearchClose' as const;
  readonly type = PositionCusipSearchClose.Type;
}
