import produce from 'immer';

import {
  SecurityScheduleEditClose,
  SecurityScheduleEditOpen,
  SecurityScheduleFetch,
  SecurityScheduleFetchError,
  SecurityScheduleFetchResult,
  SecurityScheduleRun,
  SecurityScheduleRunResult,
  SecurityScheduleRunError,
  SecurityScheduleSubmit,
  SecurityScheduleSubmitError,
  SecurityScheduleSubmitResult,
  SecurityScheduleSettlementDateChange,
  SecurityScheduleToggle,
  SecurityScheduleToggleResult,
  SecurityScheduleToggleError,
  SecuritySchedulePageLoaded,
  SecurityScheduleClearPageError,
  SecurityScheduleClearCommitMessage,
  SecuritySchedulePageRefreshed,
  SecurityScheduleClearPageSuccess,
} from '../actions/security.actions';

import { ISecurityState } from '../../types';

export const initialState: ISecurityState = {
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
  state: ISecurityState = initialState,
  action:
    | SecuritySchedulePageLoaded
    | SecuritySchedulePageRefreshed
    | SecurityScheduleClearPageError
    | SecurityScheduleClearPageSuccess
    | SecurityScheduleEditClose
    | SecurityScheduleEditOpen
    | SecurityScheduleFetch
    | SecurityScheduleFetchResult
    | SecurityScheduleFetchError
    | SecurityScheduleRun
    | SecurityScheduleRunResult
    | SecurityScheduleRunError
    | SecurityScheduleSubmit
    | SecurityScheduleSubmitError
    | SecurityScheduleSubmitResult
    | SecurityScheduleToggle
    | SecurityScheduleToggleResult
    | SecurityScheduleToggleError
    | SecurityScheduleSettlementDateChange
    | SecurityScheduleClearCommitMessage
): ISecurityState {
  return produce(state, (draft) => {
    switch (action.type) {
      case SecuritySchedulePageLoaded.Type:
        draft.pageLoaded = new Date();
        draft.initialLoaded = state.initialLoaded || draft.pageLoaded;
        break;
      case SecuritySchedulePageRefreshed.Type:
        draft.lastUpdated = new Date();
        break;
      case SecurityScheduleClearPageError.Type:
        draft.pageError = null;
        break;
      case SecurityScheduleClearPageSuccess.Type:
        draft.pageSuccess = null;
        break;
      case SecurityScheduleEditOpen.Type:
        draft.commitMessage = null;
        draft.commitError = null;
        draft.editing = true;
        break;
      case SecurityScheduleEditClose.Type:
        draft.editing = false;
        break;
      case SecurityScheduleFetch.Type:
        draft.commitError = null;
        draft.commitMessage = null;
        draft.pageError = null;
        break;
      case SecurityScheduleFetchResult.Type:
        draft.progress = action.inProgressState.progress;
        draft.inProgressMessage = action.inProgressState.inProgressMessage;
        draft.schedule = { ...action.schedule };
        draft.lastUpdated = new Date();
        draft.pageError = null;
        break;
      case SecurityScheduleFetchError.Type:
        draft.pageError =
          'Sorry, there was an unexpected error. We are currently trying to fix the problem. In the meantime, you can refresh the page or contact the administrator.'; // action.error;
        draft.lastUpdated = new Date();
        break;
      case SecurityScheduleRun.Type:
        draft.pageError = null;
        draft.progress = true;
        draft.inProgressMessage = "Intraday Security Settlement currently in progress."
        break;
      case SecurityScheduleRunResult.Type:
        draft.progress = false;
        break;
      case SecurityScheduleRunError.Type:
        draft.pageError =
          'Sorry, there was an unexpected error. We are currently trying to fix the problem. In the meantime, you can refresh the page or contact the administrator.'; // action.error;
        draft.progress = false;
        break;
      case SecurityScheduleSettlementDateChange.Type:
        draft.settlementDate = action.settlementDate;
        break;
      case SecurityScheduleSubmit.Type:
      case SecurityScheduleToggle.Type:
        draft.commitMessage = null;
        draft.commitError = null;
        break;
      case SecurityScheduleSubmitResult.Type:
      case SecurityScheduleToggleResult.Type:
        draft.schedule = { ...action.schedule };
        draft.commitMessage = 'Schedule successfully updated.';
        draft.editing = false;
        break;
      case SecurityScheduleSubmitError.Type:
      case SecurityScheduleToggleError.Type:
        draft.commitError = action.error;
        break;
      case SecurityScheduleClearCommitMessage.Type:
        draft.commitMessage = null;
        break;
    }
  });
}
