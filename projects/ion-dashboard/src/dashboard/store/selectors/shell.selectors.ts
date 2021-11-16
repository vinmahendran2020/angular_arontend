import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectShellState = createFeatureSelector<{ participant: string }>(
  'shell'
);

export const selectShellParticipant = createSelector(
  selectShellState,
  (state: { participant: string }) => state.participant
);
