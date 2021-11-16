import { Action } from '@ngrx/store';
import { IRiskSummary } from '../../types/risk';

export class RiskPageLoaded implements Action {
  static Type = 'Dashboard/Risk/PageLoaded' as const;
  readonly type = RiskPageLoaded.Type;
}

export class RiskPageRefreshed implements Action {
  static Type = 'Dashboard/Risk/PageRefreshed' as const;
  readonly type = RiskPageRefreshed.Type;
}

export class RiskPageDestroyed implements Action {
  static Type = 'Dashboard/Risk/PageDestroyed' as const;
  readonly type = RiskPageDestroyed.Type;
}

export class RiskClearPageError implements Action {
  static Type = 'Dashboard/Risk/ClearPageError' as const;
  readonly type = RiskClearPageError.Type;
}

export class RiskClearPageSuccess implements Action {
  static Type = 'Dashboard/Risk/ClearPageSuccess' as const;
  readonly type = RiskClearPageSuccess.Type;
}

export class RiskParticipantIdChange implements Action {
  static Type = 'Dashboard/Risk/ParticipantIdChange' as const;
  readonly type = RiskParticipantIdChange.Type;
  constructor(public participantId: string, public triggerSearch: boolean) {}
}

export class RiskParticipantIdFound implements Action {
  static Type = 'Dashboard/Risk/ParticipantIdFound' as const;
  readonly type = RiskParticipantIdFound.Type;
  constructor(public participantId: string, public triggerSearch: boolean) {}
}

export class RiskParticipantIdError implements Action {
  static Type = 'Dashboard/Risk/ParticipantIdError' as const;
  readonly type = RiskParticipantIdError.Type;
  constructor(public participantIdError: string) {}
}

export class RiskCollateralIdChange implements Action {
  static Type = 'Dashboard/Risk/CollateralIdChange' as const;
  readonly type = RiskCollateralIdChange.Type;
  constructor(public collateralId: string, public triggerSearch: boolean) {}
}

export class RiskFormEnterKeyed implements Action {
  static Type = 'Dashboard/Risk/FormEnterKeyed' as const;
  readonly type = RiskFormEnterKeyed.Type;
}

export class RiskResetForm implements Action {
  static Type = 'Dashboard/Risk/ResetForm' as const;
  readonly type = RiskResetForm.Type;
}

export class RiskSummarySearch implements Action {
  static Type = 'Dashboard/Risk/SummarySearch' as const;
  readonly type = RiskSummarySearch.Type;
}

export class RiskSummaryFound implements Action {
  static Type = 'Dashboard/Risk/SummaryFound' as const;
  readonly type = RiskSummaryFound.Type;
  constructor(public summary: IRiskSummary) {}
}

export class RiskSummaryError implements Action {
  static Type = 'Dashboard/Risk/SummaryError' as const;
  readonly type = RiskSummaryError.Type;
  constructor(public error: string) {}
}

export class RiskSummaryServerError implements Action {
  static Type = 'Dashboard/Risk/SummaryServerError' as const;
  readonly type = RiskSummaryServerError.Type;
  constructor(public error: string) {}
}
