import { createSelector } from '@ngrx/store';

import { IAdminState, INettingState } from '../../types';

import { selectAdminState } from './module.selectors';

export const selectNettingState = createSelector(
  selectAdminState,
  (state: IAdminState) => state.netting
);

export const selectNettingLastUpdated = createSelector(
  selectNettingState,
  (state: INettingState) => state.lastUpdated
);

export const selectNettingProgress = createSelector(
  selectNettingState,
  (state: INettingState) => state.progress
);

export const selectNettingInProgressMessage = createSelector(
  selectNettingState,
  (state: INettingState) => state.inProgressMessage
);

export const selectNettingEditing = createSelector(
  selectNettingState,
  (state: INettingState) => state.editing
);

export const selectNettingSubmitMessage = createSelector(
  selectNettingState,
  (state: INettingState) => state.commitMessage
);

export const selectNettingSchedule = createSelector(
  selectNettingState,
  (state: INettingState) => state.schedule
);
