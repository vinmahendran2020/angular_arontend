import { Action } from '@ngrx/store';
import {
  ICCATransactionDetail,
  ICCASummary,
} from '../../types/cca';

export class CCAPageLoaded implements Action {
  static Type = 'Dashboard/CCA/PageLoaded' as const;
  readonly type = CCAPageLoaded.Type;
}

export class CCAPageRefreshed implements Action {
  static Type = 'Dashboard/CCA/PageRefreshed' as const;
  readonly type = CCAPageRefreshed.Type;
}

export class CCAPageDestroyed implements Action {
  static Type = 'Dashboard/CCA/PageDestroyed' as const;
  readonly type = CCAPageDestroyed.Type;
}

export class CCAClearPageError implements Action {
  static Type = 'Dashboard/CCA/ClearPageError' as const;
  readonly type = CCAClearPageError.Type;
}

export class CCAClearPageSuccess implements Action {
  static Type = 'Dashboard/CCA/ClearPageSuccess' as const;
  readonly type = CCAClearPageSuccess.Type;
}

export class CCAParticipantIdChange implements Action {
  static Type = 'Dashboard/CCA/ParticipantIdChange' as const;
  readonly type = CCAParticipantIdChange.Type;
  constructor(public participantId: string, public triggerSearch: boolean) {}
}

export class CCAParticipantIdFound implements Action {
  static Type = 'Dashboard/CCA/ParticipantIdFound' as const;
  readonly type = CCAParticipantIdFound.Type;
  constructor(public participantId: string, public triggerSearch: boolean) {}
}

export class CCAParticipantIdError implements Action {
  static Type = 'Dashboard/CCA/ParticipantIdError' as const;
  readonly type = CCAParticipantIdError.Type;
  constructor(public participantIdError: string) {}
}

export class CCASettlementDateChange implements Action {
  static Type = 'Dashboard/CCA/SettlementDateChange' as const;
  readonly type = CCASettlementDateChange.Type;
  constructor(public settlementDate: Array<string>) {}
}

export class CCAFormEnterKeyed implements Action {
  static Type = 'Dashboard/CCA/FormEnterKeyed' as const;
  readonly type = CCAFormEnterKeyed.Type;
}

export class CCAResetForm implements Action {
  static Type = 'Dashboard/CCA/ResetForm' as const;
  readonly type = CCAResetForm.Type;
}

export class CCASummarySearch implements Action {
  static Type = 'Dashboard/CCA/SummarySearch' as const;
  readonly type = CCASummarySearch.Type;
}

export class CCASummaryFound implements Action {
  static Type = 'Dashboard/CCA/SummaryFound' as const;
  readonly type = CCASummaryFound.Type;
  constructor(public summary: ICCASummary) {}
}

export class CCASummaryError implements Action {
  static Type = 'Dashboard/CCA/SummaryError' as const;
  readonly type = CCASummaryError.Type;
  constructor(public error: string) {}
}

export class CCASummaryServerError implements Action {
  static Type = 'Dashboard/CCA/SummaryServerError' as const;
  readonly type = CCASummaryServerError.Type;
  constructor(public error: string) {}
}

export class CCADetailOpen implements Action {
  static Type = 'Dashboard/CCA/DetailOpen' as const;
  readonly type = CCADetailOpen.Type;
  constructor(public ccaId: string) {}
}

export class CCADetailClose implements Action {
  static Type = 'Dashboard/CCA/DetailClose' as const;
  readonly type = CCADetailClose.Type;
}

export class CCADetailFetch implements Action {
  static Type = 'Dashboard/CCA/DetailFetch' as const;
  readonly type = CCADetailFetch.Type;
}

export class CCADetailFound implements Action {
  static Type = 'Dashboard/CCA/DetailFound' as const;
  readonly type = CCADetailFound.Type;
  constructor(public detail: ICCATransactionDetail) {}
}

export class CCADetailError implements Action {
  static Type = 'Dashboard/CCA/DetailError' as const;
  readonly type = CCADetailError.Type;
  constructor(public error: string) {}
}

export class CCACusipChange implements Action {
  static Type = 'Dashboard/CCA/CusipChange' as const;
  readonly type = CCACusipChange.Type;
  constructor(public cusip: string) {}
}
