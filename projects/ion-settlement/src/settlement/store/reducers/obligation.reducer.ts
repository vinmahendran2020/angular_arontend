import produce from 'immer';

import {
  ObligationPageLoaded,
  ObligationClearPageError,
  ObligationFilterSummary,
  ObligationCusipNameChange,
  ObligationCusipIdChange,
  ObligationDirectionChange,
  ObligationSettlementStatusChange,
  ObligationClearPageSuccess,
  ObligationSummaryError,
  ObligationSummaryServerError,
  ObligationSummarySearch,
  ObligationSummaryFound,
  ObligationResetForm,
} from '../actions/obligation.actions';

import { IObligation, IObligationForm, IObligationState } from '../../types';

export const initialState: IObligationState = {
  form: {
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
    direction: {
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
    settlementStatus: {
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
    obligations: [],
    filteredObligations: [],
  },
  lastUpdated: null,
  initialLoaded: null,
  pageLoaded: null,
  pageError: null,
  pageSuccess: null,
};

function toFiltered(
  obligations: IObligation[],
  form: IObligationForm
): IObligation[] {
  const cusipName = form.cusipName.value;
  const cusipId = form.cusipId.value;
  const direction = form.direction.value;
  const settlementStatus = form.settlementStatus.value;
  return obligations.filter((obligation) => {
    if (cusipName) {
      if (!obligation.cusipName?.includes(cusipName)) {
        return false;
      }
    }
    if (cusipId) {
      if (!obligation.cusipId?.includes(cusipId)) {
        return false;
      }
    }
    if (direction) {
      if (!obligation.direction?.includes(direction)) {
        return false;
      }
    }
    if (settlementStatus) {
      if (!obligation.settlementStatus?.includes(settlementStatus)) {
        return false;
      }
    }
    return true;
  });
}

export function reducer(
  state: IObligationState = initialState,
  action:
    | ObligationPageLoaded
    | ObligationClearPageError
    | ObligationClearPageSuccess
    | ObligationCusipNameChange
    | ObligationCusipIdChange
    | ObligationDirectionChange
    | ObligationSettlementStatusChange
    | ObligationFilterSummary
    | ObligationSummarySearch
    | ObligationSummaryFound
    | ObligationSummaryError
    | ObligationSummaryServerError
    | ObligationResetForm
): IObligationState {
  return produce(state, (draft) => {
    switch (action.type) {
      case ObligationPageLoaded.Type:
        draft.pageLoaded = new Date();
        draft.initialLoaded = state.initialLoaded || draft.pageLoaded;
        break;
      case ObligationClearPageError.Type:
        draft.pageError = null;
        break;
      case ObligationClearPageSuccess.Type:
        draft.pageSuccess = null;
        break;
      case ObligationFilterSummary.Type:
        draft.summary.filteredObligations = toFiltered(
          state.summary.obligations,
          state.form
        );
        break;
      case ObligationCusipIdChange.Type: {
        draft.form.cusipId.value = action.cusipId;
        draft.form.cusipId.touched = true;
        draft.form.cusipId.error = null;
        draft.form.cusipId.validating = false;
        draft.form.cusipId.validated = true;
        break;
      }
      case ObligationCusipNameChange.Type: {
        draft.form.cusipName.value = action.cusipName;
        draft.form.cusipName.touched = true;
        draft.form.cusipName.error = null;
        draft.form.cusipName.validating = false;
        draft.form.cusipName.validated = true;
        break;
      }
      case ObligationDirectionChange.Type: {
        draft.form.direction.value = action.direction;
        draft.form.direction.touched = true;
        draft.form.direction.error = null;
        draft.form.direction.validating = false;
        draft.form.direction.validated = true;
        break;
      }
      case ObligationSettlementStatusChange.Type: {
        draft.form.settlementStatus.value = action.settlementStatus;
        draft.form.settlementStatus.touched = true;
        draft.form.settlementStatus.error = null;
        draft.form.settlementStatus.validating = false;
        draft.form.settlementStatus.validated = true;
        break;
      }
      case ObligationSummarySearch.Type:
        // draft.summary = { obligations: [] };
        draft.pageError = null;
        break;
      case ObligationSummaryFound.Type:
        draft.lastUpdated = new Date();
        draft.summary.obligations = action.obligations;
        draft.summary.filteredObligations = toFiltered(
          action.obligations,
          state.form
        );
        draft.pageError = null;
        break;
      case ObligationSummaryError.Type:
        draft.lastUpdated = new Date();
        draft.summary = { obligations: [], filteredObligations: [] };
        draft.pageError = null;
        break;
      case ObligationSummaryServerError.Type:
        draft.lastUpdated = new Date();
        draft.summary = { obligations: [], filteredObligations: [] };
        draft.pageError =
          'Sorry, there was an unexpected error. We are currently trying to fix the problem. In the meantime, you can refresh the page or contact the administrator.'; // action.error;
        break;
      case ObligationResetForm.Type:
        draft.lastUpdated = new Date();
        draft.pageError = null;
        draft.pageSuccess = null;
        draft.form = initialState.form;
        draft.summary = initialState.summary;
        break;
    }
  });
}
