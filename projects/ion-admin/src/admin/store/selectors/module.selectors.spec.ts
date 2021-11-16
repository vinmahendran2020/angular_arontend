import { IAdminState, IRouterState } from '../../types';
import * as selectors from './module.selectors';

describe('ModuleSelector', () => {
  it('testing state selector', () => {
    const state = selectors.selectAdminState({
      admin: {
        netting: {
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
          lastUpdated: new Date('2020-12-30T12:09:48.887Z'),
          initialLoaded: null,
          pageLoaded: null,
          editing: false,
          commitMessage: '',
          commitError: '',
          pageError: null,
          pageSuccess: null,
        },
        security: {
          progress: true,
          inProgressMessage: null,
          settlementDate: null,
          schedule: {
            scheduleType: 'SecuritiesSettlement',
            startTime: '7:00PM',
            endTime: '10:00PM',
            timezone: 'IST',
            hours: 0,
            minutes: 0,
            status: 'ACTIVE',
          },
          lastUpdated: new Date('2020-12-30T12:10:18.628Z'),
          initialLoaded: null,
          pageLoaded: null,
          editing: false,
          commitMessage: '',
          commitError: '',
          pageError: null,
          pageSuccess: null,
        },
        cash: {
          progress: true,
          inProgressMessage: null,
          settlementDate: null,
          schedule: {
            scheduleType: 'Cash',
            startTime: '5:00AM',
            endTime: '9:00PM',
            timezone: 'US/Hawaii',
            hours: 2,
            minutes: 40,
            status: 'ACTIVE',
          },
          lastUpdated: new Date('2020-12-30T12:09:40.592Z'),
          initialLoaded: null,
          pageLoaded: null,
          editing: false,
          commitMessage: '',
          commitError: '',
          pageError: null,
          pageSuccess: null,
        },
      },
    } as { admin: IAdminState });
    expect(state).toBeTruthy();
    expect(state.cash).toEqual({
      progress: true,
      inProgressMessage: null,
      settlementDate: null,
      schedule: {
        scheduleType: 'Cash',
        startTime: '5:00AM',
        endTime: '9:00PM',
        timezone: 'US/Hawaii',
        hours: 2,
        minutes: 40,
        status: 'ACTIVE',
      },
      lastUpdated: new Date('2020-12-30T12:09:40.592Z'),
      initialLoaded: null,
      pageLoaded: null,
      editing: false,
      commitMessage: '',
      commitError: '',
      pageError: null,
      pageSuccess: null,
    });
    expect(state.security).toEqual({
      progress: true,
      inProgressMessage: null,
      settlementDate: null,
      schedule: {
        scheduleType: 'SecuritiesSettlement',
        startTime: '7:00PM',
        endTime: '10:00PM',
        timezone: 'IST',
        hours: 0,
        minutes: 0,
        status: 'ACTIVE',
      },
      lastUpdated: new Date('2020-12-30T12:10:18.628Z'),
      initialLoaded: null,
      pageLoaded: null,
      editing: false,
      commitMessage: '',
      commitError: '',
      pageError: null,
      pageSuccess: null,
    });
    expect(state.netting).toEqual({
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
      lastUpdated: new Date('2020-12-30T12:09:48.887Z'),
      initialLoaded: null,
      pageLoaded: null,
      editing: false,
      commitMessage: '',
      commitError: '',
      pageError: null,
      pageSuccess: null,
    });
  });

  it('testing selectRouterState selector', () => {
    const router = selectors.selectRouterState({
      router: {
        state: {
          root: {
            params: {},
            data: {},
            url: [],
            outlet: 'primary',
            routeConfig: null,
            queryParams: {},
            firstChild: null,
            children: [],
          },
          url: '/admin/cash',
        },
        navigationId: 6,
      },
    } as { router: IRouterState });
    expect(router).toEqual({
      state: {
        root: {
          params: {},
          data: {},
          url: [],
          outlet: 'primary',
          routeConfig: null,
          queryParams: {},
          firstChild: null,
          children: [],
        },
        url: '/admin/cash',
      },
      navigationId: 6,
    });
  });

  it('testing selectUrl selector', () => {
    const url = selectors.selectUrl({
      router: {
        state: {
          root: {
            params: {},
            data: {},
            url: [],
            outlet: 'primary',
            routeConfig: null,
            queryParams: {},
            firstChild: null,
            children: [],
          },
          url: '/admin/cash',
        },
        navigationId: 6,
      },
    } as { router: IRouterState });
    expect(url).toBe('/admin/cash');
  });

  it('testing selectUrl selector', () => {
    const url = selectors.selectUrl({
      router: {
        state: {
          root: {
            params: {},
            data: {},
            url: [],
            outlet: 'primary',
            routeConfig: null,
            queryParams: {},
            firstChild: null,
            children: [],
          },
          url: '/admin/security',
        },
        navigationId: 6,
      },
    } as { router: IRouterState });
    expect(url).toBe('/admin/security');
  });

  it('testing selectCurrentTab netting selector', () => {
    const currentTab = selectors.selectCurrentTab({
      router: {
        state: {
          root: {
            params: {},
            data: {},
            url: [],
            outlet: 'primary',
            routeConfig: null,
            queryParams: {},
            firstChild: null,
            children: [],
          },
          url: '/admin/netting',
        },
        navigationId: 6,
      },
    } as { router: IRouterState });
    expect(currentTab).toBe('netting');
  });

  it('testing selectCurrentTab cash selector', () => {
    const currentTab = selectors.selectCurrentTab({
      router: {
        state: {
          root: {
            params: {},
            data: {},
            url: [],
            outlet: 'primary',
            routeConfig: null,
            queryParams: {},
            firstChild: null,
            children: [],
          },
          url: '/admin/cash',
        },
        navigationId: 6,
      },
    } as { router: IRouterState });
    expect(currentTab).toBe('cash');
  });

  it('testing selectCurrentTab security selector', () => {
    const currentTab = selectors.selectCurrentTab({
      router: {
        state: {
          root: {
            params: {},
            data: {},
            url: [],
            outlet: 'primary',
            routeConfig: null,
            queryParams: {},
            firstChild: null,
            children: [],
          },
          url: '/admin/security',
        },
        navigationId: 6,
      },
    } as { router: IRouterState });
    expect(currentTab).toBe('security');
  });

  it('testing selectCurrentTab none selector', () => {
    const currentTab = selectors.selectCurrentTab({
      router: {
        state: {
          root: {
            params: {},
            data: {},
            url: [],
            outlet: 'primary',
            routeConfig: null,
            queryParams: {},
            firstChild: null,
            children: [],
          },
          url: null,
        },
        navigationId: 6,
      },
    } as { router: IRouterState });
    expect(currentTab).toBe('none');
  });
});
