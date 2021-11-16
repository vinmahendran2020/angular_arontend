import produce from 'immer';

import {
  CashParticipantIdChange,
  CashSummarySearch,
  CashSummaryFound,
  CashSummaryError,
  CashSummaryServerError,
  CashActivityResetForm,
  CashPageLoaded,
  CashClearPageError,
  CashPageRefreshed,
  CashParticipantIdFound,
  CashParticipantIdError,
  CashClearPageSuccess,
  CashActivityOperationChange,
  CashActivityAmountChange,
  CashActivitySubmit,
  CashActivitySubmitResult,
  CashActivitySubmitError,
} from '../actions/cash.actions';

import { ICashState } from '../../types';

export const initialState: ICashState = {
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
  activity: {
    operation: {
      type: 'string',
      editable: true,
      touched: false,
      value: null,
      error: null,
      async: false,
      validatable: true,
      validated: false,
      validating: false,
    },
    amount: {
      type: 'string',
      editable: true,
      touched: false,
      value: null,
      error: null,
      async: false,
      validatable: true,
      validated: false,
      validating: false,
    },
  },
  summary: null,
  lastUpdated: null,
  initialLoaded: null,
  pageLoaded: null,
  pageError: null,
  pageSuccess: null,
};

export function reducer(
  state: ICashState = initialState,
  action:
    | CashPageLoaded
    | CashPageRefreshed
    | CashClearPageError
    | CashClearPageSuccess
    | CashParticipantIdChange
    | CashParticipantIdFound
    | CashParticipantIdError
    | CashSummarySearch
    | CashSummaryFound
    | CashSummaryError
    | CashSummaryServerError
    | CashActivityOperationChange
    | CashActivityAmountChange
    | CashActivityResetForm
    | CashActivitySubmit
    | CashActivitySubmitResult
    | CashActivitySubmitError
): ICashState {
  return produce(state, (draft) => {
    switch (action.type) {
      case CashPageLoaded.Type:
        draft.pageLoaded = new Date();
        draft.initialLoaded = state.initialLoaded || draft.pageLoaded;
        break;
      case CashPageRefreshed.Type:
        draft.lastUpdated = new Date();
        break;
      case CashClearPageError.Type:
        draft.pageError = null;
        break;
      case CashClearPageSuccess.Type:
        draft.pageSuccess = null;
        break;
      case CashParticipantIdChange.Type:
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
      case CashParticipantIdFound.Type:
        draft.form.participantId.validating = false;
        draft.form.participantId.validated = true;
        draft.form.participantId.error = null;
        break;
      case CashParticipantIdError.Type:
        draft.form.participantId.validating = false;
        draft.form.participantId.validated = false;
        draft.form.participantId.error = action.participantIdError;
        break;
      case CashSummarySearch.Type:
        draft.summary = null;
        draft.pageError = null;
        draft.pageSuccess = null;
        draft.activity = {
          operation: {
            type: 'string',
            editable: true,
            touched: false,
            value: null,
            error: null,
            async: false,
            validatable: true,
            validated: false,
            validating: false,
          },
          amount: {
            type: 'string',
            editable: true,
            touched: false,
            value: null,
            error: null,
            async: false,
            validatable: true,
            validated: false,
            validating: false,
          },
        };
        break;
      case CashSummaryFound.Type:
        draft.lastUpdated = new Date();
        draft.summary = { ...action.summary };
        draft.pageError = null;
        draft.form.participantId.error = null;
        break;
      case CashSummaryError.Type:
        draft.lastUpdated = new Date();
        draft.summary = null;
        draft.form.participantId.error = action.error;
        break;
      case CashSummaryServerError.Type:
        draft.lastUpdated = new Date();
        draft.summary = null;
        draft.pageError =
          'Sorry, there was an unexpected error. We are currently trying to fix the problem. In the meantime, you can refresh the page or contact the administrator.'; // action.error;
        break;
      case CashActivityOperationChange.Type: {
        draft.activity.operation.value = action.operation;
        draft.activity.operation.touched = true;
        draft.activity.operation.error = !['DEPOSIT', 'WITHDRAW'].includes(
          action.operation
        )
          ? 'A valid action is Deposit or Withdraw'
          : null;
        draft.activity.operation.validated = true;
        break;
      }
      case CashActivityAmountChange.Type: {
        draft.activity.amount.value = action.amount;
        draft.activity.amount.touched = true;
        const value = Number(action.amount);
        draft.activity.amount.error =
          isNaN(value) || value <= 0 ? 'A valid amount is a number' : null;
        draft.activity.amount.validated = true;
        break;
      }
      case CashActivitySubmit.Type:
        draft.pageError = null;
        draft.pageSuccess = null;
        break;
      case CashActivitySubmitResult.Type:
        draft.pageSuccess = action.message;
        break;
      case CashActivitySubmitError.Type:
        draft.pageError = action.error;
        break;
      case CashActivityResetForm.Type:
        draft.pageError = null;
        draft.pageSuccess = null;
        draft.activity = {
          operation: {
            type: 'string',
            editable: true,
            touched: false,
            value: null,
            error: null,
            async: false,
            validatable: true,
            validated: false,
            validating: false,
          },
          amount: {
            type: 'string',
            editable: true,
            touched: false,
            value: null,
            error: null,
            async: false,
            validatable: true,
            validated: false,
            validating: false,
          },
        };
        break;
    }
  });
}
