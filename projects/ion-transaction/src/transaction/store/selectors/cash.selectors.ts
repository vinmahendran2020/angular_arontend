import { createSelector } from '@ngrx/store';

import {
  ITransactionState,
  ICashState,
  ICashSummary,
  ICashForm,
  ICashActivity,
} from '../../types';

import { selectTransactionState } from './module.selectors';

export const selectCashState = createSelector(
  selectTransactionState,
  (state: ITransactionState) => state.cash
);

export const selectCashLastUpdated = createSelector(
  selectCashState,
  (state: ICashState) => state.lastUpdated
);

export const selectCashIsFirstLoad = createSelector(
  selectCashState,
  (state: ICashState) => state.pageLoaded === state.initialLoaded
);

export const selectCashSummary = createSelector(
  selectCashState,
  (state: ICashState) => state.summary
);

export const selectCashHasSummary = createSelector(
  selectCashSummary,
  (state: ICashSummary) => state !== null
);

export const selectCashBalance = createSelector(
  selectCashSummary,
  (state: ICashSummary) => state.balance
);

export const selectCashCurrency = createSelector(
  selectCashSummary,
  (state: ICashSummary) => state.currency
);

export const selectCashForm = createSelector(
  selectCashState,
  (state: ICashState) => state.form
);

export const selectCashParticipantId = createSelector(
  selectCashForm,
  (state: ICashForm) => state.participantId.value
);

export const selectCashParticipantIdError = createSelector(
  selectCashForm,
  (state: ICashForm) => state.participantId.error
);

export const selectCashFormDisabled = createSelector(
  selectCashParticipantId,
  selectCashParticipantIdError,
  (participantId: string, participantIdError: string): boolean =>
    !participantId || !!participantIdError
);

export const selectCashActivity = createSelector(
  selectCashState,
  (state: ICashState) => state.activity
);

export const selectCashActivityOperation = createSelector(
  selectCashActivity,
  (state: ICashActivity) => state.operation.value
);

export const selectCashActivityOperationError = createSelector(
  selectCashActivity,
  (state: ICashActivity) => state.operation.error
);

export const selectCashActivityAmount = createSelector(
  selectCashActivity,
  (state: ICashActivity) => state.amount.value
);

export const selectCashActivityAmountError = createSelector(
  selectCashActivity,
  (state: ICashActivity) => state.amount.error
);

export const selectCashActivityDisabled = createSelector(
  selectCashActivityOperation,
  selectCashActivityOperationError,
  selectCashActivityAmount,
  selectCashActivityAmountError,
  (
    operation: string,
    operationError: string,
    amount: string,
    amountError: string
  ): boolean => !operation || !!operationError || !amount || !!amountError
);
