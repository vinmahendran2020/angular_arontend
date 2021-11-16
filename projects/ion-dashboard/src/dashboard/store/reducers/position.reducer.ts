import produce from 'immer';
import * as moment from 'moment';

import {
  PositionParticipantIdChange,
  PositionCusipChange,
  PositionDateChange,
  PositionSummarySearch,
  PositionSummaryFound,
  PositionSummaryError,
  PositionSummaryServerError,
  PositionResetForm,
  PositionCusipSearchOpen,
  PositionCusipSearchClose,
  PositionPageLoaded,
  PositionClearPageError,
  PositionPageRefreshed,
  PositionParticipantIdFound,
  PositionParticipantIdError,
  PositionClearPageSuccess,
} from '../actions/position.actions';

import { IPositionState } from '../../types';

export const initialState: IPositionState = {
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
    cusip: {
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
    date: {
      type: 'string',
      editable: true,
      touched: false,
      value: moment().format('L'),
      error: null,
      async: false,
      validatable: true,
      validated: false,
      validating: false,
    },
  },
  summary: null,
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
  state: IPositionState = initialState,
  action:
    | PositionPageLoaded
    | PositionPageRefreshed
    | PositionClearPageError
    | PositionClearPageSuccess
    | PositionParticipantIdChange
    | PositionParticipantIdFound
    | PositionParticipantIdError
    | PositionCusipChange
    | PositionDateChange
    | PositionSummarySearch
    | PositionSummaryFound
    | PositionSummaryError
    | PositionSummaryServerError
    | PositionResetForm
    | PositionCusipSearchOpen
    | PositionCusipSearchClose
): IPositionState {
  return produce(state, (draft) => {
    switch (action.type) {
      case PositionPageLoaded.Type:
        draft.pageLoaded = new Date();
        draft.initialLoaded = state.initialLoaded || draft.pageLoaded;
        break;
      case PositionPageRefreshed.Type:
        draft.lastUpdated = new Date();
        break;
      case PositionClearPageError.Type:
        draft.pageError = null;
        break;
      case PositionClearPageSuccess.Type:
        draft.pageSuccess = null;
        break;
      case PositionParticipantIdChange.Type:
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
      case PositionParticipantIdFound.Type:
        draft.form.participantId.validating = false;
        draft.form.participantId.validated = true;
        draft.form.participantId.error = null;
        break;
      case PositionParticipantIdError.Type:
        draft.form.participantId.validating = false;
        draft.form.participantId.validated = false;
        draft.form.participantId.error = action.participantIdError;
        break;
      case PositionCusipChange.Type:
        draft.form.cusip.value = action.cusip;
        draft.form.cusip.touched = true;
        draft.form.cusip.validating = false;
        draft.form.cusip.validated = true;
        draft.form.cusip.error = null;
        break;
      case PositionDateChange.Type:
        draft.form.date.value = action.date;
        draft.form.date.touched = true;
        draft.form.date.validating = false;
        draft.form.date.validated = action.date !== null;
        draft.form.date.error = !action.date
          ? 'Business Date is required'
          : null;
        break;
      case PositionSummarySearch.Type:
        draft.summary = null;
        draft.pageError = null;
        break;
      case PositionSummaryFound.Type:
        draft.lastUpdated = new Date();
        draft.summary = { ...action.summary };
        draft.pageError = null;
        break;
      case PositionSummaryError.Type:
        draft.lastUpdated = new Date();
        draft.summary = null;
        draft.form.cusip.validating = false;
        draft.form.cusip.validated = false;
        draft.form.cusip.error = action.error;
        break;
      case PositionSummaryServerError.Type:
        draft.lastUpdated = new Date();
        draft.summary = null;
        draft.pageError =
          'Sorry, there was an unexpected error. We are currently trying to fix the problem. In the meantime, you can refresh the page or contact the administrator.'; // action.error;
        break;
      case PositionResetForm.Type:
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
        draft.form.cusip = {
          type: 'string',
          editable: true,
          touched: false,
          value: null,
          error: null,
          async: false,
          validatable: true,
          validated: false,
          validating: false,
        };
        draft.form.date = {
          type: 'string',
          editable: true,
          touched: false,
          value: moment().format('L'),
          error: null,
          async: false,
          validatable: true,
          validated: false,
          validating: false,
        };
        break;
      case PositionCusipSearchOpen.Type:
        draft.dialog.cusip = true;
        break;
      case PositionCusipSearchClose.Type:
        draft.dialog.cusip = false;
        break;
    }
  });
}
