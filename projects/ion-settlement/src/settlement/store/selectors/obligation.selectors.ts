import { createSelector } from '@ngrx/store';

import {
  ISettlementState,
  IObligationState,
  IObligationForm,
  IObligationSummary,
} from '../../types';

import { selectSettlementState } from './module.selectors';

export const selectObligationState = createSelector(
  selectSettlementState,
  (state: ISettlementState) => state.obligation
);

export const selectObligationLastUpdated = createSelector(
  selectObligationState,
  (state: IObligationState) => state.lastUpdated
);

export const selectObligationIsFirstLoad = createSelector(
  selectObligationState,
  (state: IObligationState) => state.pageLoaded === state.initialLoaded
);

export const selectObligationSummary = createSelector(
  selectObligationState,
  (state: IObligationState) => state.summary
);

export const selectObligationForm = createSelector(
  selectObligationState,
  (state: IObligationState) => state.form
);

export const selectSummaryObligations = createSelector(
  selectObligationSummary,
  (summary: IObligationSummary) => [...(summary?.obligations || [])]
);

export const selectFilteredObligations = createSelector(
  selectObligationSummary,
  (summary: IObligationSummary) => [...(summary?.filteredObligations || [])]
);

export const selectObligationCusipId = createSelector(
  selectObligationForm,
  (state: IObligationForm) => state.cusipId.value
);

export const selectObligationCusipName = createSelector(
  selectObligationForm,
  (state: IObligationForm) => state.cusipName.value
);

export const selectObligationDirection = createSelector(
  selectObligationForm,
  (state: IObligationForm) => state.direction.value
);

export const selectObligationSettlemetStatus = createSelector(
  selectObligationForm,
  (state: IObligationForm) => state.settlementStatus.value
);
