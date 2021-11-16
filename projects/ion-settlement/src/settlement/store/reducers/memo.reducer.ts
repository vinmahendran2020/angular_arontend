import produce from 'immer';

import {
  MemoPageLoaded,
  MemoClearPageError,
  MemoFilterSummary,
  MemoCusipNameChange,
  MemoCusipIdChange,
  MemoActionChange,
  MemoClearPageSuccess,
  MemoSummaryError,
  MemoSummaryServerError,
  MemoSummarySearch,
  MemoSummaryFound,
  MemoResetForm,
} from '../actions/memo.actions';

import { IMemo, IMemoForm, IMemoState } from '../../types';

export const initialState: IMemoState = {
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
    memos: [],
    filteredMemos: [],
  },
  lastUpdated: null,
  initialLoaded: null,
  pageLoaded: null,
  pageError: null,
  pageSuccess: null,
};

function toFiltered(memos: IMemo[], form: IMemoForm): IMemo[] {
  const cusipName = form.cusipName.value;
  const cusipId = form.cusipId.value;
  const actionx = form.action.value;
  return memos.filter((memo) => {
    if (cusipName) {
      if (!memo.cusipName?.includes(cusipName)) {
        return false;
      }
    }
    if (cusipId) {
      if (!memo.cusipId?.includes(cusipId)) {
        return false;
      }
    }
    if (actionx) {
      if (!(memo.action === actionx)) {
        return false;
      }
    }
    return true;
  });
}

export function reducer(
  state: IMemoState = initialState,
  action:
    | MemoPageLoaded
    | MemoClearPageError
    | MemoClearPageSuccess
    | MemoCusipNameChange
    | MemoCusipIdChange
    | MemoActionChange
    | MemoFilterSummary
    | MemoSummarySearch
    | MemoSummaryFound
    | MemoSummaryError
    | MemoSummaryServerError
    | MemoResetForm
): IMemoState {
  return produce(state, (draft) => {
    switch (action.type) {
      case MemoPageLoaded.Type:
        draft.pageLoaded = new Date();
        draft.initialLoaded = state.initialLoaded || draft.pageLoaded;
        break;
      case MemoClearPageError.Type:
        draft.pageError = null;
        break;
      case MemoClearPageSuccess.Type:
        draft.pageSuccess = null;
        break;
      case MemoFilterSummary.Type:
        draft.summary.filteredMemos = toFiltered(
          state.summary.memos,
          state.form
        );
        break;
      case MemoActionChange.Type: {
        draft.form.action.value = action.action;
        draft.form.action.touched = true;
        draft.form.action.error = null;
        draft.form.action.validating = false;
        draft.form.action.validated = true;
        break;
      }
      case MemoCusipIdChange.Type: {
        draft.form.cusipId.value = action.cusipId;
        draft.form.cusipId.touched = true;
        draft.form.cusipId.error = null;
        draft.form.cusipId.validating = false;
        draft.form.cusipId.validated = true;
        break;
      }
      case MemoCusipNameChange.Type: {
        draft.form.cusipName.value = action.cusipName;
        draft.form.cusipName.touched = true;
        draft.form.cusipName.error = null;
        draft.form.cusipName.validating = false;
        draft.form.cusipName.validated = true;
        break;
      }
      case MemoSummarySearch.Type:
        // draft.summary = { memos: [] };
        draft.pageError = null;
        break;
      case MemoSummaryFound.Type:
        draft.lastUpdated = new Date();
        draft.summary.memos = action.memos;
        draft.summary.filteredMemos = toFiltered(action.memos, state.form);
        draft.pageError = null;
        break;
      case MemoSummaryError.Type:
        draft.lastUpdated = new Date();
        draft.summary = { memos: [], filteredMemos: [] };
        draft.pageError = null;
        break;
      case MemoSummaryServerError.Type:
        draft.lastUpdated = new Date();
        draft.summary = { memos: [], filteredMemos: [] };
        draft.pageError =
          'Sorry, there was an unexpected error. We are currently trying to fix the problem. In the meantime, you can refresh the page or contact the administrator.'; // action.error;
        break;
      case MemoResetForm.Type:
        draft.lastUpdated = new Date();
        draft.pageError = null;
        draft.pageSuccess = null;
        draft.form = initialState.form;
        draft.summary = initialState.summary;
        break;
    }
  });
}
