import { Action } from '@ngrx/store';
import { ICashSummary } from '../../types/cash';

export class CashPageLoaded implements Action {
  static Type = 'Transaction/Cash/PageLoaded' as const;
  readonly type = CashPageLoaded.Type;
}

export class CashPageRefreshed implements Action {
  static Type = 'Transaction/Cash/PageRefreshed' as const;
  readonly type = CashPageRefreshed.Type;
}

export class CashPageDestroyed implements Action {
  static Type = 'Transaction/Cash/PageDestroyed' as const;
  readonly type = CashPageDestroyed.Type;
}

export class CashClearPageError implements Action {
  static Type = 'Transaction/Cash/ClearPageError' as const;
  readonly type = CashClearPageError.Type;
}

export class CashClearPageSuccess implements Action {
  static Type = 'Transaction/Cash/ClearPageSuccess' as const;
  readonly type = CashClearPageSuccess.Type;
}

export class CashParticipantIdChange implements Action {
  static Type = 'Transaction/Cash/ParticipantIdChange' as const;
  readonly type = CashParticipantIdChange.Type;
  constructor(public participantId: string, public triggerSearch: boolean) {}
}

export class CashParticipantIdFound implements Action {
  static Type = 'Transaction/Cash/ParticipantIdFound' as const;
  readonly type = CashParticipantIdFound.Type;
  constructor(public participantId: string, public triggerSearch: boolean) {}
}

export class CashParticipantIdError implements Action {
  static Type = 'Transaction/Cash/ParticipantIdError' as const;
  readonly type = CashParticipantIdError.Type;
  constructor(public participantIdError: string) {}
}

export class CashFormEnterKeyed implements Action {
  static Type = 'Transaction/Cash/FormEnterKeyed' as const;
  readonly type = CashFormEnterKeyed.Type;
}

export class CashSummarySearch implements Action {
  static Type = 'Transaction/Cash/SummarySearch' as const;
  readonly type = CashSummarySearch.Type;
  constructor(public payload?: unknown) {}
}

export class CashSummaryFound implements Action {
  static Type = 'Transaction/Cash/SummaryFound' as const;
  readonly type = CashSummaryFound.Type;
  constructor(public summary: ICashSummary) {}
}

export class CashSummaryError implements Action {
  static Type = 'Transaction/Cash/SummaryError' as const;
  readonly type = CashSummaryError.Type;
  constructor(public error: string) {}
}

export class CashSummaryServerError implements Action {
  static Type = 'Transaction/Cash/SummaryServerError' as const;
  readonly type = CashSummaryServerError.Type;
  constructor(public error: string) {}
}

export class CashActivityOperationChange implements Action {
  static Type = 'Transaction/Cash/Activity/OperationChange' as const;
  readonly type = CashActivityOperationChange.Type;
  constructor(public operation: string) {}
}

export class CashActivityAmountChange implements Action {
  static Type = 'Transaction/Cash/Activity/AmountChange' as const;
  readonly type = CashActivityAmountChange.Type;
  constructor(public amount: string) {}
}

export class CashActivityResetForm implements Action {
  static Type = 'Transaction/Cash/Activity/ResetForm' as const;
  readonly type = CashActivityResetForm.Type;
}

export class CashActivitySubmit implements Action {
  static Type = 'Transaction/Cash/Activity/Submit' as const;
  readonly type = CashActivitySubmit.Type;
}

export class CashActivitySubmitResult implements Action {
  static Type = 'Transaction/Cash/Activity/SubmitResult' as const;
  readonly type = CashActivitySubmitResult.Type;
  constructor(public message: string) {}
}

export class CashActivitySubmitError implements Action {
  static Type = 'Transaction/Cash/Activity/SummaryError' as const;
  readonly type = CashActivitySubmitError.Type;
  constructor(public error: string) {}
}
