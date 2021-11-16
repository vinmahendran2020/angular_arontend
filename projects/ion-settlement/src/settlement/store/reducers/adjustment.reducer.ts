import produce from 'immer';

import {
  AdjustmentPageLoaded,
  AdjustmentClearPageError,
  AdjustmentFilterSummary,
  AdjustmentTransactionIdChange,
  AdjustmentSettlementDateChange,
  AdjustmentActionChange,
  AdjustmentStatusChange,
  AdjustmentCreationDateChange,
  AdjustmentClearPageSuccess,
  AdjustmentSummaryError,
  AdjustmentSummaryServerError,
  AdjustmentSummarySearch,
  AdjustmentSummaryFound,
  AdjustmentResetForm,
} from '../actions/adjustment.actions';

import { IAdjustment, IAdjustmentForm, IAdjustmentState } from '../../types';

export const initialState: IAdjustmentState = {
  form: {
    transactionId: {
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
    settlementDate: {
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
    status: {
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
    creationDate: {
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
    adjustments: [],
    filteredAdjustments: [],
  },
  lastUpdated: null,
  initialLoaded: null,
  pageLoaded: null,
  pageError: null,
  pageSuccess: null,
};

function toFiltered(
  adjustments: IAdjustment[],
  form: IAdjustmentForm
): IAdjustment[] {
  const transactionId = form.transactionId.value;
  const settlementDate = form.settlementDate.value;
  const action = form.action.value;
  const status = form.status.value;
  const creationDate = form.creationDate.value;
  return adjustments.filter((adjustment) => {
    if (transactionId) {
      if (!adjustment.transactionId?.includes(transactionId)) {
        return false;
      }
    }
    if (settlementDate) {
      if (!adjustment.settlementDate?.includes(settlementDate)) {
        return false;
      }
    }
    if (action) {
      if (!adjustment.action?.includes(action)) {
        return false;
      }
    }
    if (status) {
      if (!adjustment.status?.includes(status)) {
        return false;
      }
    }
    if (creationDate) {
      if (!adjustment.creationDate?.includes(creationDate)) {
        return false;
      }
    }
    return true;
  });
}

export function reducer(
  state: IAdjustmentState = initialState,
  action:
    | AdjustmentPageLoaded
    | AdjustmentClearPageError
    | AdjustmentClearPageSuccess
    | AdjustmentTransactionIdChange
    | AdjustmentSettlementDateChange
    | AdjustmentActionChange
    | AdjustmentStatusChange
    | AdjustmentCreationDateChange
    | AdjustmentFilterSummary
    | AdjustmentSummarySearch
    | AdjustmentSummaryFound
    | AdjustmentSummaryError
    | AdjustmentSummaryServerError
    | AdjustmentResetForm
): IAdjustmentState {
  return produce(state, (draft) => {
    switch (action.type) {
      case AdjustmentPageLoaded.Type:
        draft.pageLoaded = new Date();
        draft.initialLoaded = state.initialLoaded || draft.pageLoaded;
        break;
      case AdjustmentClearPageError.Type:
        draft.pageError = null;
        break;
      case AdjustmentClearPageSuccess.Type:
        draft.pageSuccess = null;
        break;
      case AdjustmentFilterSummary.Type:
        draft.summary.filteredAdjustments = toFiltered(
          state.summary.adjustments,
          state.form
        );
        break;
      case AdjustmentTransactionIdChange.Type: {
        draft.form.transactionId.value = action.transactionId;
        draft.form.transactionId.touched = true;
        draft.form.transactionId.error = null;
        draft.form.transactionId.validating = false;
        draft.form.transactionId.validated = true;
        break;
      }
      case AdjustmentSettlementDateChange.Type: {
        draft.form.settlementDate.value = action.settlementDate;
        draft.form.settlementDate.touched = true;
        draft.form.settlementDate.error = null;
        draft.form.settlementDate.validating = false;
        draft.form.settlementDate.validated = true;
        break;
      }
      case AdjustmentActionChange.Type: {
        draft.form.action.value = action.action;
        draft.form.action.touched = true;
        draft.form.action.error = null;
        draft.form.action.validating = false;
        draft.form.action.validated = true;
        break;
      }
      case AdjustmentStatusChange.Type: {
        draft.form.status.value = action.status;
        draft.form.status.touched = true;
        draft.form.status.error = null;
        draft.form.status.validating = false;
        draft.form.status.validated = true;
        break;
      }
      case AdjustmentCreationDateChange.Type: {
        draft.form.creationDate.value = action.creationDate;
        draft.form.creationDate.touched = true;
        draft.form.creationDate.error = null;
        draft.form.creationDate.validating = false;
        draft.form.creationDate.validated = true;
        break;
      }
      case AdjustmentSummarySearch.Type:
        // draft.summary = { adjustments: [] };
        draft.pageError = null;
        break;
      case AdjustmentSummaryFound.Type:
        draft.lastUpdated = new Date();
        draft.summary.adjustments = action.adjustments;
        draft.summary.filteredAdjustments = toFiltered(
          action.adjustments,
          state.form
        );
        draft.pageError = null;
        break;
      case AdjustmentSummaryError.Type:
        draft.lastUpdated = new Date();
        draft.summary = { adjustments: [], filteredAdjustments: [] };
        draft.pageError = null;
        break;
      case AdjustmentSummaryServerError.Type:
        draft.lastUpdated = new Date();
        draft.summary = { adjustments: [], filteredAdjustments: [] };
        draft.pageError =
          'Sorry, there was an unexpected error. We are currently trying to fix the problem. In the meantime, you can refresh the page or contact the administrator.'; // action.error;
        break;
      case AdjustmentResetForm.Type:
        draft.lastUpdated = new Date();
        draft.pageError = null;
        draft.pageSuccess = null;
        draft.form = initialState.form;
        draft.summary = initialState.summary;
        break;
    }
  });
}
