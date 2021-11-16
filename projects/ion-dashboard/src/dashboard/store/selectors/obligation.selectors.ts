import { createSelector } from '@ngrx/store';

import {
  IDashboardState,
  IObligationState,
  IObligationForm,
  IObligationSelection,
  IObligationSummary,
  IObligationDialog,
  INetObligation,
  ObligationSortBy,
} from '../../types';

import { selectDashboardState } from './module.selectors';

export const selectObligationState = createSelector(
  selectDashboardState,
  (state: IDashboardState) => state.obligation
);

export const selectObligationLastUpdated = createSelector(
  selectObligationState,
  (state: IObligationState) => state.lastUpdated
);

export const selectObligationIsFirstLoad = createSelector(
  selectObligationState,
  (state: IObligationState) => state.pageLoaded === state.initialLoaded
);

export const selectObligationSummary = createSelector(
  selectObligationState,
  (state: IObligationState) => state.summary
);

export const selectObligationSelection = createSelector(
  selectObligationState,
  (state: IObligationState) => state.selection
);

export const selectObligationForm = createSelector(
  selectObligationState,
  (state: IObligationState) => state.form
);

export const selectObligationParticipantId = createSelector(
  selectObligationForm,
  (state: IObligationForm) => state.participantId.value
);

export const selectObligationParticipantIdError = createSelector(
  selectObligationForm,
  (state: IObligationForm) => state.participantId.error
);

export const selectObligationFormDisabled = createSelector(
  selectObligationParticipantId,
  selectObligationParticipantIdError,
  (participantId: string, participantIdError: string): boolean =>
    !participantId || !!participantIdError
);

export const selectObligationSelectedItemId = createSelector(
  selectObligationSelection,
  (state: IObligationSelection) => state.itemId
);

export const selectObligationTrades = createSelector(
  selectObligationSelection,
  (state: IObligationSelection) => state.trades
);

export const selectObligationSelectedItem = createSelector(
  selectObligationSummary,
  selectObligationSelection,
  (summary: IObligationSummary, selection: IObligationSelection) =>
    [
      ...(summary?.longs || []),
      ...(summary?.shorts || []),
      ...(summary?.closed || []),
    ].find((o) => o.netObligationId === selection.itemId)
);

export const selectObligationTradesVisible = createSelector(
  selectObligationSelectedItemId,
  (itemId: string): boolean => !!itemId
);

export const selectObligationSelectedPendingId = createSelector(
  selectObligationSelection,
  (state: IObligationSelection) => state.pendingId
);

export const selectObligationTransactions = createSelector(
  selectObligationSelection,
  (state: IObligationSelection) => state.transactions
);

export const selectObligationSelectedPending = createSelector(
  selectObligationSummary,
  selectObligationSelection,
  (summary: IObligationSummary, selection: IObligationSelection) =>
    [...(summary?.longs || []), ...(summary?.shorts || [])].find(
      (o) => o.netObligationId === selection.pendingId
    )
);

export const selectObligationTransactionsVisible = createSelector(
  selectObligationSelectedPendingId,
  (pendingId: string): boolean => !!pendingId
);

export const selectObligationDialog = createSelector(
  selectObligationState,
  (state: IObligationState) => state.dialog
);

export const selectObligationCusip = createSelector(
  selectObligationSummary,
  (state: IObligationSummary) => state?.cusip
);

export const selectObligationSortBy = createSelector(
  selectObligationSummary,
  (state: IObligationSummary) => state?.sortBy
);

export const selectObligationCusipSearch = createSelector(
  selectObligationDialog,
  (state: IObligationDialog) => state.cusip
);

export const selectFilteredObligationLong = createSelector(
  selectObligationSummary,
  selectObligationCusip,
  selectObligationSortBy,
  (summary: IObligationSummary, cusip: string, sortBy: ObligationSortBy) =>
    (summary &&
      sortDescending(
        summary.longs.filter((long) => long.cusip.includes(cusip)),
        sortBy
      )) ||
    []
);

export const selectFilteredObligationShort = createSelector(
  selectObligationSummary,
  selectObligationCusip,
  selectObligationSortBy,
  (summary: IObligationSummary, cusip: string, sortBy: ObligationSortBy) =>
    (summary &&
      sortDescending(
        summary.shorts.filter((short) => short.cusip.includes(cusip)),
        sortBy
      )) ||
    []
);

export const selectFilteredObligationClosed = createSelector(
  selectObligationSummary,
  selectObligationCusip,
  selectObligationSortBy,
  (summary: IObligationSummary, cusip: string, sortBy: ObligationSortBy) =>
    (summary &&
      sortDescending(
        summary.closed.filter((closed) => closed.cusip.includes(cusip)),
        sortBy
      )) ||
    []
);

export function sortDescending(
  obligations: INetObligation[],
  sortBy: ObligationSortBy
): INetObligation[] {
  return sortBy
    ? obligations.sort((left, right) => {
        return right[sortBy] - left[sortBy];
      })
    : obligations;
}
