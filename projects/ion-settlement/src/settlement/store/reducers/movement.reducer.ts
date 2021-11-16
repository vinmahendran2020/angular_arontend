import produce from 'immer';

import {
  MovementPageLoaded,
  MovementClearPageError,
  MovementFilterSummary,
  MovementDateChange,
  MovementActionChange,
  MovementClearPageSuccess,
  MovementSummaryError,
  MovementSummaryServerError,
  MovementSummarySearch,
  MovementSummaryFound,
  MovementResetForm,
} from '../actions/movement.actions';

import { IMovement, IMovementForm, IMovementState } from '../../types';

export const initialState: IMovementState = {
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
    movements: [],
    filteredMovements: [],
  },
  lastUpdated: null,
  initialLoaded: null,
  pageLoaded: null,
  pageError: null,
  pageSuccess: null,
};

function toFiltered(movements: IMovement[], form: IMovementForm): IMovement[] {
  const date = form.date.value;
  const action = form.action.value;
  return movements.filter((movement) => {
    if (date) {
      if (!(movement.date === date)) {
        return false;
      }
    }
    if (action) {
      if (!(movement.action === action)) {
        return false;
      }
    }
    return true;
  });
}

export function reducer(
  state: IMovementState = initialState,
  action:
    | MovementPageLoaded
    | MovementClearPageError
    | MovementClearPageSuccess
    | MovementDateChange
    | MovementActionChange
    | MovementFilterSummary
    | MovementSummarySearch
    | MovementSummaryFound
    | MovementSummaryError
    | MovementSummaryServerError
    | MovementResetForm
): IMovementState {
  return produce(state, (draft) => {
    switch (action.type) {
      case MovementPageLoaded.Type:
        draft.pageLoaded = new Date();
        draft.initialLoaded = state.initialLoaded || draft.pageLoaded;
        break;
      case MovementClearPageError.Type:
        draft.pageError = null;
        break;
      case MovementClearPageSuccess.Type:
        draft.pageSuccess = null;
        break;
      case MovementFilterSummary.Type:
        draft.summary.filteredMovements = toFiltered(
          state.summary.movements,
          state.form
        );
        break;
      case MovementActionChange.Type: {
        draft.form.action.value = action.action;
        draft.form.action.touched = true;
        draft.form.action.error = null;
        draft.form.action.validating = false;
        draft.form.action.validated = true;
        break;
      }
      case MovementDateChange.Type: {
        draft.form.date.value = action.date;
        draft.form.date.touched = true;
        draft.form.date.error = null;
        draft.form.date.validating = false;
        draft.form.date.validated = true;
        break;
      }
      case MovementSummarySearch.Type:
        // draft.summary = { movements: [] };
        draft.pageError = null;
        break;
      case MovementSummaryFound.Type:
        draft.lastUpdated = new Date();
        draft.summary.movements = action.movements;
        draft.summary.filteredMovements = toFiltered(
          action.movements,
          state.form
        );
        draft.pageError = null;
        break;
      case MovementSummaryError.Type:
        draft.lastUpdated = new Date();
        draft.summary = { movements: [], filteredMovements: [] };
        draft.pageError = null;
        break;
      case MovementSummaryServerError.Type:
        draft.lastUpdated = new Date();
        draft.summary = { movements: [], filteredMovements: [] };
        draft.pageError =
          'Sorry, there was an unexpected error. We are currently trying to fix the problem. In the meantime, you can refresh the page or contact the administrator.'; // action.error;
        break;
      case MovementResetForm.Type:
        draft.lastUpdated = new Date();
        draft.pageError = null;
        draft.pageSuccess = null;
        draft.form = initialState.form;
        draft.summary = initialState.summary;
        break;
    }
  });
}
