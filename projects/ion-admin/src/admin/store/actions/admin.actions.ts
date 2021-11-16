import { Action } from '@ngrx/store';
import { ICurrentTab } from '../../types';

export class AdminCurrentTabRefresh implements Action {
  static Type = 'Admin/CurrentTabRefresh' as const;
  readonly type = AdminCurrentTabRefresh.Type;
  constructor(public tab: ICurrentTab) {}
}

export class AdminClearPageError implements Action {
  static Type = 'Admin/ClearPageError' as const;
  readonly type = AdminClearPageError.Type;
  constructor(public tab: ICurrentTab) {}
}

export class AdminClearPageSuccess implements Action {
  static Type = 'Admin/ClearPageSuccess' as const;
  readonly type = AdminClearPageSuccess.Type;
  constructor(public tab: ICurrentTab) {}
}
