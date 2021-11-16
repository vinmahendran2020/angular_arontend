import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import {
  DashboardClearPageError,
  DashboardClearPageSuccess,
  DashboardCurrentTabRefresh,
} from '../actions/dashboard.actions';
import {
  ObligationClearPageError,
  ObligationClearPageSuccess,
  ObligationPageRefreshed,
} from '../actions/obligation.actions';
import {
  PositionClearPageError,
  PositionClearPageSuccess,
  PositionPageRefreshed,
} from '../actions/position.actions';
import {
  CCAClearPageError,
  CCAClearPageSuccess,
  CCAPageRefreshed,
} from '../actions/cca.actions';

import {
  RiskClearPageError,
  RiskClearPageSuccess,
  RiskPageRefreshed,
} from '../actions/risk.actions';
import { selectCurrentTab } from '../selectors/module.selectors';

@Injectable()
export class DashboardEffects {
  shellRefreshEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType('Shell/CurrentPageRefresh'),
      withLatestFrom(this.store.select(selectCurrentTab)),
      filter(([_, currentTab]) => currentTab !== 'none'),
      map(([_, currentTab]) => new DashboardCurrentTabRefresh(currentTab))
    )
  );

  shellClearErrorEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType('Shell/ClearPageError'),
      withLatestFrom(this.store.select(selectCurrentTab)),
      filter(([action, currentTab]) => currentTab !== 'none'),
      map(([action, currentTab]) => new DashboardClearPageError(currentTab))
    )
  );

  shellClearSuccessEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType('Shell/ClearPageSuccess'),
      withLatestFrom(this.store.select(selectCurrentTab)),
      filter(([action, currentTab]) => currentTab !== 'none'),
      map(([action, currentTab]) => new DashboardClearPageSuccess(currentTab))
    )
  );

  dashboardRefreshEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<DashboardCurrentTabRefresh>(DashboardCurrentTabRefresh.Type),
      map(({ tab }) => {
        if (tab === 'obligation') {
          return new ObligationPageRefreshed();
        } else if (tab === 'position') {
          return new PositionPageRefreshed();
        } else if (tab === 'risk') {
          return new RiskPageRefreshed();
        } else if (tab === 'cca') {
          return new CCAPageRefreshed();
        }
        return { type: 'none' };
      }),
      filter((action) => action.type !== 'none')
    )
  );

  dashboardClearPageErrorEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<DashboardClearPageError>(DashboardClearPageError.Type),
      map(({ tab }) => {
        if (tab === 'obligation') {
          return new ObligationClearPageError();
        } else if (tab === 'position') {
          return new PositionClearPageError();
        } else if (tab === 'risk') {
          return new RiskClearPageError();
        } else if (tab === 'cca') {
          return new CCAClearPageError();
        }
        return { type: 'none' };
      }),
      filter((action) => action.type !== 'none')
    )
  );

  dashboardClearPageSuccessEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<DashboardClearPageSuccess>(DashboardClearPageSuccess.Type),
      map(({ tab }) => {
        if (tab === 'obligation') {
          return new ObligationClearPageSuccess();
        } else if (tab === 'position') {
          return new PositionClearPageSuccess();
        } else if (tab === 'risk') {
          return new RiskClearPageSuccess();
        } else if (tab === 'cca') {
          return new CCAClearPageSuccess();
        }
        return { type: 'none' };
      }),
      filter((action) => action.type !== 'none')
    )
  );

  constructor(private actions$: Actions, private store: Store) {}
}
