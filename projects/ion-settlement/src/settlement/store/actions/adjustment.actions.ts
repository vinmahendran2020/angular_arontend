import { Action } from '@ngrx/store';
import { IAdjustment } from '../../types/adjustment';

export class AdjustmentPageLoaded implements Action {
  static Type = 'Settlement/Adjustment/PageLoaded' as const;
  readonly type = AdjustmentPageLoaded.Type;
}

export class AdjustmentPageDestroyed implements Action {
  static Type = 'Settlement/Adjustment/PageDestroyed' as const;
  readonly type = AdjustmentPageDestroyed.Type;
}

export class AdjustmentClearPageError implements Action {
  static Type = 'Settlement/Adjustment/ClearPageError' as const;
  readonly type = AdjustmentClearPageError.Type;
}

export class AdjustmentClearPageSuccess implements Action {
  static Type = 'Settlement/Adjustment/ClearPageSuccess' as const;
  readonly type = AdjustmentClearPageSuccess.Type;
}

export class AdjustmentResetForm implements Action {
  static Type = 'Settlement/Adjustment/ResetForm' as const;
  readonly type = AdjustmentResetForm.Type;
}

export class AdjustmentSummarySearch implements Action {
  static Type = 'Settlement/Adjustment/SummarySearch' as const;
  readonly type = AdjustmentSummarySearch.Type;
}

export class AdjustmentSummaryFound implements Action {
  static Type = 'Settlement/Adjustment/SummaryFound' as const;
  readonly type = AdjustmentSummaryFound.Type;
  constructor(public adjustments: IAdjustment[]) {}
}

export class AdjustmentSummaryError implements Action {
  static Type = 'Settlement/Adjustment/SummaryError' as const;
  readonly type = AdjustmentSummaryError.Type;
  constructor(public error: string) {}
}

export class AdjustmentSummaryServerError implements Action {
  static Type = 'Settlement/Adjustment/SummaryServerError' as const;
  readonly type = AdjustmentSummaryServerError.Type;
  constructor(public error: string) {}
}

export class AdjustmentFilterSummary implements Action {
  static Type = 'Settlement/Adjustment/FilterSummary' as const;
  readonly type = AdjustmentFilterSummary.Type;
}

export class AdjustmentTransactionIdChange implements Action {
  static Type = 'Settlement/Adjustment/TransactionIdChange' as const;
  readonly type = AdjustmentTransactionIdChange.Type;
  constructor(public transactionId: string) {}
}

export class AdjustmentSettlementDateChange implements Action {
  static Type = 'Settlement/Adjustment/SettlementDateChange' as const;
  readonly type = AdjustmentSettlementDateChange.Type;
  constructor(public settlementDate: string) {}
}

export class AdjustmentActionChange implements Action {
  static Type = 'Settlement/Adjustment/ActionChange' as const;
  readonly type = AdjustmentActionChange.Type;
  constructor(public action: string) {}
}

export class AdjustmentStatusChange implements Action {
  static Type = 'Settlement/Adjustment/StatusChange' as const;
  readonly type = AdjustmentStatusChange.Type;
  constructor(public status: string) {}
}

export class AdjustmentCreationDateChange implements Action {
  static Type = 'Settlement/Adjustment/CreationDate' as const;
  readonly type = AdjustmentCreationDateChange.Type;
  constructor(public creationDate: string) {}
}
