import { createSelector } from '@ngrx/store';

import {
  IDashboardState,
  IPositionState,
  IPositionForm,
  IPositionDialog,
} from '../../types';

import { selectDashboardState } from './module.selectors';

export const selectPositionState = createSelector(
  selectDashboardState,
  (state: IDashboardState) => state.position
);

export const selectPositionLastUpdated = createSelector(
  selectPositionState,
  (state: IPositionState) => state.lastUpdated
);

export const selectPositionIsFirstLoad = createSelector(
  selectPositionState,
  (state: IPositionState) => state.pageLoaded === state.initialLoaded
);

export const selectPositionSummary = createSelector(
  selectPositionState,
  (state: IPositionState) => state.summary
);

export const selectPositionForm = createSelector(
  selectPositionState,
  (state: IPositionState) => state.form
);

export const selectPositionDialog = createSelector(
  selectPositionState,
  (state: IPositionState) => state.dialog
);

export const selectPositionParticipantId = createSelector(
  selectPositionForm,
  (state: IPositionForm) => state.participantId.value
);

export const selectPositionParticipantIdError = createSelector(
  selectPositionForm,
  (state: IPositionForm) => state.participantId.error
);

export const selectPositionCusip = createSelector(
  selectPositionForm,
  (state: IPositionForm) => state.cusip.value
);

export const selectPositionCusipError = createSelector(
  selectPositionForm,
  (state: IPositionForm) => state.cusip.error
);

export const selectPositionDate = createSelector(
  selectPositionForm,
  (state: IPositionForm) => state.date.value
);

export const selectPositionDateError = createSelector(
  selectPositionForm,
  (state: IPositionForm) => state.date.error
);

export const selectPositionCusipSearch = createSelector(
  selectPositionDialog,
  (dialog: IPositionDialog) => dialog.cusip
);

export const selectPositionFormDisabled = createSelector(
  selectPositionParticipantId,
  selectPositionParticipantIdError,
  selectPositionCusip,
  selectPositionCusipError,
  selectPositionDate,
  selectPositionDateError,
  (
    participantId: string,
    participantIdError: string,
    cusip: string,
    cusipError: string,
    date: string,
    dateError: string
  ): boolean =>
    !participantId ||
    !!participantIdError ||
    !cusip ||
    !!cusipError ||
    !date ||
    !!dateError
);
