import { reducer as securityReducer } from './security.reducer';
import * as Actions from '../actions/security.actions';
import { ISecurityState } from '../../types';

describe('SecurityReducer', () => {
  const STATE: ISecurityState = {
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
    const state = securityReducer(undefined, { type: 'init' } as any);
    expect(state).toBeTruthy();
    expect(state).toEqual({ ...STATE });
  });

  it('testing SecurityScheduleEditOpen reducer', () => {
    const state = securityReducer(
      {
        ...STATE,
        commitMessage: 'commitMessage',
        commitError: 'commitError',
      },
      new Actions.SecurityScheduleEditOpen()
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      editing: true,
    });
  });

  it('testing SecurityScheduleEditClose reducer', () => {
    const state = securityReducer(
      {
        ...STATE,
        editing: true,
      },
      new Actions.SecurityScheduleEditClose()
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      editing: false,
    });
  });

  it('testing SecurityScheduleFetch reducer', () => {
    const state = securityReducer(
      {
        ...STATE,
        commitMessage: 'commitMessage',
        commitError: 'commitError',
      },
      new Actions.SecurityScheduleFetch()
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      commitMessage: null,
      commitError: null,
    });
  });

  it('testing SecurityScheduleFetchResult progress reducer', () => {
    const mockedDate = new Date();
    jasmine.clock().mockDate(mockedDate);
    const state = securityReducer(
      {
        ...STATE,
        progress: false,
      },
      new Actions.SecurityScheduleFetchResult(
        {
          progress: true,
          inProgressMessage: null
        },
        {
          scheduleType: 'SecuritiesSettlement',
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
        scheduleType: 'SecuritiesSettlement',
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

  it('testing SecurityScheduleFetchResult no progress reducer', () => {
    const mockedDate = new Date();
    jasmine.clock().mockDate(mockedDate);
    const state = securityReducer(
      {
        ...STATE,
        progress: false,
      },
      new Actions.SecurityScheduleFetchResult(
        {
          progress: false,
          inProgressMessage: null
        },
        {
          scheduleType: 'SecuritiesSettlement',
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
        scheduleType: 'SecuritiesSettlement',
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

  it('testing SecurityScheduleFetchError no progress reducer', () => {
    const mockedDate = new Date();
    jasmine.clock().mockDate(mockedDate);
    const state = securityReducer(
      {
        ...STATE,
        pageError: 'pageError',
      },
      new Actions.SecurityScheduleFetchError('fetch pageError')
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      lastUpdated: mockedDate,
      pageError: 'Sorry, there was an unexpected error. We are currently trying to fix the problem. In the meantime, you can refresh the page or contact the administrator.',
    });
  });

  it('testing SecurityScheduleRun reducer', () => {
    const state = securityReducer(
      {
        ...STATE,
        pageError: 'some error',
      },
      new Actions.SecurityScheduleRun()
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      pageError: null,
      progress: true,
      inProgressMessage: 'Intraday Security Settlement currently in progress.'
    });
  });

  it('testing SecurityScheduleRunResult reducer', () => {
    const state = securityReducer(
      {
        ...STATE,
        progress: true,
      },
      new Actions.SecurityScheduleRunResult('success message')
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      progress: false,
    });
  });

  it('testing SecurityScheduleRunError reducer', () => {
    const state = securityReducer(
      {
        ...STATE,
        progress: true,
        pageError: 'some error',
      },
      new Actions.SecurityScheduleRunError('pageError message')
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      progress: false,
      pageError: 'Sorry, there was an unexpected error. We are currently trying to fix the problem. In the meantime, you can refresh the page or contact the administrator.',
    });
  });

  it('testing SecurityScheduleSettlementDateChange reducer', () => {
    const state = securityReducer(
      {
        ...STATE,
        settlementDate: null,
      },
      new Actions.SecurityScheduleSettlementDateChange('2020-12-20')
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      settlementDate: '2020-12-20',
    });
  });

  it('testing SecurityScheduleSubmit reducer', () => {
    const state = securityReducer(
      {
        ...STATE,
        commitMessage: 'commitMessage',
        commitError: 'commitError',
      },
      new Actions.SecurityScheduleSubmit({
        scheduleType: 'SecuritiesSettlement',
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

  it('testing SecurityScheduleToggle reducer', () => {
    const state = securityReducer(
      {
        ...STATE,
        commitMessage: 'commitMessage',
        commitError: 'commitError',
      },
      new Actions.SecurityScheduleToggle(true)
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      commitMessage: null,
      commitError: null,
    });
  });

  it('testing SecurityScheduleSubmitResult reducer', () => {
    const state = securityReducer(
      {
        ...STATE,
        editing: true,
        commitMessage: 'commitMessage',
      },
      new Actions.SecurityScheduleSubmitResult({
        scheduleType: 'SecuritiesSettlement',
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
        scheduleType: 'SecuritiesSettlement',
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

  it('testing SecurityScheduleToggleResult reducer', () => {
    const state = securityReducer(
      {
        ...STATE,
        editing: true,
        commitMessage: 'commitMessage',
      },
      new Actions.SecurityScheduleToggleResult({
        scheduleType: 'SecuritiesSettlement',
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
        scheduleType: 'SecuritiesSettlement',
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

  it('testing SecurityScheduleSubmitError reducer', () => {
    const state = securityReducer(
      {
        ...STATE,
        commitError: null,
      },
      new Actions.SecurityScheduleSubmitError('submit pageError')
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      commitError: 'submit pageError',
    });
  });

  it('testing SecurityScheduleToggleError reducer', () => {
    const state = securityReducer(
      {
        ...STATE,
        commitError: null,
      },
      new Actions.SecurityScheduleToggleError('submit pageError')
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      commitError: 'submit pageError',
    });
  });

  it('testing SecurityScheduleClearPageError reducer', () => {
    const state = securityReducer(
      {
        ...STATE,
        pageError: 'page error',
      },
      new Actions.SecurityScheduleClearPageError()
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      pageError: null,
    });
  });

  it('testing SecuritySchedulePageLoaded reducer', () => {
    const mockedDate = new Date();
    jasmine.clock().mockDate(mockedDate);
    const state = securityReducer(
      {
        ...STATE,
        initialLoaded: null,
        pageLoaded: null,
      },
      new Actions.SecuritySchedulePageLoaded()
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      initialLoaded: mockedDate,
      pageLoaded: mockedDate,
    });
  });

  it('testing SecuritySchedulePageLoaded existing reducer', () => {
    const mockedDate = new Date();
    jasmine.clock().mockDate(mockedDate);
    const state = securityReducer(
      {
        ...STATE,
        initialLoaded: new Date('12/10/2020'),
        pageLoaded: null,
      },
      new Actions.SecuritySchedulePageLoaded()
    );
    expect(state).toBeTruthy();
    expect(state).toEqual({
      ...STATE,
      initialLoaded: new Date('12/10/2020'),
      pageLoaded: mockedDate,
    });
  });
});
