import { Action } from '@ngrx/store';
import { ICurrentTab } from '../../types';

export class DashboardCurrentTabRefresh implements Action {
  static Type = 'Dashboard/CurrentTabRefresh' as const;
  readonly type = DashboardCurrentTabRefresh.Type;
  constructor(public tab: ICurrentTab) {}
}

export class DashboardClearPageError implements Action {
  static Type = 'Dashboard/ClearPageError' as const;
  readonly type = DashboardClearPageError.Type;
  constructor(public tab: ICurrentTab) {}
}

export class DashboardClearPageSuccess implements Action {
  static Type = 'Dashboard/ClearPageSuccess' as const;
  readonly type = DashboardClearPageSuccess.Type;
  constructor(public tab: ICurrentTab) {}
}
