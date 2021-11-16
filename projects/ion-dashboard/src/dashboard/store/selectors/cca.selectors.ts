import { createSelector } from '@ngrx/store';

import {
  IDashboardState,
  ICCAState,
  ICCAForm,
  ICCASummary,
  ICCATransactionDetail,
  ICCATransaction,
} from '../../types';

import { selectDashboardState } from './module.selectors';

export const selectCCAState = createSelector(
  selectDashboardState,
  (state: IDashboardState) => state.cca
);

export const selectCCALastUpdated = createSelector(
  selectCCAState,
  (state: ICCAState) => state.lastUpdated
);

export const selectCCAIsFirstLoad = createSelector(
  selectCCAState,
  (state: ICCAState) => state.pageLoaded === state.initialLoaded
);

export const selectCCASummary = createSelector(
  selectCCAState,
  (state: ICCAState) => state.summary
);

export const selectClearingCashAdjustments = createSelector(
  selectCCASummary,
  (summary: ICCASummary) => summary.adjustments
);

export const selectCCATransactionDetail = createSelector(
  selectCCAState,
  (state: ICCAState) => state.detail
);

export const selectCCACusip = createSelector(
  selectCCATransactionDetail,
  (detail: ICCATransactionDetail) => detail.cusip
);

export const selectCCAForm = createSelector(
  selectCCAState,
  (state: ICCAState) => state.form
);

export const selectCCAParticipantId = createSelector(
  selectCCAForm,
  (state: ICCAForm) => state.participantId.value
);

export const selectCCAParticipantIdError = createSelector(
  selectCCAForm,
  (state: ICCAForm) => state.participantId.error
);

export const selectCCASettlementDate = createSelector(
  selectCCAForm,
  (state: ICCAForm) => state.settlementDate.value
);

export const selectCCASettlementDateError = createSelector(
  selectCCAForm,
  (state: ICCAForm) => state.settlementDate.error
);

export const selectCCAFormDisabled = createSelector(
  selectCCAParticipantId,
  selectCCAParticipantIdError,
  selectCCASettlementDate,
  selectCCASettlementDateError,
  (
    participantId: string,
    participantIdError: string,
    settlementDate: string[],
    settlementError: string
  ): boolean =>
    !participantId ||
    !!participantIdError ||
    !settlementDate[0] ||
    !settlementDate[1] ||
    !!settlementError
);

export const selectCCASelectedItemId = createSelector(
  selectCCATransactionDetail,
  (state: ICCATransactionDetail) => state.ccaId
);

export const selectCCASelectedItem = createSelector(
  selectCCASummary,
  selectCCATransactionDetail,
  (summary: ICCASummary, detail: ICCATransactionDetail) =>
    [...(summary?.adjustments || [] || [])].find(
      (o) => o.ccaId === detail.ccaId
    )
);

export const selectCCADetailVisible = createSelector(
  selectCCASelectedItemId,
  (itemId: string): boolean => !!itemId
);

export const selectFilteredCCADebits = createSelector(
  selectCCATransactionDetail,
  selectCCACusip,
  (detail: ICCATransactionDetail, cusip: string) =>
    (detail && detail.debits.filter((debit) => debit.cusip.includes(cusip))) ||
    []
);

export const selectFilteredTotalCCADebits = createSelector(
  selectFilteredCCADebits,
  (debits: ICCATransaction[]) =>
    debits.reduce((sum, debit) => sum + debit.ccaAmount, 0)
);

export const selectFilteredCCACredits = createSelector(
  selectCCATransactionDetail,
  selectCCACusip,
  (detail: ICCATransactionDetail, cusip: string) =>
    (detail &&
      detail.credits.filter((credit) => credit.cusip.includes(cusip))) ||
    []
);

export const selectFilteredTotalCCACredits = createSelector(
  selectFilteredCCACredits,
  (credits: ICCATransaction[]) =>
    credits.reduce((sum, credit) => sum + credit.ccaAmount, 0)
);
