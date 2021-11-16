import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import {
  AdminClearPageError,
  AdminClearPageSuccess,
  AdminCurrentTabRefresh,
} from '../actions/admin.actions';

import {
  CashScheduleClearPageError,
  CashScheduleClearPageSuccess,
  CashScheduleFetch,
  CashSchedulePageRefreshed,
} from '../actions/cash.actions';
import { EndScheduleClearPageError, EndScheduleClearPageSuccess, EndSchedulePageRefreshed } from '../actions/end.actions';
import {
  NettingScheduleClearPageError,
  NettingScheduleClearPageSuccess,
  NettingScheduleFetch,
  NettingSchedulePageRefreshed,
} from '../actions/netting.actions';
import {
  SecurityScheduleClearPageError,
  SecurityScheduleClearPageSuccess,
  SecurityScheduleFetch,
  SecuritySchedulePageRefreshed,
} from '../actions/security.actions';
import { StartScheduleClearPageError, StartScheduleClearPageSuccess, StartSchedulePageRefreshed } from '../actions/start.actions';
import { selectCurrentTab } from '../selectors/module.selectors';

@Injectable()
export class AdminEffects {
  shellRefreshEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType('Shell/CurrentPageRefresh'),
      withLatestFrom(this.store.select(selectCurrentTab)),
      filter(([action, currentTab]) => currentTab !== 'none'),
      map(([action, currentTab]) => new AdminCurrentTabRefresh(currentTab))
    )
  );

  shellClearErrorEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType('Shell/ClearPageError'),
      withLatestFrom(this.store.select(selectCurrentTab)),
      filter(([action, currentTab]) => currentTab !== 'none'),
      map(([action, currentTab]) => new AdminClearPageError(currentTab))
    )
  );

  shellClearSuccessEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType('Shell/ClearPageSuccess'),
      withLatestFrom(this.store.select(selectCurrentTab)),
      filter(([action, currentTab]) => currentTab !== 'none'),
      map(([action, currentTab]) => new AdminClearPageSuccess(currentTab))
    )
  );

  adminRefreshedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<AdminCurrentTabRefresh>(AdminCurrentTabRefresh.Type),
      map(({ tab }) => {
        if (tab === 'cash') {
          return new CashSchedulePageRefreshed();
        } else if (tab === 'netting') {
          return new NettingSchedulePageRefreshed();
        } else if (tab === 'security') {
          return new SecuritySchedulePageRefreshed();
        } else if (tab === 'start') {
          return new StartSchedulePageRefreshed();
        } else if (tab === 'end') {
          return new EndSchedulePageRefreshed();
        }
        return { type: 'none' };
      }),
      filter((action) => action.type !== 'none')
    )
  );

  adminClearPageErrorEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<AdminClearPageError>(AdminClearPageError.Type),
      map(({ tab }) => {
        if (tab === 'cash') {
          return new CashScheduleClearPageError();
        } else if (tab === 'netting') {
          return new NettingScheduleClearPageError();
        } else if (tab === 'security') {
          return new SecurityScheduleClearPageError();
        } else if (tab === 'start') {
          return new StartScheduleClearPageError();
        } else if (tab === 'end') {
          return new EndScheduleClearPageError();
        }
        return { type: 'none' };
      }),
      filter((action) => action.type !== 'none')
    )
  );

  adminClearPageSuccessEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<AdminClearPageSuccess>(AdminClearPageSuccess.Type),
      map(({ tab }) => {
        if (tab === 'cash') {
          return new CashScheduleClearPageSuccess();
        } else if (tab === 'netting') {
          return new NettingScheduleClearPageSuccess();
        } else if (tab === 'security') {
          return new SecurityScheduleClearPageSuccess();
        } else if (tab === 'start') {
          return new StartScheduleClearPageSuccess();
        } else if (tab === 'end') {
          return new EndScheduleClearPageSuccess();
        }
        return { type: 'none' };
      }),
      filter((action) => action.type !== 'none')
    )
  );

  constructor(private actions$: Actions, private store: Store) {}
}
