import { reducer as cashReducer } from './cash.reducer';
import * as Actions from '../actions/cash.actions';
import { ICashState } from '../../types';

describe('CashReducer', () => {
  const STATE: ICashState = {
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

  it('testing default state', () => {
    const state = cashReducer(undefined, { type: 'init' } as any);
    expect(state).toBeTruthy();
    expect(state).toEqual({ ...STATE });
  });

  it('testing CashScheduleEditOpen reducer', () => {
    const state = cashReducer(
      {
        ...STATE,
        commitMessage: 'commitMessage',
        commitError: 'commitError',
      },
      new Actions.CashScheduleEditOpen()
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      editing: true,
    });
  });

  it('testing CashScheduleEditClose reducer', () => {
    const state = cashReducer(
      {
        ...STATE,
        editing: true,
      },
      new Actions.CashScheduleEditClose()
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      editing: false,
    });
  });

  it('testing CashScheduleFetch reducer', () => {
    const state = cashReducer(
      {
        ...STATE,
        commitMessage: 'commitMessage',
        commitError: 'commitError',
      },
      new Actions.CashScheduleFetch()
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      commitMessage: null,
      commitError: null,
    });
  });

  it('testing CashScheduleFetchResult progress reducer', () => {
    const mockedDate = new Date();
    jasmine.clock().mockDate(mockedDate);
    const state = cashReducer(
      {
        ...STATE,
        progress: false,
      },
      new Actions.CashScheduleFetchResult(
        {
          progress: true,
          inProgressMessage: null
        },
        {
          scheduleType: 'Cash',
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
        scheduleType: 'Cash',
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

  it('testing CashScheduleFetchResult no progress reducer', () => {
    const mockedDate = new Date();
    jasmine.clock().mockDate(mockedDate);
    const state = cashReducer(
      {
        ...STATE,
        progress: false,
      },
      new Actions.CashScheduleFetchResult(
        {
          progress: false,
          inProgressMessage: null
        },
        {
          scheduleType: 'Cash',
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
        scheduleType: 'Cash',
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

  it('testing CashScheduleFetchError no progress reducer', () => {
    const mockedDate = new Date();
    jasmine.clock().mockDate(mockedDate);
    const state = cashReducer(
      {
        ...STATE,
        pageError: 'pageError',
      },
      new Actions.CashScheduleFetchError('fetch pageError')
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      lastUpdated: mockedDate,
      pageError: 'Sorry, there was an unexpected error. We are currently trying to fix the problem. In the meantime, you can refresh the page or contact the administrator.',
    });
  });

  it('testing CashScheduleRun reducer', () => {
    const state = cashReducer(
      {
        ...STATE,
        pageError: 'some error',
      },
      new Actions.CashScheduleRun()
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      pageError: null,
      progress: true,
      inProgressMessage: 'Intraday Cash Settlement currently in progress.'
    });
  });

  it('testing CashScheduleRunResult reducer', () => {
    const state = cashReducer(
      {
        ...STATE,
        progress: true,
      },
      new Actions.CashScheduleRunResult('success message')
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      progress: false,
    });
  });

  it('testing CashScheduleRunError reducer', () => {
    const state = cashReducer(
      {
        ...STATE,
        progress: true,
        pageError: 'some error',
      },
      new Actions.CashScheduleRunError('pageError message')
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      progress: false,
      pageError: 'Sorry, there was an unexpected error. We are currently trying to fix the problem. In the meantime, you can refresh the page or contact the administrator.',
    });
  });

  it('testing CashScheduleSettlementDateChange reducer', () => {
    const state = cashReducer(
      {
        ...STATE,
        settlementDate: null,
      },
      new Actions.CashScheduleSettlementDateChange('2020-12-20')
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      settlementDate: '2020-12-20',
    });
  });

  it('testing CashScheduleSubmit reducer', () => {
    const state = cashReducer(
      {
        ...STATE,
        commitMessage: 'commitMessage',
        commitError: 'commitError',
      },
      new Actions.CashScheduleSubmit({
        scheduleType: 'Cash',
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

  it('testing CashScheduleToggle reducer', () => {
    const state = cashReducer(
      {
        ...STATE,
        commitMessage: 'commitMessage',
        commitError: 'commitError',
      },
      new Actions.CashScheduleToggle(true)
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      commitMessage: null,
      commitError: null,
    });
  });

  it('testing CashScheduleSubmitResult reducer', () => {
    const state = cashReducer(
      {
        ...STATE,
        editing: true,
        commitMessage: 'commitMessage',
      },
      new Actions.CashScheduleSubmitResult({
        scheduleType: 'Cash',
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
        scheduleType: 'Cash',
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

  it('testing CashScheduleToggleResult reducer', () => {
    const state = cashReducer(
      {
        ...STATE,
        editing: true,
        commitMessage: 'commitMessage',
      },
      new Actions.CashScheduleToggleResult({
        scheduleType: 'Cash',
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
        scheduleType: 'Cash',
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

  it('testing CashScheduleSubmitError reducer', () => {
    const state = cashReducer(
      {
        ...STATE,
        commitError: null,
      },
      new Actions.CashScheduleSubmitError('submit pageError')
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      commitError: 'submit pageError',
    });
  });

  it('testing CashScheduleToggleError reducer', () => {
    const state = cashReducer(
      {
        ...STATE,
        commitError: null,
      },
      new Actions.CashScheduleToggleError('submit pageError')
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      commitError: 'submit pageError',
    });
  });

  it('testing CashScheduleClearPageError reducer', () => {
    const state = cashReducer(
      {
        ...STATE,
        pageError: 'page error',
      },
      new Actions.CashScheduleClearPageError()
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      pageError: null,
    });
  });

  it('testing CashSchedulePageLoaded reducer', () => {
    const mockedDate = new Date();
    jasmine.clock().mockDate(mockedDate);
    const state = cashReducer(
      {
        ...STATE,
        initialLoaded: null,
        pageLoaded: null,
      },
      new Actions.CashSchedulePageLoaded()
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      initialLoaded: mockedDate,
      pageLoaded: mockedDate,
    });
  });

  it('testing CashSchedulePageLoaded existing reducer', () => {
    const mockedDate = new Date();
    jasmine.clock().mockDate(mockedDate);
    const state = cashReducer(
      {
        ...STATE,
        initialLoaded: new Date('12/10/2020'),
        pageLoaded: null,
      },
      new Actions.CashSchedulePageLoaded()
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      initialLoaded: new Date('12/10/2020'),
      pageLoaded: mockedDate,
    });
  });
});
