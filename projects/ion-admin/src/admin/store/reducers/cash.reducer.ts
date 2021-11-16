import produce from 'immer';

import {
  CashScheduleEditClose,
  CashScheduleEditOpen,
  CashScheduleFetch,
  CashScheduleFetchError,
  CashScheduleFetchResult,
  CashScheduleRun,
  CashScheduleRunResult,
  CashScheduleRunError,
  CashScheduleSubmit,
  CashScheduleSubmitError,
  CashScheduleSubmitResult,
  CashScheduleSettlementDateChange,
  CashScheduleToggle,
  CashScheduleToggleResult,
  CashScheduleToggleError,
  CashSchedulePageLoaded,
  CashScheduleClearPageError,
  CashScheduleClearPageSuccess,
  CashScheduleClearCommitMessage,
  CashSchedulePageRefreshed,
} from '../actions/cash.actions';

import { ICashState } from '../../types';

export const initialState: ICashState = {
  progress: false,
  inProgressMessage: null,
  settlementDate: null,
  schedule: null,
  lastUpdated: null,
  initialLoaded: null,
  pageLoaded: null,
  editing: false,
  commitMessage: null,
  commitError: null,
  pageError: null,
  pageSuccess: null,
};

export function reducer(
  state: ICashState = initialState,
  action:
    | CashSchedulePageLoaded
    | CashSchedulePageRefreshed
    | CashScheduleClearPageError
    | CashScheduleClearPageSuccess
    | CashScheduleEditClose
    | CashScheduleEditOpen
    | CashScheduleFetch
    | CashScheduleFetchResult
    | CashScheduleFetchError
    | CashScheduleRun
    | CashScheduleRunResult
    | CashScheduleRunError
    | CashScheduleSubmit
    | CashScheduleSubmitError
    | CashScheduleSubmitResult
    | CashScheduleToggle
    | CashScheduleToggleResult
    | CashScheduleToggleError
    | CashScheduleSettlementDateChange
    | CashScheduleClearCommitMessage
): ICashState {
  return produce(state, (draft) => {
    switch (action.type) {
      case CashSchedulePageLoaded.Type:
        draft.pageLoaded = new Date();
        draft.initialLoaded = state.initialLoaded || draft.pageLoaded;
        break;
      case CashSchedulePageRefreshed.Type:
        draft.lastUpdated = new Date();
        break;
      case CashScheduleClearPageError.Type:
        draft.pageError = null;
        break;
      case CashScheduleClearPageSuccess.Type:
        draft.pageSuccess = null;
        break;
      case CashScheduleEditOpen.Type:
        draft.commitMessage = null;
        draft.commitError = null;
        draft.editing = true;
        break;
      case CashScheduleEditClose.Type:
        draft.editing = false;
        break;
      case CashScheduleFetch.Type:
        draft.commitError = null;
        draft.commitMessage = null;
        draft.pageError = null;
        break;
      case CashScheduleFetchResult.Type:
        draft.progress = action.inProgressState.progress;
        draft.inProgressMessage = action.inProgressState.inProgressMessage;
        draft.schedule = { ...action.schedule };
        draft.lastUpdated = new Date();
        draft.pageError = null;
        break;
      case CashScheduleFetchError.Type:
        draft.pageError =
          'Sorry, there was an unexpected error. We are currently trying to fix the problem. In the meantime, you can refresh the page or contact the administrator.'; // action.error;
        draft.lastUpdated = new Date();
        break;
      case CashScheduleRun.Type:
        draft.pageError = null;
        draft.progress = true;
        draft.inProgressMessage = "Intraday Cash Settlement currently in progress."
        break;
      case CashScheduleRunResult.Type:
        draft.progress = false;
        break;
      case CashScheduleRunError.Type:
        draft.pageError =
          'Sorry, there was an unexpected error. We are currently trying to fix the problem. In the meantime, you can refresh the page or contact the administrator.'; // action.error;
        draft.progress = false;
        break;
      case CashScheduleSettlementDateChange.Type:
        draft.settlementDate = action.settlementDate;
        break;
      case CashScheduleSubmit.Type:
      case CashScheduleToggle.Type:
        draft.commitMessage = null;
        draft.commitError = null;
        break;
      case CashScheduleSubmitResult.Type:
      case CashScheduleToggleResult.Type:
        draft.schedule = { ...action.schedule };
        draft.commitMessage = 'Schedule successfully updated.';
        draft.editing = false;
        break;
      case CashScheduleSubmitError.Type:
      case CashScheduleToggleError.Type:
        draft.commitError = action.error;
        break;
      case CashScheduleClearCommitMessage.Type:
        draft.commitMessage = null;
        break;
    }
  });
}
