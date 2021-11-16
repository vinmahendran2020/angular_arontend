import { createSelector } from '@ngrx/store';

import { IAdminState, ISecurityState } from '../../types';

import { selectAdminState } from './module.selectors';

export const selectSecurityState = createSelector(
  selectAdminState,
  (state: IAdminState) => state.security
);

export const selectSecurityLastUpdated = createSelector(
  selectSecurityState,
  (state: ISecurityState) => state.lastUpdated
);

export const selectSecuritySettlementDate = createSelector(
  selectSecurityState,
  (state: ISecurityState) => state.settlementDate
);

export const selectSecurityProgress = createSelector(
  selectSecurityState,
  (state: ISecurityState) => state.progress
);

export const selectSecurityInProgressMessage = createSelector(
  selectSecurityState,
  (state: ISecurityState) => state.inProgressMessage
);

export const selectSecurityEditing = createSelector(
  selectSecurityState,
  (state: ISecurityState) => state.editing
);

export const selectSecuritySubmitMessage = createSelector(
  selectSecurityState,
  (state: ISecurityState) => state.commitMessage
);

export const selectSecuritySchedule = createSelector(
  selectSecurityState,
  (state: ISecurityState) => state.schedule
);
