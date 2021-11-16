import { reducer as nettingReducer } from './netting.reducer';
import * as Actions from '../actions/netting.actions';
import { INettingState } from '../../types';

describe('NettingReducer', () => {
  const STATE: INettingState = {
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

  it('testing default state', () => {
    const state = nettingReducer(undefined, { type: 'init' } as any);
    expect(state).toBeTruthy();
    expect(state).toEqual({ ...STATE });
  });

  it('testing NettingScheduleEditOpen reducer', () => {
    const state = nettingReducer(
      {
        ...STATE,
        commitMessage: 'commitMessage',
        commitError: 'commitError',
      },
      new Actions.NettingScheduleEditOpen()
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      editing: true,
    });
  });

  it('testing NettingScheduleEditClose reducer', () => {
    const state = nettingReducer(
      {
        ...STATE,
        editing: true,
      },
      new Actions.NettingScheduleEditClose()
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      editing: false,
    });
  });

  it('testing NettingScheduleFetch reducer', () => {
    const state = nettingReducer(
      {
        ...STATE,
        commitMessage: 'commitMessage',
        commitError: 'commitError',
      },
      new Actions.NettingScheduleFetch()
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      commitMessage: null,
      commitError: null,
    });
  });

  it('testing NettingScheduleFetchResult progress reducer', () => {
    const mockedDate = new Date();
    jasmine.clock().mockDate(mockedDate);
    const state = nettingReducer(
      {
        ...STATE,
        progress: false,
      },
      new Actions.NettingScheduleFetchResult(
        {
          progress: true,
          inProgressMessage: null
        },
        {
          scheduleType: 'Netting',
          startTime: '7:00AM',
          endTime: '11:00AM',
          timezone: 'US/Hawaii',
          hours: 4,
          minutes: 30,
          status: 'ACTIVE',
        }
      )
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      progress: true,
      inProgressMessage: null,
      schedule: {
        scheduleType: 'Netting',
        startTime: '7:00AM',
        endTime: '11:00AM',
        timezone: 'US/Hawaii',
        hours: 4,
        minutes: 30,
        status: 'ACTIVE',
      },
      lastUpdated: mockedDate,
    });
  });

  it('testing NettingScheduleFetchResult no progress reducer', () => {
    const mockedDate = new Date();
    jasmine.clock().mockDate(mockedDate);
    const state = nettingReducer(
      {
        ...STATE,
        progress: false,
      },
      new Actions.NettingScheduleFetchResult(
        {
          progress: false,
          inProgressMessage: null
        },
        {
          scheduleType: 'Netting',
          startTime: '7:00AM',
          endTime: '11:00AM',
          timezone: 'US/Hawaii',
          hours: 4,
          minutes: 30,
          status: 'ACTIVE',
        }
      )
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      progress: false,
      inProgressMessage: null,
      schedule: {
        scheduleType: 'Netting',
        startTime: '7:00AM',
        endTime: '11:00AM',
        timezone: 'US/Hawaii',
        hours: 4,
        minutes: 30,
        status: 'ACTIVE',
      },
      lastUpdated: mockedDate,
    });
  });

  it('testing NettingScheduleFetchError no progress reducer', () => {
    const mockedDate = new Date();
    jasmine.clock().mockDate(mockedDate);
    const state = nettingReducer(
      {
        ...STATE,
        pageError: 'pageError',
      },
      new Actions.NettingScheduleFetchError('fetch pageError')
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      lastUpdated: mockedDate,
      pageError: 'Sorry, there was an unexpected error. We are currently trying to fix the problem. In the meantime, you can refresh the page or contact the administrator.',
    });
  });

  it('testing NettingScheduleRun reducer', () => {
    const state = nettingReducer(
      {
        ...STATE,
        pageError: 'some error',
      },
      new Actions.NettingScheduleRun()
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      pageError: null,
      progress: true,
      inProgressMessage: 'Intraday Netting currently in progress.'
    });
  });

  it('testing NettingScheduleRunResult reducer', () => {
    const state = nettingReducer(
      {
        ...STATE,
        progress: true,
      },
      new Actions.NettingScheduleRunResult('success message')
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      progress: false,
    });
  });

  it('testing NettingScheduleRunError reducer', () => {
    const state = nettingReducer(
      {
        ...STATE,
        progress: true,
        pageError: 'some error',
      },
      new Actions.NettingScheduleRunError('pageError message')
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      progress: false,
      pageError: 'Sorry, there was an unexpected error. We are currently trying to fix the problem. In the meantime, you can refresh the page or contact the administrator.',
    });
  });

  it('testing NettingScheduleSubmit reducer', () => {
    const state = nettingReducer(
      {
        ...STATE,
        commitMessage: 'commitMessage',
        commitError: 'commitError',
      },
      new Actions.NettingScheduleSubmit({
        scheduleType: 'Netting',
        startTime: '7:00AM',
        endTime: '11:00AM',
        timezone: 'US/Hawaii',
        hours: 4,
        minutes: 30,
        status: 'ACTIVE',
      })
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      commitMessage: null,
      commitError: null,
    });
  });

  it('testing NettingScheduleToggle reducer', () => {
    const state = nettingReducer(
      {
        ...STATE,
        commitMessage: 'commitMessage',
        commitError: 'commitError',
      },
      new Actions.NettingScheduleToggle(true)
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      commitMessage: null,
      commitError: null,
    });
  });

  it('testing NettingScheduleSubmitResult reducer', () => {
    const state = nettingReducer(
      {
        ...STATE,
        editing: true,
        commitMessage: 'commitMessage',
      },
      new Actions.NettingScheduleSubmitResult({
        scheduleType: 'Netting',
        startTime: '7:00AM',
        endTime: '11:00AM',
        timezone: 'US/Hawaii',
        hours: 4,
        minutes: 30,
        status: 'ACTIVE',
      })
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      schedule: {
        scheduleType: 'Netting',
        startTime: '7:00AM',
        endTime: '11:00AM',
        timezone: 'US/Hawaii',
        hours: 4,
        minutes: 30,
        status: 'ACTIVE',
      },
      editing: false,
      commitMessage: 'Schedule successfully updated.',
    });
  });

  it('testing NettingScheduleToggleResult reducer', () => {
    const state = nettingReducer(
      {
        ...STATE,
        editing: true,
        commitMessage: 'commitMessage',
      },
      new Actions.NettingScheduleToggleResult({
        scheduleType: 'Netting',
        startTime: '7:00AM',
        endTime: '11:00AM',
        timezone: 'US/Hawaii',
        hours: 4,
        minutes: 30,
        status: 'ACTIVE',
      })
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      schedule: {
        scheduleType: 'Netting',
        startTime: '7:00AM',
        endTime: '11:00AM',
        timezone: 'US/Hawaii',
        hours: 4,
        minutes: 30,
        status: 'ACTIVE',
      },
      editing: false,
      commitMessage: 'Schedule successfully updated.',
    });
  });

  it('testing NettingScheduleSubmitError reducer', () => {
    const state = nettingReducer(
      {
        ...STATE,
        commitError: null,
      },
      new Actions.NettingScheduleSubmitError('submit pageError')
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      commitError: 'submit pageError',
    });
  });

  it('testing NettingScheduleToggleError reducer', () => {
    const state = nettingReducer(
      {
        ...STATE,
        commitError: null,
      },
      new Actions.NettingScheduleToggleError('submit pageError')
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      commitError: 'submit pageError',
    });
  });

  it('testing NettingScheduleClearPageError reducer', () => {
    const state = nettingReducer(
      {
        ...STATE,
        pageError: 'page error',
      },
      new Actions.NettingScheduleClearPageError()
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      pageError: null,
    });
  });

  it('testing NettingSchedulePageLoaded reducer', () => {
    const mockedDate = new Date();
    jasmine.clock().mockDate(mockedDate);
    const state = nettingReducer(
      {
        ...STATE,
        initialLoaded: null,
        pageLoaded: null,
      },
      new Actions.NettingSchedulePageLoaded()
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      initialLoaded: mockedDate,
      pageLoaded: mockedDate,
    });
  });

  it('testing NettingSchedulePageLoaded existing reducer', () => {
    const mockedDate = new Date();
    jasmine.clock().mockDate(mockedDate);
    const state = nettingReducer(
      {
        ...STATE,
        initialLoaded: new Date('12/10/2020'),
        pageLoaded: null,
      },
      new Actions.NettingSchedulePageLoaded()
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      initialLoaded: new Date('12/10/2020'),
      pageLoaded: mockedDate,
    });
  });
});
