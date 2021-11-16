import produce from 'immer';

import {
  NettingScheduleEditClose,
  NettingScheduleEditOpen,
  NettingScheduleFetch,
  NettingScheduleFetchError,
  NettingScheduleFetchResult,
  NettingScheduleRun,
  NettingScheduleRunResult,
  NettingScheduleRunError,
  NettingScheduleSubmit,
  NettingScheduleSubmitError,
  NettingScheduleSubmitResult,
  NettingScheduleToggle,
  NettingScheduleToggleResult,
  NettingScheduleToggleError,
  NettingSchedulePageLoaded,
  NettingScheduleClearPageError,
  NettingScheduleClearCommitMessage,
  NettingSchedulePageRefreshed,
  NettingScheduleClearPageSuccess,
} from '../actions/netting.actions';

import { INettingState } from '../../types';

export const initialState: INettingState = {
  progress: false,
  inProgressMessage: null,
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
  state: INettingState = initialState,
  action:
    | NettingSchedulePageLoaded
    | NettingSchedulePageRefreshed
    | NettingScheduleClearPageError
    | NettingScheduleClearPageSuccess
    | NettingScheduleEditClose
    | NettingScheduleEditOpen
    | NettingScheduleFetch
    | NettingScheduleFetchResult
    | NettingScheduleFetchError
    | NettingScheduleRun
    | NettingScheduleRunResult
    | NettingScheduleRunError
    | NettingScheduleSubmit
    | NettingScheduleSubmitError
    | NettingScheduleSubmitResult
    | NettingScheduleToggle
    | NettingScheduleToggleResult
    | NettingScheduleToggleError
    | NettingScheduleClearCommitMessage
): INettingState {
  return produce(state, (draft) => {
    switch (action.type) {
      case NettingSchedulePageLoaded.Type:
        draft.pageLoaded = new Date();
        draft.initialLoaded = state.initialLoaded || draft.pageLoaded;
        break;
      case NettingSchedulePageRefreshed.Type:
        draft.lastUpdated = new Date();
        break;
      case NettingScheduleClearPageError.Type:
        draft.pageError = null;
        break;
      case NettingScheduleClearPageSuccess.Type:
        draft.pageSuccess = null;
        break;
      case NettingScheduleEditOpen.Type:
        draft.commitMessage = null;
        draft.commitError = null;
        draft.editing = true;
        break;
      case NettingScheduleEditClose.Type:
        draft.editing = false;
        break;
      case NettingScheduleFetch.Type:
        draft.commitError = null;
        draft.commitMessage = null;
        draft.pageError = null;
        break;
      case NettingScheduleFetchResult.Type:
        draft.progress = action.inProgressState.progress;
        draft.inProgressMessage = action.inProgressState.inProgressMessage;
        draft.schedule = { ...action.schedule };
        draft.lastUpdated = new Date();
        draft.pageError = null;
        break;
      case NettingScheduleFetchError.Type:
        draft.pageError =
          'Sorry, there was an unexpected error. We are currently trying to fix the problem. In the meantime, you can refresh the page or contact the administrator.'; // action.error;
        draft.lastUpdated = new Date();
        break;
      case NettingScheduleRun.Type:
        draft.pageError = null;
        draft.progress = true;
        draft.inProgressMessage = "Intraday Netting currently in progress."
        break;
      case NettingScheduleRunResult.Type:
        draft.progress = false;
        break;
      case NettingScheduleRunError.Type:
        draft.pageError =
          'Sorry, there was an unexpected error. We are currently trying to fix the problem. In the meantime, you can refresh the page or contact the administrator.'; // action.error;
        draft.progress = false;
        break;
      case NettingScheduleSubmit.Type:
      case NettingScheduleToggle.Type:
        draft.commitMessage = null;
        draft.commitError = null;
        break;
      case NettingScheduleSubmitResult.Type:
      case NettingScheduleToggleResult.Type:
        draft.schedule = { ...action.schedule };
        draft.commitMessage = 'Schedule successfully updated.';
        draft.editing = false;
        break;
      case NettingScheduleSubmitError.Type:
      case NettingScheduleToggleError.Type:
        draft.commitError = action.error;
        break;
      case NettingScheduleClearCommitMessage.Type:
        draft.commitMessage = null;
        break;
    }
  });
}
