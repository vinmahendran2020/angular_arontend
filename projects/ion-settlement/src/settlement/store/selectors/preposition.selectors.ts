import { createSelector } from '@ngrx/store';

import {
  ISettlementState,
  IPrepositionState,
  IPrepositionForm,
  IPrepositionSummary,
} from '../../types';

import { selectSettlementState } from './module.selectors';

export const selectPrepositionState = createSelector(
  selectSettlementState,
  (state: ISettlementState) => state.preposition
);

export const selectPrepositionLastUpdated = createSelector(
  selectPrepositionState,
  (state: IPrepositionState) => state.lastUpdated
);

export const selectPrepositionIsFirstLoad = createSelector(
  selectPrepositionState,
  (state: IPrepositionState) => state.pageLoaded === state.initialLoaded
);

export const selectPrepositionSummary = createSelector(
  selectPrepositionState,
  (state: IPrepositionState) => state.summary
);

export const selectPrepositionForm = createSelector(
  selectPrepositionState,
  (state: IPrepositionState) => state.form
);

export const selectSummaryPrepositions = createSelector(
  selectPrepositionSummary,
  (summary: IPrepositionSummary) => [...(summary?.prepositions || [])]
);

export const selectFilteredPrepositions = createSelector(
  selectPrepositionSummary,
  (summary: IPrepositionSummary) => [...(summary?.filteredPrepositions || [])]
);

export const selectPrepositionCusipId = createSelector(
  selectPrepositionForm,
  (state: IPrepositionForm) => state.cusipId.value
);

export const selectPrepositionCusipName = createSelector(
  selectPrepositionForm,
  (state: IPrepositionForm) => state.cusipName.value
);

export const selectPrepositionAction = createSelector(
  selectPrepositionForm,
  (state: IPrepositionForm) => state.action.value
);
