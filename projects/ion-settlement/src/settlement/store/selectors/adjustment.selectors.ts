import { createSelector } from '@ngrx/store';

import {
  ISettlementState,
  IAdjustmentState,
  IAdjustmentForm,
  IAdjustmentSummary,
} from '../../types';

import { selectSettlementState } from './module.selectors';

export const selectAdjustmentState = createSelector(
  selectSettlementState,
  (state: ISettlementState) => state.adjustment
);

export const selectAdjustmentLastUpdated = createSelector(
  selectAdjustmentState,
  (state: IAdjustmentState) => state.lastUpdated
);

export const selectAdjustmentIsFirstLoad = createSelector(
  selectAdjustmentState,
  (state: IAdjustmentState) => state.pageLoaded === state.initialLoaded
);

export const selectAdjustmentSummary = createSelector(
  selectAdjustmentState,
  (state: IAdjustmentState) => state.summary
);

export const selectAdjustmentForm = createSelector(
  selectAdjustmentState,
  (state: IAdjustmentState) => state.form
);

export const selectSummaryAdjustments = createSelector(
  selectAdjustmentSummary,
  (summary: IAdjustmentSummary) => [...(summary?.adjustments || [])]
);

export const selectFilteredAdjustments = createSelector(
  selectAdjustmentSummary,
  (summary: IAdjustmentSummary) => [...(summary?.filteredAdjustments || [])]
);

export const selectAdjustmentTransactionId = createSelector(
  selectAdjustmentForm,
  (state: IAdjustmentForm) => state.transactionId.value
);

export const selectAdjustmentSettlementDate = createSelector(
  selectAdjustmentForm,
  (state: IAdjustmentForm) => state.settlementDate.value
);

export const selectAdjustmentAction = createSelector(
  selectAdjustmentForm,
  (state: IAdjustmentForm) => state.action.value
);

export const selectAdjustmentStatus = createSelector(
  selectAdjustmentForm,
  (state: IAdjustmentForm) => state.status.value
);

export const selectAdjustmentCreationDate = createSelector(
  selectAdjustmentForm,
  (state: IAdjustmentForm) => state.creationDate.value
);
