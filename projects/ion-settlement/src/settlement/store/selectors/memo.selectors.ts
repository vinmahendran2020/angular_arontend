import { createSelector } from '@ngrx/store';

import {
  ISettlementState,
  IMemoState,
  IMemoForm,
  IMemoSummary,
} from '../../types';

import { selectSettlementState } from './module.selectors';

export const selectMemoState = createSelector(
  selectSettlementState,
  (state: ISettlementState) => state.memo
);

export const selectMemoLastUpdated = createSelector(
  selectMemoState,
  (state: IMemoState) => state.lastUpdated
);

export const selectMemoIsFirstLoad = createSelector(
  selectMemoState,
  (state: IMemoState) => state.pageLoaded === state.initialLoaded
);

export const selectMemoSummary = createSelector(
  selectMemoState,
  (state: IMemoState) => state.summary
);

export const selectMemoForm = createSelector(
  selectMemoState,
  (state: IMemoState) => state.form
);

export const selectSummaryMemos = createSelector(
  selectMemoSummary,
  (summary: IMemoSummary) => [...(summary?.memos || [])]
);

export const selectFilteredMemos = createSelector(
  selectMemoSummary,
  (summary: IMemoSummary) => [...(summary?.filteredMemos || [])]
);

export const selectMemoCusipId = createSelector(
  selectMemoForm,
  (state: IMemoForm) => state.cusipId.value
);

export const selectMemoCusipName = createSelector(
  selectMemoForm,
  (state: IMemoForm) => state.cusipName.value
);

export const selectMemoAction = createSelector(
  selectMemoForm,
  (state: IMemoForm) => state.action.value
);
