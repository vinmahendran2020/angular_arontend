import { createSelector } from '@ngrx/store';

import { selectTransactionState } from './module.selectors';
import { ITransactionState, IField } from '../../types';
import {
  IPrepositionState,
  IPrepositionForm,
  IPrepositionSummary,
  IPreposition,
} from '../../types';

export const selectPrepositionState = createSelector(
  selectTransactionState,
  (state: ITransactionState) => state.preposition
);

export const selectPrepositionIsFirstLoad = createSelector(
  selectPrepositionState,
  (state: IPrepositionState) => state.pageLoaded === state.initialLoaded
);

export const selectPrepositionLastUpdated = createSelector(
  selectPrepositionState,
  (state: IPrepositionState) => state.lastUpdated
);

export const selectPrepositionSummary = createSelector(
  selectPrepositionState,
  (state: IPrepositionState) => state.summary
);

export const selectPrepositionForm = createSelector(
  selectPrepositionState,
  (state: IPrepositionState) => state.form
);

export const selectPrepositionParticipantId = createSelector(
  selectPrepositionForm,
  (state: IPrepositionForm) => state.participantId.value
);

export const selectPrepositionParticipantIdValidating = createSelector(
  selectPrepositionForm,
  (state: IPrepositionForm) => state.participantId.validating
);

export const selectPrepositionParticipantIdError = createSelector(
  selectPrepositionForm,
  (state: IPrepositionForm) => state.participantId.error
);

export const selectPrepositionFormDisabled = createSelector(
  selectPrepositionParticipantId,
  selectPrepositionParticipantIdValidating,
  selectPrepositionParticipantIdError,
  (
    participantId: string,
    participantIdValidating: boolean,
    participantIdError: string
  ): boolean =>
    !participantId || participantIdValidating || !!participantIdError
);

export const selectSummaryPrepositions = createSelector(
  selectPrepositionSummary,
  (summary: IPrepositionSummary) => [...(summary?.prepositions || [])]
);

export const selectPrepositionIds = createSelector(
  selectSummaryPrepositions,
  (prepositions: IPreposition[]) =>
    prepositions.map((preposition) => preposition.id.value)
);

export const selectPrepositionCusipSearchForId = createSelector(
  selectPrepositionSummary,
  (summary: IPrepositionSummary, id: number) =>
    summary && !!summary.dialog[id]?.cusip
);

export const selectPrepositionActionForId = createSelector(
  selectSummaryPrepositions,
  (prepositions: IPreposition[], id: number) =>
    prepositions.find((preposition) => preposition.id.value === id)?.action
      .value
);

export const selectPrepositionCusipForId = createSelector(
  selectSummaryPrepositions,
  (prepositions: IPreposition[], id: number) =>
    prepositions.find((preposition) => preposition.id.value === id)?.cusip.value
);

export const selectPrepositionCusipErrorForId = createSelector(
  selectSummaryPrepositions,
  (prepositions: IPreposition[], id: number) =>
    prepositions.find((preposition) => preposition.id.value === id)?.cusip.error
);

export const selectPrepositionQuantityForId = createSelector(
  selectSummaryPrepositions,
  (prepositions: IPreposition[], id: number) =>
    prepositions.find((preposition) => preposition.id.value === id)?.quantity
      .value
);

export const selectPrepositionQuantityErrorForId = createSelector(
  selectSummaryPrepositions,
  (prepositions: IPreposition[], id: number) =>
    prepositions.find((preposition) => preposition.id.value === id)?.quantity
      .error
);

export const selectPrepositionCusipNameForId = createSelector(
  selectSummaryPrepositions,
  (prepositions: IPreposition[], id: number) =>
    prepositions.find((preposition) => preposition.id.value === id)?.cusipName
);

export const selectPrepositionDeletableForId = createSelector(
  selectSummaryPrepositions,
  (prepositions: IPreposition[], id: number) =>
    !isPrepositionValidating(
      prepositions.find((preposition) => preposition.id.value === id)
    )
);

export const selectPrepositionsTouched = createSelector(
  selectSummaryPrepositions,
  (prepositions: IPreposition[]) =>
    prepositions.filter((preposition) => isPrepositionTouched(preposition))
);

export const selectPrepositionSubmitDisabled = createSelector(
  selectPrepositionFormDisabled,
  selectPrepositionsTouched,
  (formDisabled: boolean, prepositions: IPreposition[]): boolean =>
    formDisabled ||
    prepositions.length === 0 ||
    prepositions.some((preposition) => !isPrepositionValid(preposition))
);

export const selectSubmitPrepositions = createSelector(
  selectSummaryPrepositions,
  (prepositions: IPreposition[]) =>
    prepositions.filter((preposition) => isPrepositionValid(preposition))
);

function isPrepositionValid(preposition: IPreposition | null): boolean {
  return (
    preposition &&
    Object.values<IField<unknown>>(preposition as any)
      .filter((v) => v && v.validatable)
      .every((v) => {
        return isFieldValid(v);
      })
  );
}

function isFieldValid(field: IField<unknown>): boolean {
  return (
    !field.error &&
    (field.async ? !field.validating && field.validated : field.validated)
  );
}

function isFieldTouched(field: IField<unknown>): boolean {
  return (
    field.touched &&
    (field.type === 'string' ? field.value !== null : field.value !== false)
  );
}

function isPrepositionTouched(preposition: IPreposition | null): boolean {
  return (
    preposition &&
    Object.values<IField<unknown>>(preposition as any)
      .filter((v) => v && v.editable)
      .some((v) => isFieldTouched(v))
  );
}

function isPrepositionValidating(preposition: IPreposition | null): boolean {
  return (
    preposition &&
    Object.values<IField<unknown>>(preposition as any)
      .filter((v) => v && v.validatable)
      .some((v) => v.validating)
  );
}
