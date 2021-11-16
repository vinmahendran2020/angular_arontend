import { createSelector } from '@ngrx/store';

import { IAdminState, IEndState } from '../../types';

import { selectAdminState } from './module.selectors';

export const selectEndState = createSelector(
  selectAdminState,
  (state: IAdminState) => state.end
);

export const selectEndLastUpdated = createSelector(
  selectEndState,
  (state: IEndState) => state.lastUpdated
);

export const selectEndSettlementDate = createSelector(
  selectEndState,
  (state: IEndState) => state.settlementDate
);

export const selectEndProgress = createSelector(
  selectEndState,
  (state: IEndState) => state.progress
);

export const selectEndInProgressMessage = createSelector(
  selectEndState,
  (state: IEndState) => state.inProgressMessage
);

export const selectEndEditing = createSelector(
  selectEndState,
  (state: IEndState) => state.editing
);

export const selectEndSubmitMessage = createSelector(
  selectEndState,
  (state: IEndState) => state.commitMessage
);

export const selectEndSchedule = createSelector(
  selectEndState,
  (state: IEndState) => state.schedule
);
