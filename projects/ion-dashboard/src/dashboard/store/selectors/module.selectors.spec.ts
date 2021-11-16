import { IDashboardState, IRouterState } from '../../types';
import * as selectors from './module.selectors';

describe('ModuleSelector', () => {
  it('testing state selector', () => {
    const state = selectors.selectDashboardState({
      dashboard: {
        risk: {
          form: {
            participantId: {
              type: 'string',
              editable: true,
              touched: false,
              value: '1',
              error: null,
              async: true,
              validatable: true,
              validated: false,
              validating: false,
            },
            collateralId: {
              type: 'string',
              editable: false,
              touched: false,
              value: '2',
              error: null,
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
          },
          summary: {
            participantId: '100',
            collateralId: '200',
            settlementBalance: 100,
            netDepitCap: 200,
            collateralMonitor: 300,
            sppNetActivity: 400,
            netDirection: 'D',
            valueAtRisk: 100,
          },
          lastUpdated: null,
          initialLoaded: null,
          pageLoaded: null,
          pageError: null,
          pageSuccess: null,
        },
        position: {
          form: {
            participantId: {
              type: 'string',
              editable: true,
              touched: false,
              value: '1',
              error: null,
              async: true,
              validatable: true,
              validated: false,
              validating: false,
            },
            cusip: {
              type: 'string',
              editable: true,
              touched: false,
              value: '3',
              error: null,
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
            date: {
              type: 'string',
              editable: true,
              touched: false,
              value: '12/10/2020',
              error: null,
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
          },
          summary: {
            security: '1',
            ticker: '2',
            cusip: '3',
            netAdditions: 100,
            minimumAmount: 200,
            memoSegregation: 300,
            totalFreeExcess: 400,
            pledged: 500,
            totalPositions: 600,
          },
          dialog: {
            cusip: false,
          },
          lastUpdated: null,
          initialLoaded: null,
          pageLoaded: null,
          pageError: null,
          pageSuccess: null,
        },
        obligation: {
          form: {
            participantId: {
              type: 'string',
              editable: true,
              touched: false,
              value: '1',
              error: null,
              async: true,
              validatable: true,
              validated: false,
              validating: false,
            },
          },
          selection: {
            itemId: '2',
            pendingId: '3',
            transactions: [
              {
                transactionId: '1',
                cusip: '2',
                contra: 100,
                deliverReceiver: '3',
                quantity: 200,
                tradeAmount: 300,
                status: '4',
                activity: '5',
                source: '6',
                reason: '7',
              },
            ],
            trades: [
              {
                tradeId: '1',
                ticker: '2',
                cusip: '3',
                buySell: '4',
                quantity: 100,
                tradePrice: 200,
                tradeAmount: 300,
                settlementDate: '12/10/2020',
                market: 'AAPL',
                tradeDate: '2020-12-01',
              },
            ],
          },
          summary: {
            cusip: '100',
            sortBy: undefined,
            longs: [
              {
                netObligationId: '',
                securityName: '',
                cusip: '',
                ticker: '',
                isin: '',
                netQuantity: 100,
                netTradeAmount: 200,
                settlementValue: 300,
                settlementDate: '',
                closePrice: 400,
                settlementStatus: '',
              },
            ],
            shorts: [
              {
                netObligationId: '',
                securityName: '',
                cusip: '',
                ticker: '',
                isin: '',
                netQuantity: 100,
                netTradeAmount: 200,
                settlementValue: 300,
                settlementDate: '',
                closePrice: 400,
                settlementStatus: '',
              },
            ],
            closed: [
              {
                netObligationId: '',
                securityName: '',
                cusip: '',
                ticker: '',
                isin: '',
                netQuantity: 100,
                netTradeAmount: 200,
                settlementValue: 300,
                settlementDate: '',
                closePrice: 400,
                settlementStatus: '',
              },
            ],
          },
          dialog: {
            cusip: false,
          },
          lastUpdated: null,
          initialLoaded: null,
          pageLoaded: null,
          pageError: null,
          pageSuccess: null,
        },
        cca: {
          form: {
            participantId: {
              type: 'string',
              editable: true,
              touched: false,
              value: '1',
              error: null,
              async: true,
              validatable: true,
              validated: false,
              validating: false,
            },
            settlementDate: {
              type: 'string',
              editable: true,
              touched: false,
              value: ['12/12/2020', '12/14/2020'],
              error: null,
              async: true,
              validatable: true,
              validated: false,
              validating: false,
            },
          },
          summary: {
            participantId: '100',
            adjustments: [
              {
                ccaId: '1',
                settlementDate: '2020-12-01',
                debitCredit: 'Credit',
                netCCAAmount: 100,
                settlementStatus: 'Settled',
              },
              {
                ccaId: '1',
                settlementDate: '2020-12-01',
                debitCredit: 'Credit',
                netCCAAmount: 100,
                settlementStatus: 'Settled',
              },
            ],
          },
          detail: {
            ccaId: '100',
            cusip: '',
            debits: [
              {
                netObligationId: '1',
                cusip: '1',
                ticker: 'ticker',
                ccaAmount: 100,
                netBuySell: '100',
                netQuantity: 100,
                closePrice: 100,
                netTradeAmount: 100,
                netObligationStatus: 'Settled',
                direction: 'D',
              },
            ],
            credits: [
              {
                netObligationId: '1',
                cusip: '1',
                ticker: 'ticker',
                ccaAmount: 100,
                netBuySell: '100',
                netQuantity: 100,
                closePrice: 100,
                netTradeAmount: 100,
                netObligationStatus: 'Settled',
                direction: 'C',
              },
            ],
          },
          lastUpdated: null,
          initialLoaded: null,
          pageLoaded: null,
          pageError: null,
          pageSuccess: null,
        },
      },
    } as { dashboard: IDashboardState });
    expect(state).toBeTruthy();
    expect(state.risk).toEqual({
      form: {
        participantId: {
          type: 'string',
          editable: true,
          touched: false,
          value: '1',
          error: null,
          async: true,
          validatable: true,
          validated: false,
          validating: false,
        },
        collateralId: {
          type: 'string',
          editable: false,
          touched: false,
          value: '2',
          error: null,
          async: false,
          validatable: true,
          validated: true,
          validating: false,
        },
      },
      summary: {
        participantId: '100',
        collateralId: '200',
        settlementBalance: 100,
        netDepitCap: 200,
        collateralMonitor: 300,
        sppNetActivity: 400,
        netDirection: 'D',
        valueAtRisk: 100,
      },
      lastUpdated: null,
      initialLoaded: null,
      pageLoaded: null,
      pageError: null,
      pageSuccess: null,
    });
    expect(state.obligation).toEqual({
      form: {
        participantId: {
          type: 'string',
          editable: true,
          touched: false,
          value: '1',
          error: null,
          async: true,
          validatable: true,
          validated: false,
          validating: false,
        },
      },
      selection: {
        itemId: '2',
        pendingId: '3',
        transactions: [
          {
            transactionId: '1',
            cusip: '2',
            contra: 100,
            deliverReceiver: '3',
            quantity: 200,
            tradeAmount: 300,
            status: '4',
            activity: '5',
            source: '6',
            reason: '7',
          },
        ],
        trades: [
          {
            tradeId: '1',
            ticker: '2',
            cusip: '3',
            buySell: '4',
            quantity: 100,
            tradePrice: 200,
            tradeAmount: 300,
            settlementDate: '12/10/2020',
            market: 'AAPL',
            tradeDate: '2020-12-01',
          },
        ],
      },
      summary: {
        cusip: '100',
        sortBy: undefined,
        longs: [
          {
            netObligationId: '',
            securityName: '',
            cusip: '',
            ticker: '',
            isin: '',
            netQuantity: 100,
            netTradeAmount: 200,
            settlementValue: 300,
            settlementDate: '',
            closePrice: 400,
            settlementStatus: '',
          },
        ],
        shorts: [
          {
            netObligationId: '',
            securityName: '',
            cusip: '',
            ticker: '',
            isin: '',
            netQuantity: 100,
            netTradeAmount: 200,
            settlementValue: 300,
            settlementDate: '',
            closePrice: 400,
            settlementStatus: '',
          },
        ],
        closed: [
          {
            netObligationId: '',
            securityName: '',
            cusip: '',
            ticker: '',
            isin: '',
            netQuantity: 100,
            netTradeAmount: 200,
            settlementValue: 300,
            settlementDate: '',
            closePrice: 400,
            settlementStatus: '',
          },
        ],
      },
      dialog: {
        cusip: false,
      },
      lastUpdated: null,
      initialLoaded: null,
      pageLoaded: null,
      pageError: null,
      pageSuccess: null,
    });
    expect(state.position).toEqual({
      form: {
        participantId: {
          type: 'string',
          editable: true,
          touched: false,
          value: '1',
          error: null,
          async: true,
          validatable: true,
          validated: false,
          validating: false,
        },
        cusip: {
          type: 'string',
          editable: true,
          touched: false,
          value: '3',
          error: null,
          async: false,
          validatable: true,
          validated: true,
          validating: false,
        },
        date: {
          type: 'string',
          editable: true,
          touched: false,
          value: '12/10/2020',
          error: null,
          async: false,
          validatable: true,
          validated: true,
          validating: false,
        },
      },
      summary: {
        security: '1',
        ticker: '2',
        cusip: '3',
        netAdditions: 100,
        minimumAmount: 200,
        memoSegregation: 300,
        totalFreeExcess: 400,
        pledged: 500,
        totalPositions: 600,
      },
      dialog: {
        cusip: false,
      },
      lastUpdated: null,
      initialLoaded: null,
      pageLoaded: null,
      pageError: null,
      pageSuccess: null,
    });
    expect(state.cca).toEqual({
      form: {
        participantId: {
          type: 'string',
          editable: true,
          touched: false,
          value: '1',
          error: null,
          async: true,
          validatable: true,
          validated: false,
          validating: false,
        },
        settlementDate: {
          type: 'string',
          editable: true,
          touched: false,
          value: ['12/12/2020', '12/14/2020'],
          error: null,
          async: true,
          validatable: true,
          validated: false,
          validating: false,
        },
      },
      summary: {
        participantId: '100',
        adjustments: [
          {
            ccaId: '1',
            settlementDate: '2020-12-01',
            debitCredit: 'Credit',
            netCCAAmount: 100,
            settlementStatus: 'Settled',
          },
          {
            ccaId: '1',
            settlementDate: '2020-12-01',
            debitCredit: 'Credit',
            netCCAAmount: 100,
            settlementStatus: 'Settled',
          },
        ],
      },
      detail: {
        ccaId: '100',
        cusip: '',
        debits: [
          {
            netObligationId: '1',
            cusip: '1',
            ticker: 'ticker',
            ccaAmount: 100,
            netBuySell: '100',
            netQuantity: 100,
            closePrice: 100,
            netTradeAmount: 100,
            netObligationStatus: 'Settled',
            direction: 'D',
          },
        ],
        credits: [
          {
            netObligationId: '1',
            cusip: '1',
            ticker: 'ticker',
            ccaAmount: 100,
            netBuySell: '100',
            netQuantity: 100,
            closePrice: 100,
            netTradeAmount: 100,
            netObligationStatus: 'Settled',
            direction: 'C',
          },
        ],
      },
      lastUpdated: null,
      initialLoaded: null,
      pageLoaded: null,
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
          url: '/login',
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
        url: '/login',
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
          url: '/login',
        },
        navigationId: 6,
      },
    } as { router: IRouterState });
    expect(url).toBe('/login');
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
          url: '/login',
        },
        navigationId: 6,
      },
    } as { router: IRouterState });
    expect(url).toBe('/login');
  });

  it('testing selectCurrentTab position selector', () => {
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
          url: '/dashboard/position',
        },
        navigationId: 6,
      },
    } as { router: IRouterState });
    expect(currentTab).toBe('position');
  });

  it('testing selectCurrentTab obligation selector', () => {
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
          url: '/dashboard/obligations',
        },
        navigationId: 6,
      },
    } as { router: IRouterState });
    expect(currentTab).toBe('obligation');
  });

  it('testing selectCurrentTab risk selector', () => {
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
          url: '/dashboard/risk-management',
        },
        navigationId: 6,
      },
    } as { router: IRouterState });
    expect(currentTab).toBe('risk');
  });

  it('testing selectCurrentTab cca selector', () => {
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
          url: '/dashboard/cca',
        },
        navigationId: 6,
      },
    } as { router: IRouterState });
    expect(currentTab).toBe('cca');
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
