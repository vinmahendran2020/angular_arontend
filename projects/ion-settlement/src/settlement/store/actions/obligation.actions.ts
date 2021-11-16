import { Action } from '@ngrx/store';
import { IObligation } from '../../types/obligation';

export class ObligationPageLoaded implements Action {
  static Type = 'Settlement/Obligation/PageLoaded' as const;
  readonly type = ObligationPageLoaded.Type;
}

export class ObligationPageDestroyed implements Action {
  static Type = 'Settlement/Obligation/PageDestroyed' as const;
  readonly type = ObligationPageDestroyed.Type;
}

export class ObligationClearPageError implements Action {
  static Type = 'Settlement/Obligation/ClearPageError' as const;
  readonly type = ObligationClearPageError.Type;
}

export class ObligationClearPageSuccess implements Action {
  static Type = 'Settlement/Obligation/ClearPageSuccess' as const;
  readonly type = ObligationClearPageSuccess.Type;
}

export class ObligationResetForm implements Action {
  static Type = 'Settlement/Obligation/ResetForm' as const;
  readonly type = ObligationResetForm.Type;
}

export class ObligationSummarySearch implements Action {
  static Type = 'Settlement/Obligation/SummarySearch' as const;
  readonly type = ObligationSummarySearch.Type;
}

export class ObligationSummaryFound implements Action {
  static Type = 'Settlement/Obligation/SummaryFound' as const;
  readonly type = ObligationSummaryFound.Type;
  constructor(public obligations: IObligation[]) {}
}

export class ObligationSummaryError implements Action {
  static Type = 'Settlement/Obligation/SummaryError' as const;
  readonly type = ObligationSummaryError.Type;
  constructor(public error: string) {}
}

export class ObligationSummaryServerError implements Action {
  static Type = 'Settlement/Obligation/SummaryServerError' as const;
  readonly type = ObligationSummaryServerError.Type;
  constructor(public error: string) {}
}

export class ObligationFilterSummary implements Action {
  static Type = 'Settlement/Obligation/FilterSummary' as const;
  readonly type = ObligationFilterSummary.Type;
}

export class ObligationCusipNameChange implements Action {
  static Type = 'Settlement/Obligation/CusipNameChange' as const;
  readonly type = ObligationCusipNameChange.Type;
  constructor(public cusipName: string) {}
}

export class ObligationCusipIdChange implements Action {
  static Type = 'Settlement/Obligation/CusipIdChange' as const;
  readonly type = ObligationCusipIdChange.Type;
  constructor(public cusipId: string) {}
}

export class ObligationDirectionChange implements Action {
  static Type = 'Settlement/Obligation/DirectionChange' as const;
  readonly type = ObligationDirectionChange.Type;
  constructor(public direction: string) {}
}

export class ObligationSettlementStatusChange implements Action {
  static Type = 'Settlement/Obligation/SettlementStatusChange' as const;
  readonly type = ObligationSettlementStatusChange.Type;
  constructor(public settlementStatus: string) {}
}
