import produce from 'immer';

import {
  RiskParticipantIdChange,
  RiskCollateralIdChange,
  RiskParticipantIdFound,
  RiskParticipantIdError,
  RiskSummarySearch,
  RiskSummaryFound,
  RiskSummaryError,
  RiskSummaryServerError,
  RiskResetForm,
  RiskPageLoaded,
  RiskClearPageError,
  RiskPageRefreshed,
  RiskClearPageSuccess,
} from '../actions/risk.actions';

import { IRiskState } from '../../types';

export const initialState: IRiskState = {
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
    collateralId: {
      type: 'string',
      editable: false,
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
  state: IRiskState = initialState,
  action:
    | RiskPageLoaded
    | RiskPageRefreshed
    | RiskClearPageError
    | RiskClearPageSuccess
    | RiskParticipantIdChange
    | RiskParticipantIdFound
    | RiskParticipantIdError
    | RiskCollateralIdChange
    | RiskSummarySearch
    | RiskSummaryFound
    | RiskSummaryError
    | RiskSummaryServerError
    | RiskResetForm
): IRiskState {
  return produce(state, (draft) => {
    switch (action.type) {
      case RiskPageLoaded.Type:
        draft.pageLoaded = new Date();
        draft.initialLoaded = state.initialLoaded || draft.pageLoaded;
        break;
      case RiskPageRefreshed.Type:
        draft.lastUpdated = new Date();
        break;
      case RiskClearPageError.Type:
        draft.pageError = null;
        draft.form.participantId.error = null;
        break;
      case RiskClearPageSuccess.Type:
        draft.pageSuccess = null;
        break;
      case RiskParticipantIdChange.Type:
        draft.form.collateralId = {
          type: 'string',
          editable: false,
          touched: false,
          value: null,
          error: null,
          async: false,
          validatable: true,
          validated: false,
          validating: false,
        };
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
      case RiskParticipantIdFound.Type:
        draft.form.participantId.validating = false;
        draft.form.participantId.validated = true;
        draft.form.participantId.error = null;
        break;
      case RiskParticipantIdError.Type:
        draft.form.participantId.validating = false;
        draft.form.participantId.validated = false;
        draft.form.participantId.error = action.participantIdError;
        break;
      case RiskCollateralIdChange.Type:
        draft.form.collateralId.value = action.collateralId;
        draft.form.collateralId.touched = true;
        draft.form.collateralId.validating = false;
        draft.form.collateralId.validated = true;
        draft.form.collateralId.error = null;
        break;
      case RiskSummarySearch.Type:
        draft.summary = null;
        draft.pageError = null;
        break;
      case RiskSummaryFound.Type:
        draft.lastUpdated = new Date();
        draft.summary = { ...action.summary };
        break;
      case RiskSummaryError.Type:
        draft.lastUpdated = new Date();
        draft.summary = null;
        draft.form.participantId.validating = false;
        draft.form.participantId.validated = false;
        draft.form.participantId.error = action.error;
        break;
      case RiskSummaryServerError.Type:
        draft.lastUpdated = new Date();
        draft.summary = null;
        draft.pageError =
          'Sorry, there was an unexpected error. We are currently trying to fix the problem. In the meantime, you can refresh the page or contact the administrator.'; // action.error;
        break;
      case RiskResetForm.Type:
        draft.summary = null;
        draft.pageError = null;
        draft.form.collateralId = {
          type: 'string',
          editable: false,
          touched: false,
          value: null,
          error: null,
          async: false,
          validatable: true,
          validated: false,
          validating: false,
        };
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
    }
  });
}
