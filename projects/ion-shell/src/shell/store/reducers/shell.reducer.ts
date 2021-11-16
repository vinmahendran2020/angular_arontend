import produce from 'immer';

import {
  ShellLayoutLoaded,
  ScheduleIntervalFetch,
  ScheduleIntervalFetchResult,
  ScheduleIntervalFetchError,
  ShellParticipantSwitched,
} from '../actions/shell.actions';

import { IShellState } from '../../types';

export const initialState: IShellState = {
  loadedAt: null,
  participant: null,
  schedule: {
    netting: null,
    cash: null,
    security: null,
    start: null,
    end: null,
    error: null,
  },
};

export function reducer(
  state: IShellState = initialState,
  action:
    | ShellLayoutLoaded
    | ShellParticipantSwitched
    | ScheduleIntervalFetch
    | ScheduleIntervalFetchResult
    | ScheduleIntervalFetchError
): IShellState {
  return produce(state, (draft) => {
    switch (action.type) {
      case ShellLayoutLoaded.Type:
        draft.loadedAt = new Date();
        break;
      case ShellParticipantSwitched.Type:
        draft.participant = action.current;
        break;
      case ScheduleIntervalFetch.Type:
        draft.schedule.error = null;
        break;
      case ScheduleIntervalFetchResult.Type:
        draft.schedule.cash = action.schedule.cash;
        draft.schedule.netting = action.schedule.netting;
        draft.schedule.security = action.schedule.security;
        draft.schedule.start = action.schedule.start;
        draft.schedule.end = action.schedule.end;
        break;
      case ScheduleIntervalFetchError.Type:
        draft.schedule.cash = null;
        draft.schedule.netting = null;
        draft.schedule.security = null;
        draft.schedule.start = null;
        draft.schedule.end = null;
        draft.schedule.error = action.error;
        break;
    }
  });
}
