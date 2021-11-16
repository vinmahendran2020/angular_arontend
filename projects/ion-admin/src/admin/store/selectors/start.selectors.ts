import { createSelector } from '@ngrx/store';

import { IAdminState, IStartState } from '../../types';

import { selectAdminState } from './module.selectors';

export const selectStartState = createSelector(
  selectAdminState,
  (state: IAdminState) => state.start
);

export const selectStartLastUpdated = createSelector(
  selectStartState,
  (state: IStartState) => state.lastUpdated
);

export const selectStartSettlementDate = createSelector(
  selectStartState,
  (state: IStartState) => state.settlementDate
);

export const selectStartProgress = createSelector(
  selectStartState,
  (state: IStartState) => state.progress
);

export const selectStartInProgressMessage = createSelector(
  selectStartState,
  (state: IStartState) => state.inProgressMessage
);

export const selectStartEditing = createSelector(
  selectStartState,
  (state: IStartState) => state.editing
);

export const selectStartSubmitMessage = createSelector(
  selectStartState,
  (state: IStartState) => state.commitMessage
);

export const selectStartSchedule = createSelector(
  selectStartState,
  (state: IStartState) => state.schedule
);
