import * as fromRouter from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import get from 'lodash.get';
import { IScheduleInterval, IShellState } from '../../types';

export const selectRouterState = createFeatureSelector<
  { router: fromRouter.RouterReducerState<any> },
  fromRouter.RouterReducerState<any>
>('router');

export const {
  selectUrl, // select the current url
} = fromRouter.getSelectors(selectRouterState);

export const selectShellState = createFeatureSelector<IShellState>('shell');

export const selectPageUrl = createSelector(
  selectUrl,
  (url: string | null): string => url || ''
);

export const selectLastUpdated = createSelector(
  (state) => state,
  selectShellState,
  selectPageUrl,
  (state: unknown, shell: IShellState, url: string): Date | null => {
    const segments = url.split('/').filter(Boolean);
    const fullPath = `${segments.join('.')}`;
    const moduleSlicePath = `${segments[0]}.${segments[segments.length - 1]}`;
    return (
      get(state, `${fullPath}.lastUpdated`, null) ||
      get(state, `${fullPath}.initialLoaded`, null) ||
      get(state, `${moduleSlicePath}.lastUpdated`, null) ||
      get(state, `${moduleSlicePath}.initialLoaded`, null) ||
      get(
        state,
        `${fullPath}.${get(state, `${fullPath}.pageTarget`, null)}.lastUpdated`,
        null
      ) ||
      get(
        state,
        `${fullPath}.${get(
          state,
          `${fullPath}.pageTarget`,
          null
        )}.initialLoaded`,
        null
      ) ||
      shell.loadedAt
    );
  }
);

export const selectPageError = createSelector(
  (state) => state,
  selectPageUrl,
  (state: unknown, url: string): string => {
    const segments = url.split('/').filter(Boolean);
    const fullPath = `${segments.join('.')}`;
    const moduleSlicePath = `${segments[0]}.${segments[segments.length - 1]}`;
    return (
      get(state, `${fullPath}.pageError`, null) ||
      get(state, `${moduleSlicePath}.pageError`, null) ||
      get(
        state,
        `${fullPath}.${get(state, `${fullPath}.pageTarget`, null)}.pageError`,
        null
      )
    );
  }
);

export const selectPageSuccess = createSelector(
  (state) => state,
  selectPageUrl,
  (state: unknown, url: string): string => {
    const segments = url.split('/').filter(Boolean);
    const fullPath = `${segments.join('.')}`;
    const moduleSlicePath = `${segments[0]}.${segments[segments.length - 1]}`;
    return (
      get(state, `${fullPath}.pageSuccess`, null) ||
      get(state, `${moduleSlicePath}.pageSuccess`, null) ||
      get(
        state,
        `${fullPath}.${get(state, `${fullPath}.pageTarget`, null)}.pageSuccess`,
        null
      )
    );
  }
);

export const selectParticipant = createSelector(
  selectShellState,
  (state: IShellState) => state.participant
);

export const selectScheduleInterval = createSelector(
  selectShellState,
  (state: IShellState) => state.schedule
);

export const selectCashScheduleInterval = createSelector(
  selectScheduleInterval,
  (state: IScheduleInterval) => state.cash
);

export const selectHasCashScheduleInterval = createSelector(
  selectCashScheduleInterval,
  (state: string | null) => !!state
);

export const selectNettingScheduleInterval = createSelector(
  selectScheduleInterval,
  (state: IScheduleInterval) => state.netting
);

export const selectHasNettingScheduleInterval = createSelector(
  selectNettingScheduleInterval,
  (state: string | null) => !!state
);

export const selectSecurityScheduleInterval = createSelector(
  selectScheduleInterval,
  (state: IScheduleInterval) => state.security
);

export const selectHasSecurityScheduleInterval = createSelector(
  selectSecurityScheduleInterval,
  (state: string | null) => !!state
);
