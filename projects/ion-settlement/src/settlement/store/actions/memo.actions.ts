import { Action } from '@ngrx/store';
import { IMemo } from '../../types/memo';

export class MemoPageLoaded implements Action {
  static Type = 'Settlement/Memo/PageLoaded' as const;
  readonly type = MemoPageLoaded.Type;
}

export class MemoPageDestroyed implements Action {
  static Type = 'Settlement/Memo/PageDestroyed' as const;
  readonly type = MemoPageDestroyed.Type;
}

export class MemoClearPageError implements Action {
  static Type = 'Settlement/Memo/ClearPageError' as const;
  readonly type = MemoClearPageError.Type;
}

export class MemoClearPageSuccess implements Action {
  static Type = 'Settlement/Memo/ClearPageSuccess' as const;
  readonly type = MemoClearPageSuccess.Type;
}

export class MemoResetForm implements Action {
  static Type = 'Settlement/Memo/ResetForm' as const;
  readonly type = MemoResetForm.Type;
}

export class MemoSummarySearch implements Action {
  static Type = 'Settlement/Memo/SummarySearch' as const;
  readonly type = MemoSummarySearch.Type;
}

export class MemoSummaryFound implements Action {
  static Type = 'Settlement/Memo/SummaryFound' as const;
  readonly type = MemoSummaryFound.Type;
  constructor(public memos: IMemo[]) {}
}

export class MemoSummaryError implements Action {
  static Type = 'Settlement/Memo/SummaryError' as const;
  readonly type = MemoSummaryError.Type;
  constructor(public error: string) {}
}

export class MemoSummaryServerError implements Action {
  static Type = 'Settlement/Memo/SummaryServerError' as const;
  readonly type = MemoSummaryServerError.Type;
  constructor(public error: string) {}
}

export class MemoFilterSummary implements Action {
  static Type = 'Settlement/Memo/FilterSummary' as const;
  readonly type = MemoFilterSummary.Type;
}

export class MemoActionChange implements Action {
  static Type = 'Settlement/Memo/ActionChange' as const;
  readonly type = MemoActionChange.Type;
  constructor(public action: string) {}
}

export class MemoCusipNameChange implements Action {
  static Type = 'Settlement/Memo/CusipNameChange' as const;
  readonly type = MemoCusipNameChange.Type;
  constructor(public cusipName: string) {}
}

export class MemoCusipIdChange implements Action {
  static Type = 'Settlement/Memo/CusipIdChange' as const;
  readonly type = MemoCusipIdChange.Type;
  constructor(public cusipId: string) {}
}

