import { reducer as authReducer } from './shell.reducer';
import * as Actions from '../actions/shell.actions';
import { IShellState } from '../../types';

describe('ShellReducer', () => {
  const STATE: IShellState = {
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

  it('testing default state', () => {
    const state = authReducer(undefined, { type: 'init' } as any);
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
    });
  });

  it('testing ShellLayoutLoaded reducer', () => {
    const mockedDate = new Date();
    jasmine.clock().mockDate(mockedDate);
    const state = authReducer(undefined, new Actions.ShellLayoutLoaded());
    expect(state).toBeTruthy();
    expect(state.loadedAt).toEqual(mockedDate);
  });

  it('testing ScheduleIntervalFetchResult reducer', () => {
    const state = authReducer(
      undefined,
      new Actions.ScheduleIntervalFetchResult({
        netting: 'netting',
        security: 'security',
        cash: 'cash',
        start: 'start',
        end: 'end'
      })
    );
    expect(state).toBeTruthy();
    expect(state.schedule).toEqual({
      netting: 'netting',
      security: 'security',
      cash: 'cash',
      start: 'start',
      end: 'end',
      error: null,
    });
  });

  it('testing ShellParticipantSwitched reducer', () => {
    const state = authReducer(
      undefined,
      new Actions.ShellParticipantSwitched('00005208', null)
    );
    expect(state).toBeTruthy();
    expect(state.participant).toBe('00005208');
  });

  it('testing ScheduleIntervalFetchError reducer', () => {
    const state = authReducer(
      undefined,
      new Actions.ScheduleIntervalFetchError('error')
    );
    expect(state).toBeTruthy();
    expect(state.schedule.error).toBe('error');
  });

  it('testing ScheduleIntervalFetch reducer', () => {
    const state = authReducer(
      {
        ...STATE,
        schedule: {
          ...STATE.schedule,
          error: 'has error',
        },
      },
      new Actions.ScheduleIntervalFetch()
    );
    expect(state).toBeTruthy();
    expect(state.schedule.error).toBeNull();
  });
});
