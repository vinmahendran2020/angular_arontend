import { createSelector } from '@ngrx/store';

import { IAdminState, ICashState } from '../../types';

import { selectAdminState } from './module.selectors';

export const selectCashState = createSelector(
  selectAdminState,
  (state: IAdminState) => state.cash
);

export const selectCashLastUpdated = createSelector(
  selectCashState,
  (state: ICashState) => state.lastUpdated
);

export const selectCashSettlementDate = createSelector(
  selectCashState,
  (state: ICashState) => state.settlementDate
);

export const selectCashProgress = createSelector(
  selectCashState,
  (state: ICashState) => state.progress
);

export const selectCashInProgressMessage = createSelector(
  selectCashState,
  (state: ICashState) => state.inProgressMessage
);

export const selectCashEditing = createSelector(
  selectCashState,
  (state: ICashState) => state.editing
);

export const selectCashSubmitMessage = createSelector(
  selectCashState,
  (state: ICashState) => state.commitMessage
);

export const selectCashSchedule = createSelector(
  selectCashState,
  (state: ICashState) => state.schedule
);
