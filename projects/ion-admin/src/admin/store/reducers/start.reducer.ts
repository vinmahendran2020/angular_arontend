import produce from 'immer';

import {
  StartScheduleEditClose,
  StartScheduleEditOpen,
  StartScheduleFetch,
  StartScheduleFetchError,
  StartScheduleFetchResult,
  StartScheduleRun,
  StartScheduleRunResult,
  StartScheduleRunError,
  StartScheduleSubmit,
  StartScheduleSubmitError,
  StartScheduleSubmitResult,
  StartScheduleSettlementDateChange,
  StartScheduleToggle,
  StartScheduleToggleResult,
  StartScheduleToggleError,
  StartSchedulePageLoaded,
  StartScheduleClearPageError,
  StartScheduleClearPageSuccess,
  StartScheduleClearCommitMessage,
  StartSchedulePageRefreshed,
} from '../actions/start.actions';

import { IStartState } from '../../types';

export const initialState: IStartState = {
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
  state: IStartState = initialState,
  action:
    | StartSchedulePageLoaded
    | StartSchedulePageRefreshed
    | StartScheduleClearPageError
    | StartScheduleClearPageSuccess
    | StartScheduleEditClose
    | StartScheduleEditOpen
    | StartScheduleFetch
    | StartScheduleFetchResult
    | StartScheduleFetchError
    | StartScheduleRun
    | StartScheduleRunResult
    | StartScheduleRunError
    | StartScheduleSubmit
    | StartScheduleSubmitError
    | StartScheduleSubmitResult
    | StartScheduleToggle
    | StartScheduleToggleResult
    | StartScheduleToggleError
    | StartScheduleSettlementDateChange
    | StartScheduleClearCommitMessage
): IStartState {
  return produce(state, (draft) => {
    switch (action.type) {
      case StartSchedulePageLoaded.Type:
        draft.pageLoaded = new Date();
        draft.initialLoaded = state.initialLoaded || draft.pageLoaded;
        break;
      case StartSchedulePageRefreshed.Type:
        draft.lastUpdated = new Date();
        break;
      case StartScheduleClearPageError.Type:
        draft.pageError = null;
        break;
      case StartScheduleClearPageSuccess.Type:
        draft.pageSuccess = null;
        break;
      case StartScheduleEditOpen.Type:
        draft.commitMessage = null;
        draft.commitError = null;
        draft.editing = true;
        break;
      case StartScheduleEditClose.Type:
        draft.editing = false;
        break;
      case StartScheduleFetch.Type:
        draft.commitError = null;
        draft.commitMessage = null;
        draft.pageError = null;
        break;
      case StartScheduleFetchResult.Type:
        draft.progress = action.inProgressState.progress;
        draft.inProgressMessage = action.inProgressState.inProgressMessage;
        draft.schedule = { ...action.schedule };
        draft.lastUpdated = new Date();
        draft.pageError = null;
        break;
      case StartScheduleFetchError.Type:
        draft.pageError =
            'Sorry, there was an unexpected error. We are currently trying to fix the problem. In the meantime, you can refresh the page or contact the administrator.'; // action.error;
        draft.lastUpdated = new Date(); 
         break; 
        case StartScheduleRun.Type:
          draft.pageError = null;
          draft.progress = true;
          draft.inProgressMessage = "The Start of Day Processes are currently in progress."
          break;
        case StartScheduleRunResult.Type:
          draft.progress = false;
          break;
        case StartScheduleRunError.Type:
          draft.pageError =
            'Sorry, there was an unexpected error. We are currently trying to fix the problem. In the meantime, you can refresh the page or contact the administrator.'; // action.error;
          draft.progress = false;
          break;
        case StartScheduleSubmit.Type:
        case StartScheduleToggle.Type:
          draft.commitMessage = null;
          draft.commitError = null;
          break;
        case StartScheduleSubmitResult.Type:
        case StartScheduleToggleResult.Type:
          draft.schedule = { ...action.schedule };
          draft.commitMessage = 'Schedule successfully updated.';
          draft.editing = false;
          break;
        case StartScheduleSubmitError.Type:
        case StartScheduleToggleError.Type:
          draft.commitError = action.error;
          break;
        case StartScheduleClearCommitMessage.Type:
          draft.commitMessage = null;
          break;
    }
  });
}
