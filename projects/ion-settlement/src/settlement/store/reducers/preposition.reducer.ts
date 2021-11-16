import produce from 'immer';

import {
  PrepositionPageLoaded,
  PrepositionClearPageError,
  PrepositionFilterSummary,
  PrepositionCusipNameChange,
  PrepositionCusipIdChange,
  PrepositionActionChange,
  PrepositionClearPageSuccess,
  PrepositionSummaryError,
  PrepositionSummaryServerError,
  PrepositionSummarySearch,
  PrepositionSummaryFound,
  PrepositionResetForm,
} from '../actions/preposition.actions';

import { IPreposition, IPrepositionForm, IPrepositionState } from '../../types';

export const initialState: IPrepositionState = {
  form: {
    cusipName: {
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
    cusipId: {
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
    prepositions: [],
    filteredPrepositions: [],
  },
  lastUpdated: null,
  initialLoaded: null,
  pageLoaded: null,
  pageError: null,
  pageSuccess: null,
};

function toFiltered(
  prepositions: IPreposition[],
  form: IPrepositionForm
): IPreposition[] {
  const cusipName = form.cusipName.value;
  const cusipId = form.cusipId.value;
  const action = form.action.value;
  return prepositions.filter((preposition) => {
    if (cusipName) {
      if (!preposition.cusipName?.includes(cusipName)) {
        return false;
      }
    }
    if (cusipId) {
      if (!preposition.cusipId?.includes(cusipId)) {
        return false;
      }
    }
    if (action) {
      if (!preposition.action?.includes(action)) {
        return false;
      }
    }
    return true;
  });
}

export function reducer(
  state: IPrepositionState = initialState,
  action:
    | PrepositionPageLoaded
    | PrepositionClearPageError
    | PrepositionClearPageSuccess
    | PrepositionCusipNameChange
    | PrepositionCusipIdChange
    | PrepositionActionChange
    | PrepositionFilterSummary
    | PrepositionSummarySearch
    | PrepositionSummaryFound
    | PrepositionSummaryError
    | PrepositionSummaryServerError
    | PrepositionResetForm
): IPrepositionState {
  return produce(state, (draft) => {
    switch (action.type) {
      case PrepositionPageLoaded.Type:
        draft.pageLoaded = new Date();
        draft.initialLoaded = state.initialLoaded || draft.pageLoaded;
        break;
      case PrepositionClearPageError.Type:
        draft.pageError = null;
        break;
      case PrepositionClearPageSuccess.Type:
        draft.pageSuccess = null;
        break;
      case PrepositionFilterSummary.Type:
        draft.summary.filteredPrepositions = toFiltered(
          state.summary.prepositions,
          state.form
        );
        break;
      case PrepositionCusipNameChange.Type: {
        draft.form.cusipName.value = action.cusipName;
        draft.form.cusipName.touched = true;
        draft.form.cusipName.error = null;
        draft.form.cusipName.validating = false;
        draft.form.cusipName.validated = true;
        break;
      }
      case PrepositionCusipIdChange.Type: {
        draft.form.cusipId.value = action.cusipId;
        draft.form.cusipId.touched = true;
        draft.form.cusipId.error = null;
        draft.form.cusipId.validating = false;
        draft.form.cusipId.validated = true;
        break;
      }
      case PrepositionActionChange.Type: {
        draft.form.action.value = action.action;
        draft.form.action.touched = true;
        draft.form.action.error = null;
        draft.form.action.validating = false;
        draft.form.action.validated = true;
        break;
      }
      case PrepositionSummarySearch.Type:
        // draft.summary = { prepositions: [] };
        draft.pageError = null;
        break;
      case PrepositionSummaryFound.Type:
        draft.lastUpdated = new Date();
        draft.summary.prepositions = action.prepositions;
        draft.summary.filteredPrepositions = toFiltered(
          action.prepositions,
          state.form
        );
        draft.pageError = null;
        break;
      case PrepositionSummaryError.Type:
        draft.lastUpdated = new Date();
        draft.summary = { prepositions: [], filteredPrepositions: [] };
        draft.pageError = null;
        break;
      case PrepositionSummaryServerError.Type:
        draft.lastUpdated = new Date();
        draft.summary = { prepositions: [], filteredPrepositions: [] };
        draft.pageError =
          'Sorry, there was an unexpected error. We are currently trying to fix the problem. In the meantime, you can refresh the page or contact the administrator.'; // action.error;
        break;
      case PrepositionResetForm.Type:
        draft.lastUpdated = new Date();
        draft.pageError = null;
        draft.pageSuccess = null;
        draft.form = initialState.form;
        draft.summary = initialState.summary;
        break;
    }
  });
}
