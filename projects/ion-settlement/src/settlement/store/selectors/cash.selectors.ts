import { createSelector } from '@ngrx/store';

import {
  ISettlementState,
  ICashState,
  ICashForm,
  ICashSummary,
} from '../../types';

import { selectSettlementState } from './module.selectors';

export const selectCashState = createSelector(
  selectSettlementState,
  (state: ISettlementState) => state.cash
);

export const selectCashLastUpdated = createSelector(
  selectCashState,
  (state: ICashState) => state.lastUpdated
);

export const selectCashIsFirstLoad = createSelector(
  selectCashState,
  (state: ICashState) => state.pageLoaded === state.initialLoaded
);

export const selectCashSummary = createSelector(
  selectCashState,
  (state: ICashState) => state.summary
);

export const selectCashForm = createSelector(
  selectCashState,
  (state: ICashState) => state.form
);

export const selectSummaryCashs = createSelector(
  selectCashSummary,
  (summary: ICashSummary) => [...(summary?.cashs || [])]
);

export const selectFilteredCashs = createSelector(
  selectCashSummary,
  (summary: ICashSummary) => [...(summary?.filteredCashs || [])]
);

export const selectCashDate = createSelector(
  selectCashForm,
  (state: ICashForm) => state.date.value
);

export const selectCashAction = createSelector(
  selectCashForm,
  (state: ICashForm) => state.action.value
);
