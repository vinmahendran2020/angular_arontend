import { IDashboardState } from '../../types';
import * as selectors from './obligation.selectors';

describe('ObligationSelector', () => {
  it('testing obligation state selector', () => {
    const state = selectors.selectObligationState({
      dashboard: {
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
      },
    } as { dashboard: IDashboardState });
    expect(state).toBeTruthy();
    expect(state.summary).toEqual({
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
    });
    expect(state.form).toEqual({
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
    });
    expect(state.selection).toEqual({
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
    });
    expect(state.dialog).toEqual({
      cusip: false,
    });
  });

  it('testing selectObligationSummary selector', () => {
    const summary = selectors.selectObligationSummary({
      dashboard: {
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
      },
    } as { dashboard: IDashboardState });
    expect(summary).toEqual({
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
    });
  });

  it('testing selectObligationSelection selector', () => {
    const selection = selectors.selectObligationSelection({
      dashboard: {
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
      },
    } as { dashboard: IDashboardState });
    expect(selection).toEqual({
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
    });
  });

  it('testing selectObligationForm selector', () => {
    const form = selectors.selectObligationForm({
      dashboard: {
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
      },
    } as { dashboard: IDashboardState });
    expect(form).toEqual({
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
    });
  });

  it('testing selectObligationParticipantId selector', () => {
    const participantId = selectors.selectObligationParticipantId({
      dashboard: {
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
      },
    } as { dashboard: IDashboardState });
    expect(participantId).toBe('1');
  });

  it('testing selectObligationParticipantError selector', () => {
    const participantIdError = selectors.selectObligationParticipantIdError({
      dashboard: {
        obligation: {
          form: {
            participantId: {
              type: 'string',
              editable: true,
              touched: false,
              value: '1',
              error: 'error',
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
      },
    } as { dashboard: IDashboardState });
    expect(participantIdError).toBe('error');
  });

  it('testing selectObligationFormDisabled selector', () => {
    const formDisabled = selectors.selectObligationFormDisabled({
      dashboard: {
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
      },
    } as { dashboard: IDashboardState });
    expect(formDisabled).toBe(false);
  });

  it('testing selectObligationSelectedItemId selector', () => {
    const itemId = selectors.selectObligationSelectedItemId({
      dashboard: {
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
      },
    } as { dashboard: IDashboardState });
    expect(itemId).toBe('2');
  });

  it('testing selectObligationTradesVisible selector', () => {
    const tradesVisible = selectors.selectObligationTradesVisible({
      dashboard: {
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
      },
    } as { dashboard: IDashboardState });
    expect(tradesVisible).toBe(true);
  });

  it('testing selectObligationSelectedPendingId selector', () => {
    const pendingId = selectors.selectObligationSelectedPendingId({
      dashboard: {
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
      },
    } as { dashboard: IDashboardState });
    expect(pendingId).toBe('3');
  });

  it('testing selectObligationTransactionsVisible selector', () => {
    const transactionsVisible = selectors.selectObligationTransactionsVisible({
      dashboard: {
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
      },
    } as { dashboard: IDashboardState });
    expect(transactionsVisible).toBe(true);
  });

  it('testing selectObligationTrades selector', () => {
    const trades = selectors.selectObligationTrades({
      dashboard: {
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
      },
    } as { dashboard: IDashboardState });
    expect(trades).toEqual([
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
    ]);
  });

  it('testing selectObligationSelectedItem selector', () => {
    const item = selectors.selectObligationSelectedItem({
      dashboard: {
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
                netObligationId: '2',
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
                netObligationId: '3',
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
      },
    } as { dashboard: IDashboardState });
    expect(item).toEqual({
      netObligationId: '2',
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
    });
  });

  it('testing selectObligationSelectedItem empty selector', () => {
    const item = selectors.selectObligationSelectedItem({
      dashboard: {
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
            transactions: [],
            trades: [],
          },
          summary: {
            cusip: '100',
            sortBy: undefined,
            longs: null,
            shorts: null,
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
      },
    } as { dashboard: IDashboardState });
    expect(item).toBeUndefined();
  });

  it('testing selectObligationSelectedItem empty summary selector', () => {
    const item = selectors.selectObligationSelectedItem({
      dashboard: {
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
            transactions: [],
            trades: [],
          },
          summary: null,
          dialog: {
            cusip: false,
          },
          lastUpdated: null,
          initialLoaded: null,
          pageLoaded: null,
          pageError: null,
          pageSuccess: null,
        },
      },
    } as { dashboard: IDashboardState });
    expect(item).toBeUndefined();
  });

  it('testing selectObligationTransactions selector', () => {
    const trnsactions = selectors.selectObligationTransactions({
      dashboard: {
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
      },
    } as { dashboard: IDashboardState });
    expect(trnsactions).toEqual([
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
    ]);
  });

  it('testing selectObligationSelectedPending selector', () => {
    const pending = selectors.selectObligationSelectedPending({
      dashboard: {
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
                netObligationId: '2',
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
                netObligationId: '3',
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
      },
    } as { dashboard: IDashboardState });
    expect(pending).toEqual({
      netObligationId: '3',
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
    });
  });

  it('testing selectObligationSelectedPending empty selector', () => {
    const pending = selectors.selectObligationSelectedPending({
      dashboard: {
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
            transactions: [],
            trades: [],
          },
          summary: {
            cusip: '100',
            sortBy: undefined,
            longs: null,
            shorts: null,
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
      },
    } as { dashboard: IDashboardState });
    expect(pending).toBeUndefined();
  });

  it('testing selectObligationSelectedPending empty summary selector', () => {
    const pending = selectors.selectObligationSelectedPending({
      dashboard: {
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
            transactions: [],
            trades: [],
          },
          summary: null,
          dialog: {
            cusip: false,
          },
          lastUpdated: null,
          initialLoaded: null,
          pageLoaded: null,
          pageError: null,
          pageSuccess: null,
        },
      },
    } as { dashboard: IDashboardState });
    expect(pending).toBeUndefined();
  });

  it('testing selectObligationDialog selector', () => {
    const dialog = selectors.selectObligationDialog({
      dashboard: {
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
      },
    } as { dashboard: IDashboardState });
    expect(dialog).toEqual({
      cusip: false,
    });
  });

  it('testing selectObligationCusipSearch selector', () => {
    const cusip = selectors.selectObligationCusipSearch({
      dashboard: {
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
            cusip: true,
          },
          lastUpdated: null,
          initialLoaded: null,
          pageLoaded: null,
          pageError: null,
          pageSuccess: null,
        },
      },
    } as { dashboard: IDashboardState });
    expect(cusip).toBe(true);
  });

  it('testing selectObligationCusip selector', () => {
    const cusip = selectors.selectObligationCusip({
      dashboard: {
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
            cusip: true,
          },
          lastUpdated: null,
          initialLoaded: null,
          pageLoaded: null,
          pageError: null,
          pageSuccess: null,
        },
      },
    } as { dashboard: IDashboardState });
    expect(cusip).toBe('100');
  });

  it('testing selectObligationCusip empty summary selector', () => {
    const cusip = selectors.selectObligationCusip({
      dashboard: {
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
          summary: null,
          dialog: {
            cusip: true,
          },
          lastUpdated: null,
          initialLoaded: null,
          pageLoaded: null,
          pageError: null,
          pageSuccess: null,
        },
      },
    } as { dashboard: IDashboardState });
    expect(cusip).toBeUndefined();
  });

  it('testing selectFilteredObligationLong empty summary selector', () => {
    const longs = selectors.selectFilteredObligationLong({
      dashboard: {
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
          summary: null,
          dialog: {
            cusip: true,
          },
          lastUpdated: null,
          initialLoaded: null,
          pageLoaded: null,
          pageError: null,
          pageSuccess: null,
        },
      },
    } as { dashboard: IDashboardState });
    expect(longs).toEqual([]);
  });

  it('testing selectFilteredObligationLong selector', () => {
    const longs = selectors.selectFilteredObligationLong({
      dashboard: {
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
                cusip: '100',
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
                cusip: '100',
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
            cusip: true,
          },
          lastUpdated: null,
          initialLoaded: null,
          pageLoaded: null,
          pageError: null,
          pageSuccess: null,
        },
      },
    } as { dashboard: IDashboardState });
    expect(longs.length).toBe(1);
    expect(longs[0]).toEqual({
      netObligationId: '',
      securityName: '',
      cusip: '100',
      ticker: '',
      isin: '',
      netQuantity: 100,
      netTradeAmount: 200,
      settlementValue: 300,
      settlementDate: '',
      closePrice: 400,
      settlementStatus: '',
    });
  });

  it('testing selectFilteredObligationShort empty summary selector', () => {
    const shorts = selectors.selectFilteredObligationShort({
      dashboard: {
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
          summary: null,
          dialog: {
            cusip: true,
          },
          lastUpdated: null,
          initialLoaded: null,
          pageLoaded: null,
          pageError: null,
          pageSuccess: null,
        },
      },
    } as { dashboard: IDashboardState });
    expect(shorts).toEqual([]);
  });

  it('testing selectFilteredObligationShort selector', () => {
    const shorts = selectors.selectFilteredObligationShort({
      dashboard: {
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
                cusip: '100',
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
                cusip: '100',
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
            cusip: true,
          },
          lastUpdated: null,
          initialLoaded: null,
          pageLoaded: null,
          pageError: null,
          pageSuccess: null,
        },
      },
    } as { dashboard: IDashboardState });
    expect(shorts.length).toBe(1);
    expect(shorts[0]).toEqual({
      netObligationId: '',
      securityName: '',
      cusip: '100',
      ticker: '',
      isin: '',
      netQuantity: 100,
      netTradeAmount: 200,
      settlementValue: 300,
      settlementDate: '',
      closePrice: 400,
      settlementStatus: '',
    });
  });

  it('testing selectObligationLastUpdated selector', () => {
    const lastUpdated = selectors.selectObligationLastUpdated({
      dashboard: {
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
          summary: null,
          lastUpdated: new Date('12/10/2020'),
          initialLoaded: null,
          pageLoaded: null,
          pageError: null,
          pageSuccess: null,
        },
      },
    } as { dashboard: IDashboardState });
    expect(lastUpdated).toEqual(new Date('12/10/2020'));
  });
});
