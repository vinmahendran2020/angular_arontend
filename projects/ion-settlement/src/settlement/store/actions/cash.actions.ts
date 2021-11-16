import { Action } from '@ngrx/store';
import { ICash } from '../../types/cash';

export class CashPageLoaded implements Action {
  static Type = 'Settlement/Cash/PageLoaded' as const;
  readonly type = CashPageLoaded.Type;
}

export class CashPageDestroyed implements Action {
  static Type = 'Settlement/Cash/PageDestroyed' as const;
  readonly type = CashPageDestroyed.Type;
}

export class CashClearPageError implements Action {
  static Type = 'Settlement/Cash/ClearPageError' as const;
  readonly type = CashClearPageError.Type;
}

export class CashClearPageSuccess implements Action {
  static Type = 'Settlement/Cash/ClearPageSuccess' as const;
  readonly type = CashClearPageSuccess.Type;
}

export class CashResetForm implements Action {
  static Type = 'Settlement/Cash/ResetForm' as const;
  readonly type = CashResetForm.Type;
}

export class CashSummarySearch implements Action {
  static Type = 'Settlement/Cash/SummarySearch' as const;
  readonly type = CashSummarySearch.Type;
}

export class CashSummaryFound implements Action {
  static Type = 'Settlement/Cash/SummaryFound' as const;
  readonly type = CashSummaryFound.Type;
  constructor(public cashs: ICash[]) {}
}

export class CashSummaryError implements Action {
  static Type = 'Settlement/Cash/SummaryError' as const;
  readonly type = CashSummaryError.Type;
  constructor(public error: string) {}
}

export class CashSummaryServerError implements Action {
  static Type = 'Settlement/Cash/SummaryServerError' as const;
  readonly type = CashSummaryServerError.Type;
  constructor(public error: string) {}
}

export class CashFilterSummary implements Action {
  static Type = 'Settlement/Cash/FilterSummary' as const;
  readonly type = CashFilterSummary.Type;
}

export class CashActionChange implements Action {
  static Type = 'Settlement/Cash/ActionChange' as const;
  readonly type = CashActionChange.Type;
  constructor(public action: string) {}
}

export class CashDateChange implements Action {
  static Type = 'Settlement/Cash/DateChange' as const;
  readonly type = CashDateChange.Type;
  constructor(public date: string) {}
}
