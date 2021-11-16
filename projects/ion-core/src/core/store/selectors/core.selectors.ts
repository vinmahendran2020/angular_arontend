import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ICoreState } from '../../types';

export const selectCoreState = createFeatureSelector<ICoreState>(
  'core'
);

export const selectAuthenticating = createSelector(
  selectCoreState,
  (state: ICoreState) => state.authenticating
);

export const selectAuthenticated = createSelector(
  selectCoreState,
  (state: ICoreState) => state.authenticated
);

export const selectAuthentionError = createSelector(
  selectCoreState,
  (state: ICoreState) => state.error
);

export const selectUser = createSelector(
  selectCoreState,
  (state: ICoreState) => state.principal?.user
);
