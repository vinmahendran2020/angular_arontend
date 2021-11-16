import { createSelector } from '@ngrx/store';

import {
  ITransactionState,
  IMemoState,
  IMemoForm,
  IMemoSummary,
  IMemo,
  IField,
} from '../../types';

import { selectTransactionState } from './module.selectors';

export const selectMemoState = createSelector(
  selectTransactionState,
  (state: ITransactionState) => state.memo
);

export const selectMemoLastUpdated = createSelector(
  selectMemoState,
  (state: IMemoState) => state.lastUpdated
);

export const selectMemoIsFirstLoad = createSelector(
  selectMemoState,
  (state: IMemoState) => state.pageLoaded === state.initialLoaded
);

export const selectMemoSummary = createSelector(
  selectMemoState,
  (state: IMemoState) => state.summary
);

export const selectMemoForm = createSelector(
  selectMemoState,
  (state: IMemoState) => state.form
);

export const selectMemoParticipantId = createSelector(
  selectMemoForm,
  (state: IMemoForm) => state.participantId.value
);

export const selectMemoParticipantIdValidating = createSelector(
  selectMemoForm,
  (state: IMemoForm) => state.participantId.validating
);

export const selectMemoParticipantIdError = createSelector(
  selectMemoForm,
  (state: IMemoForm) => state.participantId.error
);

export const selectMemoFormDisabled = createSelector(
  selectMemoParticipantId,
  selectMemoParticipantIdValidating,
  selectMemoParticipantIdError,
  (
    participantId: string,
    participantIdValidating: boolean,
    participantIdError: string
  ): boolean =>
    !participantId || participantIdValidating || !!participantIdError
);

export const selectSummaryMemos = createSelector(
  selectMemoSummary,
  (summary: IMemoSummary) => [...(summary?.memos || [])]
);

export const selectMemoIds = createSelector(
  selectSummaryMemos,
  (memos: IMemo[]) => memos.map((memo) => memo.id.value)
);

export const selectMemoCusipSearchForId = createSelector(
  selectMemoSummary,
  (summary: IMemoSummary, id: number) => summary && !!summary.dialog[id]?.cusip
);

export const selectMemoActionForId = createSelector(
  selectSummaryMemos,
  (memos: IMemo[], id: number) =>
    memos.find((memo) => memo.id.value === id)?.action.value
);

export const selectMemoActionErrorForId = createSelector(
  selectSummaryMemos,
  (memos: IMemo[], id: number) =>
    memos.find((memo) => memo.id.value === id)?.action.error
);

export const selectMemoCusipForId = createSelector(
  selectSummaryMemos,
  (memos: IMemo[], id: number) =>
    memos.find((memo) => memo.id.value === id)?.cusip.value
);

export const selectMemoCusipErrorForId = createSelector(
  selectSummaryMemos,
  (memos: IMemo[], id: number) =>
    memos.find((memo) => memo.id.value === id)?.cusip.error
);

export const selectMemoQuantityForId = createSelector(
  selectSummaryMemos,
  (memos: IMemo[], id: number) =>
    memos.find((memo) => memo.id.value === id)?.quantity.value
);

export const selectMemoQuantityErrorForId = createSelector(
  selectSummaryMemos,
  (memos: IMemo[], id: number) =>
    memos.find((memo) => memo.id.value === id)?.quantity.error
);

export const selectMemoCusipNameForId = createSelector(
  selectSummaryMemos,
  (memos: IMemo[], id: number) =>
    memos.find((memo) => memo.id.value === id)?.cusipName
);

export const selectMemoTotalFreePstnForId = createSelector(
  selectSummaryMemos,
  (memos: IMemo[], id: number) =>
    memos.find((memo) => memo.id.value === id)?.totalPositions
);

export const selectMemoSegPstnForId = createSelector(
  selectSummaryMemos,
  (memos: IMemo[], id: number) =>
    memos.find((memo) => memo.id.value === id)?.memoSegregation
);

export const selectMemoFreeExcessPstnForId = createSelector(
  selectSummaryMemos,
  (memos: IMemo[], id: number) =>
    memos.find((memo) => memo.id.value === id)?.totalFreeExcess
);

export const selectMemoDeletableForId = createSelector(
  selectSummaryMemos,
  (memos: IMemo[], id: number) =>
    !isMemoValidating(memos.find((memo) => memo.id.value === id))
);

export const selectMemosTouched = createSelector(
  selectSummaryMemos,
  (memos: IMemo[]) => memos.filter((memo) => isMemoTouched(memo))
);

export const selectMemoSubmitDisabled = createSelector(
  selectMemoFormDisabled,
  selectMemosTouched,
  (formDisabled: boolean, memos: IMemo[]): boolean =>
    formDisabled ||
    memos.length === 0 ||
    memos.some((memo) => !isMemoValid(memo))
);

export const selectSubmitMemos = createSelector(
  selectSummaryMemos,
  (memos: IMemo[]) => memos.filter((memo) => isMemoValid(memo))
);

function isMemoValid(memo: IMemo | null): boolean {
  return (
    memo &&
    Object.values<IField<unknown>>(memo as any)
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

function isMemoTouched(memo: IMemo | null): boolean {
  return (
    memo &&
    Object.values<IField<unknown>>(memo as any)
      .filter((v) => v && v.editable)
      .some((v) => isFieldTouched(v))
  );
}

function isMemoValidating(memo: IMemo | null): boolean {
  return (
    memo &&
    Object.values<IField<unknown>>(memo as any)
      .filter((v) => v && v.validatable)
      .some((v) => v.validating)
  );
}
