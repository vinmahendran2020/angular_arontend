import { Action } from '@ngrx/store';
import { ICurrentTab } from '../../types';

export class SettlementCurrentTabRefresh implements Action {
  static Type = 'Settlement/CurrentTabRefresh' as const;
  readonly type = SettlementCurrentTabRefresh.Type;
  constructor(public tab: ICurrentTab) {}
}

export class SettlementClearPageError implements Action {
  static Type = 'Settlement/ClearPageError' as const;
  readonly type = SettlementClearPageError.Type;
  constructor(public tab: ICurrentTab) {}
}

export class SettlementClearPageSuccess implements Action {
  static Type = 'Settlement/ClearPageSuccess' as const;
  readonly type = SettlementClearPageSuccess.Type;
  constructor(public tab: ICurrentTab) {}
}
