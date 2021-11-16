import produce from 'immer';

import {
  EndScheduleEditClose,
  EndScheduleEditOpen,
  EndScheduleFetch,
  EndScheduleFetchError,
  EndScheduleFetchResult,
  EndScheduleRun,
  EndScheduleRunResult,
  EndScheduleRunError,
  EndScheduleSubmit,
  EndScheduleSubmitError,
  EndScheduleSubmitResult,
  EndScheduleSettlementDateChange,
  EndScheduleToggle,
  EndScheduleToggleResult,
  EndScheduleToggleError,
  EndSchedulePageLoaded,
  EndScheduleClearPageError,
  EndScheduleClearPageSuccess,
  EndScheduleClearCommitMessage,
  EndSchedulePageRefreshed,
} from '../actions/end.actions';

import { IEndState } from '../../types';

export const initialState: IEndState = {
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
  state: IEndState = initialState,
  action:
    | EndSchedulePageLoaded
    | EndSchedulePageRefreshed
    | EndScheduleClearPageError
    | EndScheduleClearPageSuccess
    | EndScheduleEditClose
    | EndScheduleEditOpen
    | EndScheduleFetch
    | EndScheduleFetchResult
    | EndScheduleFetchError
    | EndScheduleRun
    | EndScheduleRunResult
    | EndScheduleRunError
    | EndScheduleSubmit
    | EndScheduleSubmitError
    | EndScheduleSubmitResult
    | EndScheduleToggle
    | EndScheduleToggleResult
    | EndScheduleToggleError
    | EndScheduleSettlementDateChange
    | EndScheduleClearCommitMessage
): IEndState {
  return produce(state, (draft) => {
    switch (action.type) {
      case EndSchedulePageLoaded.Type:
        draft.pageLoaded = new Date();
        draft.initialLoaded = state.initialLoaded || draft.pageLoaded;
        break;
      case EndSchedulePageRefreshed.Type:
        draft.lastUpdated = new Date();
        break;
      case EndScheduleClearPageError.Type:
        draft.pageError = null;
        break;
      case EndScheduleClearPageSuccess.Type:
        draft.pageSuccess = null;
        break;
      case EndScheduleEditOpen.Type:
        draft.commitMessage = null;
        draft.commitError = null;
        draft.editing = true;
        break;
      case EndScheduleEditClose.Type:
        draft.editing = false;
        break;
      case EndScheduleFetch.Type:
        draft.commitError = null;
        draft.commitMessage = null;
        draft.pageError = null;
        break;
      case EndScheduleFetchResult.Type:
        draft.progress = action.inProgressState.progress;
        draft.inProgressMessage = action.inProgressState.inProgressMessage;
        draft.schedule = { ...action.schedule };
        draft.lastUpdated = new Date();
        draft.pageError = null;
        break;
      case EndScheduleFetchError.Type:
        draft.pageError =
          'Sorry, there was an unexpected error. We are currently trying to fix the problem. In the meantime, you can refresh the page or contact the administrator.'; // action.error;
        draft.lastUpdated = new Date();
        break;
      case EndScheduleRun.Type:
        draft.pageError = null;
        draft.progress = true;
        draft.inProgressMessage = "The End of Day Processes are currently in progress."
        break;
      case EndScheduleRunResult.Type:
        draft.progress = false;
        break;
      case EndScheduleRunError.Type:
        draft.pageError =
          'Sorry, there was an unexpected error. We are currently trying to fix the problem. In the meantime, you can refresh the page or contact the administrator.'; // action.error;
        draft.progress = false;
        break;
      case EndScheduleSettlementDateChange.Type:
        draft.settlementDate = action.settlementDate;
        break;
      case EndScheduleSubmit.Type:
      case EndScheduleToggle.Type:
        draft.commitMessage = null;
        draft.commitError = null;
        break;
      case EndScheduleSubmitResult.Type:
      case EndScheduleToggleResult.Type:
        draft.schedule = { ...action.schedule };
        draft.commitMessage = 'Schedule successfully updated.';
        draft.editing = false;
        break;
      case EndScheduleSubmitError.Type:
      case EndScheduleToggleError.Type:
        draft.commitError = action.error;
        break;
      case EndScheduleClearCommitMessage.Type:
        draft.commitMessage = null;
        break;
    }
  });
}
