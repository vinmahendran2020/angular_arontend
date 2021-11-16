import { Action } from '@ngrx/store';
import { ICurrentTab } from '../../types';

export class TransactionCurrentTabRefresh implements Action {
  static Type = 'Transaction/CurrentTabRefresh' as const;
  readonly type = TransactionCurrentTabRefresh.Type;
  constructor(public tab: ICurrentTab) {}
}

export class TransactionClearPageError implements Action {
  static Type = 'Transaction/ClearPageError' as const;
  readonly type = TransactionClearPageError.Type;
  constructor(public tab: ICurrentTab) {}
}

export class TransactionClearPageSuccess implements Action {
  static Type = 'Transaction/ClearPageSuccess' as const;
  readonly type = TransactionClearPageSuccess.Type;
  constructor(public tab: ICurrentTab) {}
}
