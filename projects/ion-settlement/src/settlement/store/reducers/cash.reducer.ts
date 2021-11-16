import produce from 'immer';

import {
  CashPageLoaded,
  CashClearPageError,
  CashFilterSummary,
  CashDateChange,
  CashActionChange,
  CashClearPageSuccess,
  CashSummaryError,
  CashSummaryServerError,
  CashSummarySearch,
  CashSummaryFound,
  CashResetForm,
} from '../actions/cash.actions';

import { ICash, ICashForm, ICashState } from '../../types';

export const initialState: ICashState = {
  form: {
    date: {
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
    action: {
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
  summary: {
    cashs: [],
    filteredCashs: [],
  },
  lastUpdated: null,
  initialLoaded: null,
  pageLoaded: null,
  pageError: null,
  pageSuccess: null,
};

function toFiltered(cashs: ICash[], form: ICashForm): ICash[] {
  const date = form.date.value;
  const action = form.action.value;
  return cashs.filter((cash) => {
    if (date) {
      if (!(cash.date === date)) {
        return false;
      }
    }
    if (action) {
      if (!(cash.action === action)) {
        return false;
      }
    }
    return true;
  });
}

export function reducer(
  state: ICashState = initialState,
  action:
    | CashPageLoaded
    | CashClearPageError
    | CashClearPageSuccess
    | CashDateChange
    | CashActionChange
    | CashFilterSummary
    | CashSummarySearch
    | CashSummaryFound
    | CashSummaryError
    | CashSummaryServerError
    | CashResetForm
): ICashState {
  return produce(state, (draft) => {
    switch (action.type) {
      case CashPageLoaded.Type:
        draft.pageLoaded = new Date();
        draft.initialLoaded = state.initialLoaded || draft.pageLoaded;
        break;
      case CashClearPageError.Type:
        draft.pageError = null;
        break;
      case CashClearPageSuccess.Type:
        draft.pageSuccess = null;
        break;
      case CashFilterSummary.Type:
        draft.summary.filteredCashs = toFiltered(
          state.summary.cashs,
          state.form
        );
        break;
      case CashActionChange.Type: {
        draft.form.action.value = action.action;
        draft.form.action.touched = true;
        draft.form.action.error = null;
        draft.form.action.validating = false;
        draft.form.action.validated = true;
        break;
      }
      case CashDateChange.Type: {
        draft.form.date.value = action.date;
        draft.form.date.touched = true;
        draft.form.date.error = null;
        draft.form.date.validating = false;
        draft.form.date.validated = true;
        break;
      }
      case CashSummarySearch.Type:
        // draft.summary = { cashs: [] };
        draft.pageError = null;
        break;
      case CashSummaryFound.Type:
        draft.lastUpdated = new Date();
        draft.summary.cashs = action.cashs;
        draft.summary.filteredCashs = toFiltered(action.cashs, state.form);
        draft.pageError = null;
        break;
      case CashSummaryError.Type:
        draft.lastUpdated = new Date();
        draft.summary = { cashs: [], filteredCashs: [] };
        draft.pageError = null;
        break;
      case CashSummaryServerError.Type:
        draft.lastUpdated = new Date();
        draft.summary = { cashs: [], filteredCashs: [] };
        draft.pageError =
          'Sorry, there was an unexpected error. We are currently trying to fix the problem. In the meantime, you can refresh the page or contact the administrator.'; // action.error;
        break;
      case CashResetForm.Type:
        draft.lastUpdated = new Date();
        draft.pageError = null;
        draft.pageSuccess = null;
        draft.form = initialState.form;
        draft.summary = initialState.summary;
        break;
    }
  });
}
