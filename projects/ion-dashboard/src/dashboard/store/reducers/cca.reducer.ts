import produce from 'immer';
import * as moment from 'moment';

import {
  CCAParticipantIdChange,
  CCAParticipantIdError,
  CCASummarySearch,
  CCASummaryFound,
  CCASummaryError,
  CCASummaryServerError,
  CCAResetForm,
  CCADetailOpen,
  CCADetailClose,
  CCADetailFetch,
  CCADetailFound,
  CCADetailError,
  CCACusipChange,
  CCAPageLoaded,
  CCAClearPageError,
  CCAPageRefreshed,
  CCASettlementDateChange,
  CCAParticipantIdFound,
  CCAClearPageSuccess,
} from '../actions/cca.actions';

import { ICCAState } from '../../types';

export const initialState: ICCAState = {
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
    settlementDate: {
      type: 'string',
      editable: true,
      touched: false,
      value: [moment().format('L'), moment().add(2, 'days').format('L')],
      error: null,
      async: false,
      validatable: true,
      validated: false,
      validating: false,
    },
  },
  summary: null,
  detail: {
    ccaId: null,
    cusip: '',
    debits: [],
    credits: [],
  },
  lastUpdated: null,
  initialLoaded: null,
  pageLoaded: null,
  pageError: null,
  pageSuccess: null,
};

export function reducer(
  state: ICCAState = initialState,
  action:
    | CCAPageLoaded
    | CCAPageRefreshed
    | CCAClearPageError
    | CCAClearPageSuccess
    | CCAParticipantIdChange
    | CCAParticipantIdFound
    | CCAParticipantIdError
    | CCASettlementDateChange
    | CCASummarySearch
    | CCASummaryFound
    | CCASummaryError
    | CCASummaryServerError
    | CCAResetForm
    | CCADetailOpen
    | CCADetailClose
    | CCADetailFetch
    | CCADetailFound
    | CCADetailError
    | CCACusipChange
): ICCAState {
  return produce(state, (draft) => {
    switch (action.type) {
      case CCAPageLoaded.Type:
        draft.pageLoaded = new Date();
        draft.initialLoaded = state.initialLoaded || draft.pageLoaded;
        break;
      case CCAPageRefreshed.Type:
        draft.lastUpdated = new Date();
        break;
      case CCAClearPageError.Type:
        draft.pageError = null;
        break;
      case CCAClearPageSuccess.Type:
        draft.pageSuccess = null;
        break;
      case CCAParticipantIdChange.Type:
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
      case CCAParticipantIdFound.Type:
        draft.form.participantId.validating = false;
        draft.form.participantId.validated = true;
        draft.form.participantId.error = null;
        break;
      case CCAParticipantIdError.Type:
        draft.form.participantId.validating = false;
        draft.form.participantId.validated = false;
        draft.form.participantId.error = action.participantIdError;
        break;
      case CCASettlementDateChange.Type:
        draft.form.settlementDate.value = action.settlementDate;
        draft.form.settlementDate.touched = true;
        draft.form.settlementDate.validating = false;
        draft.form.settlementDate.validated = true;
        draft.form.settlementDate.error = null;
        break;
      case CCASummarySearch.Type:
        draft.summary = null;
        draft.pageError = null;
        break;
      case CCASummaryFound.Type:
        draft.lastUpdated = new Date();
        draft.summary = { ...action.summary };
        draft.pageError = null;
        draft.form.participantId.error = null;
        break;
      case CCASummaryError.Type:
        draft.lastUpdated = new Date();
        draft.summary = null;
        draft.form.participantId.validating = false;
        draft.form.participantId.validated = false;
        draft.form.participantId.error = action.error;
        break;
      case CCASummaryServerError.Type:
        draft.lastUpdated = new Date();
        draft.summary = null;
        draft.pageError =
          'Sorry, there was an unexpected error. We are currently trying to fix the problem. In the meantime, you can refresh the page or contact the administrator.'; // action.error;
        break;
      case CCAResetForm.Type:
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
        draft.form.settlementDate = {
          type: 'string',
          editable: true,
          touched: false,
          value: [moment().format('L'), moment().add(2, 'days').format('L')],
          error: null,
          async: false,
          validatable: true,
          validated: false,
          validating: false,
        };
        break;
      case CCADetailOpen.Type:
        draft.detail.ccaId = action.ccaId;
        break;
      case CCADetailClose.Type:
        draft.detail.ccaId = null;
        draft.detail.debits = [];
        draft.detail.credits = [];
        break;
      case CCADetailFetch.Type:
        draft.detail.debits = [];
        draft.detail.credits = [];
        break;
      case CCADetailFound.Type:
        draft.detail = action.detail;
        break;
      case CCADetailError.Type:
        draft.detail.debits = [];
        draft.detail.credits = [];
        break;
      case CCACusipChange.Type:
        draft.detail.cusip = action.cusip;
        break;
    }
  });
}
