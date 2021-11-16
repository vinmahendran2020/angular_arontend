import { createSelector } from '@ngrx/store';

import { ISettlementState, ISettlementForm, ICurrentTab } from '../../types';

import { selectSettlementState } from './module.selectors';

export const selectFormState = createSelector(
  selectSettlementState,
  (state: ISettlementState) => state.form
);

export const selectFormIsFirstLoad = createSelector(
  selectFormState,
  (state: ISettlementForm) => state.pageLoaded === state.initialLoaded
);

export const selectFormParticipantId = createSelector(
  selectFormState,
  (state: ISettlementForm) => state.participantId.value
);

export const selectFormParticipantIdError = createSelector(
  selectFormState,
  (state: ISettlementForm) => state.participantId.error
);

export const selectFormTransactionType = createSelector(
  selectFormState,
  (state: ISettlementForm) => state.transactionType.value
);

export const selectFormTransactionTypeError = createSelector(
  selectFormState,
  (state: ISettlementForm) => state.transactionType.error
);

export const selectFormBusinessDate = createSelector(
  selectFormState,
  (state: ISettlementForm) => state.businessDate.value
);

export const selectFormBusinessDateError = createSelector(
  selectFormState,
  (state: ISettlementForm) => state.businessDate.error
);

export const selectFormDisabled = createSelector(
  selectFormParticipantId,
  selectFormParticipantIdError,
  selectFormTransactionType,
  selectFormTransactionTypeError,
  selectFormBusinessDate,
  selectFormBusinessDateError,
  (
    participantId: string,
    participantIdError: string,
    transactionType: string,
    transactionTypeError: string,
    businessBusinessDate: string,
    businessBusinessDateError: string
  ): boolean =>
    !participantId ||
    !!participantIdError ||
    !transactionType ||
    !!transactionTypeError ||
    !businessBusinessDate ||
    !!businessBusinessDateError
);

export const selectCurrentTab = createSelector(
  selectFormTransactionType,
  (trasactionType: string): ICurrentTab => {
    const path = trasactionType || '';
    if (path.includes('order')) {
      return 'order' as const;
    } else if (path.includes('memo')) {
      return 'memo' as const;
    } else if (path.includes('preposition')) {
      return 'preposition' as const;
    } else if (path.includes('obligation')) {
      return 'obligation' as const;
    } else if (path.includes('adjustment')) {
      return 'adjustment' as const;
    } else if (path.includes('movement')) {
      return 'movement' as const;
    } else if (path.includes('cash')) {
      return 'cash' as const;
    } else if (path.includes('adjustment')) {
      return 'adjustment' as const;
    }
    return 'none' as const;
  }
);
