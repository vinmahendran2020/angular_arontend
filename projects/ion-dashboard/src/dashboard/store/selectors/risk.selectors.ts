import { createSelector } from '@ngrx/store';

import { IDashboardState, IRiskState, IRiskForm } from '../../types';

import { selectDashboardState } from './module.selectors';

export const selectRiskState = createSelector(
  selectDashboardState,
  (state: IDashboardState) => state.risk
);

export const selectRiskLastUpdated = createSelector(
  selectRiskState,
  (state: IRiskState) => state.lastUpdated
);

export const selectRiskIsFirstLoad = createSelector(
  selectRiskState,
  (state: IRiskState) => state.pageLoaded === state.initialLoaded
);

export const selectRiskSummary = createSelector(
  selectRiskState,
  (state: IRiskState) => state.summary
);

export const selectRiskForm = createSelector(
  selectRiskState,
  (state: IRiskState) => state.form
);

export const selectRiskParticipantId = createSelector(
  selectRiskForm,
  (state: IRiskForm) => state.participantId.value
);

export const selectRiskParticipantIdError = createSelector(
  selectRiskForm,
  (state: IRiskForm) => state.participantId.error
);

export const selectRiskCollateralId = createSelector(
  selectRiskForm,
  (state: IRiskForm) => state.collateralId.value
);

export const selectRiskCollateralIdError = createSelector(
  selectRiskForm,
  (state: IRiskForm) => state.collateralId.error
);

export const selectRiskFormDisabled = createSelector(
  selectRiskParticipantId,
  selectRiskParticipantIdError,
  selectRiskCollateralId,
  selectRiskCollateralIdError,
  (
    participantId: string,
    participantIdError: string,
    collateralId: string,
    collateralIdError: string
  ): boolean =>
    !participantId ||
    !!participantIdError ||
    !collateralId ||
    !!collateralIdError
);
