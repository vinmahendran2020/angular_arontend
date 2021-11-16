import produce from 'immer';

import {
  ObligationParticipantIdChange,
  ObligationSummarySearch,
  ObligationSummaryFound,
  ObligationSummaryError,
  ObligationSummaryServerError,
  ObligationResetForm,
  ObligationTradesOpen,
  ObligationTradesClose,
  ObligationTransactionsOpen,
  ObligationTransactionsClose,
  ObligationTradesFetch,
  ObligationTradesFound,
  ObligationTradesError,
  ObligationTransactionsFetch,
  ObligationTransactionsFound,
  ObligationTransactionsError,
  ObligationCusipChange,
  ObligationSortByChange,
  ObligationCusipSearchOpen,
  ObligationCusipSearchClose,
  ObligationPageLoaded,
  ObligationClearPageError,
  ObligationPageRefreshed,
  ObligationParticipantIdFound,
  ObligationParticipantIdError,
  ObligationClearPageSuccess,
} from '../actions/obligation.actions';

import { IObligationState } from '../../types';

export const initialState: IObligationState = {
  form: {
    participantId: {
      type: 'string',
      editable: true,
      touched: false,
      value: null,
      error: null,
      async: true,
      validatable: true,
      validated: false,
      validating: false,
    },
  },
  summary: null,
  selection: {
    itemId: null,
    pendingId: null,
    transactions: [],
    trades: [],
  },
  dialog: {
    cusip: false,
  },
  lastUpdated: null,
  initialLoaded: null,
  pageLoaded: null,
  pageError: null,
  pageSuccess: null,
};

export function reducer(
  state: IObligationState = initialState,
  action:
    | ObligationPageLoaded
    | ObligationPageRefreshed
    | ObligationClearPageError
    | ObligationClearPageSuccess
    | ObligationParticipantIdChange
    | ObligationParticipantIdFound
    | ObligationParticipantIdError
    | ObligationSummarySearch
    | ObligationSummaryFound
    | ObligationSummaryError
    | ObligationSummaryServerError
    | ObligationResetForm
    | ObligationTradesOpen
    | ObligationTradesClose
    | ObligationTransactionsOpen
    | ObligationTransactionsClose
    | ObligationTradesFetch
    | ObligationTradesFound
    | ObligationTradesError
    | ObligationTransactionsFetch
    | ObligationTransactionsFound
    | ObligationTransactionsError
    | ObligationCusipChange
    | ObligationSortByChange
    | ObligationCusipSearchOpen
    | ObligationCusipSearchClose
): IObligationState {
  return produce(state, (draft) => {
    switch (action.type) {
      case ObligationPageLoaded.Type:
        draft.pageLoaded = new Date();
        draft.initialLoaded = state.initialLoaded || draft.pageLoaded;
        break;
      case ObligationPageRefreshed.Type:
        draft.lastUpdated = new Date();
        break;
      case ObligationClearPageError.Type:
        draft.pageError = null;
        break;
      case ObligationClearPageSuccess.Type:
        draft.pageSuccess = null;
        break;
      case ObligationParticipantIdChange.Type:
        draft.form.participantId.value = action.participantId;
        draft.form.participantId.touched = true;
        draft.form.participantId.error =
          action.participantId !== null &&
          (action.participantId.length !== 8 ||
            isNaN(action.participantId as any))
            ? 'A valid Participant ID is an 8-digit number'
            : null;
        draft.form.participantId.validating = true;
        draft.form.participantId.validated = false;
        break;
      case ObligationParticipantIdFound.Type:
        draft.form.participantId.validating = false;
        draft.form.participantId.validated = true;
        draft.form.participantId.error = null;
        break;
      case ObligationParticipantIdError.Type:
        draft.form.participantId.validating = false;
        draft.form.participantId.validated = false;
        draft.form.participantId.error = action.participantIdError;
        break;
      case ObligationSummarySearch.Type:
        draft.summary = null;
        draft.pageError = null;
        break;
      case ObligationSummaryFound.Type:
        draft.lastUpdated = new Date();
        draft.summary = { ...action.summary };
        draft.pageError = null;
        break;
      case ObligationSummaryError.Type:
        draft.lastUpdated = new Date();
        draft.summary = null;
        draft.form.participantId.validating = false;
        draft.form.participantId.validated = false;
        draft.form.participantId.error = action.error;
        break;
      case ObligationSummaryServerError.Type:
        draft.lastUpdated = new Date();
        draft.summary = null;
        draft.pageError =
          'Sorry, there was an unexpected error. We are currently trying to fix the problem. In the meantime, you can refresh the page or contact the administrator.'; // action.error;
        break;
      case ObligationResetForm.Type:
        draft.summary = null;
        draft.pageError = null;
        draft.form.participantId = {
          type: 'string',
          editable: true,
          touched: false,
          value: null,
          error: null,
          async: true,
          validatable: true,
          validated: false,
          validating: false,
        };
        break;
      case ObligationTradesOpen.Type:
        draft.selection.itemId = action.obligationId;
        break;
      case ObligationTradesClose.Type:
        draft.selection.trades = [];
        draft.selection.itemId = null;
        break;
      case ObligationTradesFetch.Type:
        draft.selection.trades = [];
        break;
      case ObligationTradesFound.Type:
        draft.selection.trades = [...action.trades];
        break;
      case ObligationTradesError.Type:
        draft.selection.trades = [];
        break;
      case ObligationTransactionsOpen.Type:
        draft.selection.pendingId = action.obligationId;
        break;
      case ObligationTransactionsClose.Type:
        draft.selection.transactions = [];
        draft.selection.pendingId = null;
        break;
      case ObligationTransactionsFetch.Type:
        draft.selection.transactions = [];
        break;
      case ObligationTransactionsFound.Type:
        draft.selection.transactions = [...action.transactions];
        break;
      case ObligationTransactionsError.Type:
        draft.selection.transactions = [];
        break;
      case ObligationCusipChange.Type:
        draft.summary.cusip = action.cusip;
        break;
      case ObligationSortByChange.Type:
        draft.summary.sortBy = action.sortBy;
        break;
      case ObligationCusipSearchOpen.Type:
        draft.dialog.cusip = true;
        break;
      case ObligationCusipSearchClose.Type:
        draft.dialog.cusip = false;
        break;
    }
  });
}
