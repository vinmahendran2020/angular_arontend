import { createSelector } from '@ngrx/store';

import {
  ISettlementState,
  IMovementState,
  IMovementForm,
  IMovementSummary,
} from '../../types';

import { selectSettlementState } from './module.selectors';

export const selectMovementState = createSelector(
  selectSettlementState,
  (state: ISettlementState) => state.movement
);

export const selectMovementLastUpdated = createSelector(
  selectMovementState,
  (state: IMovementState) => state.lastUpdated
);

export const selectMovementIsFirstLoad = createSelector(
  selectMovementState,
  (state: IMovementState) => state.pageLoaded === state.initialLoaded
);

export const selectMovementSummary = createSelector(
  selectMovementState,
  (state: IMovementState) => state.summary
);

export const selectMovementForm = createSelector(
  selectMovementState,
  (state: IMovementState) => state.form
);

export const selectSummaryMovements = createSelector(
  selectMovementSummary,
  (summary: IMovementSummary) => [...(summary?.movements || [])]
);

export const selectFilteredMovements = createSelector(
  selectMovementSummary,
  (summary: IMovementSummary) => [...(summary?.filteredMovements || [])]
);

export const selectMovementDate = createSelector(
  selectMovementForm,
  (state: IMovementForm) => state.date.value
);

export const selectMovementAction = createSelector(
  selectMovementForm,
  (state: IMovementForm) => state.action.value
);
