import { reducer as obligationReducer } from './obligation.reducer';
import * as Actions from '../actions/obligation.actions';

describe('ObligationReducer', () => {
  it('testing default state', () => {
    const state = obligationReducer(undefined, { type: 'init' } as any);
    expect(state).toBeTruthy();
    expect(state.form).toEqual({
      participantId: {
        type: 'string',
        editable: true,
        touched: false,
        value: null,
        error: null,
        async: true,
        validatable: true,
        validated: false,
        validating: false,
      },
    });
    expect(state.dialog).toEqual({
      cusip: false,
    });
    expect(state.selection).toEqual({
      itemId: null,
      pendingId: null,
      transactions: [],
      trades: [],
    });
    expect(state.summary).toBeNull();
  });

  it('testing ObligationPageLoaded reducer', () => {
    const mockedDate = new Date();
    jasmine.clock().mockDate(mockedDate);
    const state = obligationReducer(
      undefined,
      new Actions.ObligationPageLoaded()
    );
    expect(state).toBeTruthy();
    expect(state.initialLoaded).toEqual(mockedDate);
    expect(state.pageLoaded).toEqual(mockedDate);
  });

  it('testing ObligationParticipantIdChange reducer', () => {
    const state = obligationReducer(
      undefined,
      new Actions.ObligationParticipantIdChange('100', false)
    );
    expect(state).toBeTruthy();
    expect(state.form.participantId.value).toBe('100');
    expect(state.form.participantId.touched).toBeTrue();
    expect(state.form.participantId.validating).toBe(true);
    expect(state.form.participantId.validated).toBe(false);
    expect(state.summary).toBeNull();
  });

  it('testing ObligationParticipantIdFound reducer', () => {
    const state = obligationReducer(
      undefined,
      new Actions.ObligationParticipantIdFound('100', false)
    );
    expect(state).toBeTruthy();
    expect(state.form.participantId.error).toBeNull();
    expect(state.form.participantId.validating).toBe(false);
    expect(state.form.participantId.validated).toBe(true);
    expect(state.summary).toBeNull();
  });

  it('testing ObligationParticipantIdError reducer', () => {
    const state = obligationReducer(
      undefined,
      new Actions.ObligationParticipantIdError('error')
    );
    expect(state).toBeTruthy();
    expect(state.form.participantId.error).toBe('error');
    expect(state.form.participantId.validating).toBe(false);
    expect(state.form.participantId.validated).toBe(false);
    expect(state.summary).toBeNull();
  });

  it('testing ObligationSummarySearch reducer', () => {
    const state = obligationReducer(
      undefined,
      new Actions.ObligationSummarySearch()
    );
    expect(state).toBeTruthy();
    expect(state.summary).toBeNull();
  });

  it('testing ObligationSummaryFound reducer', () => {
    const state = obligationReducer(
      undefined,
      new Actions.ObligationSummaryFound({
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
      })
    );
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
  });

  it('testing ObligationSummaryError reducer', () => {
    let state = obligationReducer(
      undefined,
      new Actions.ObligationSummaryFound({
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
      })
    );
    state = obligationReducer(
      state,
      new Actions.ObligationSummaryError('page error')
    );
    expect(state).toBeTruthy();
    expect(state.form.participantId.error).toBe('page error');
    expect(state.summary).toBeNull();
  });

  it('testing ObligationSummaryServerError reducer', () => {
    let state = obligationReducer(
      undefined,
      new Actions.ObligationSummaryFound({
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
      })
    );
    state = obligationReducer(
      state,
      new Actions.ObligationSummaryServerError('page error')
    );
    expect(state).toBeTruthy();
    expect(state.pageError).toBe(
      'Sorry, there was an unexpected error. We are currently trying to fix the problem. In the meantime, you can refresh the page or contact the administrator.'
    );
    expect(state.summary).toBeNull();
  });

  it('testing ObligationClearPageError reducer', () => {
    let state = obligationReducer(
      undefined,
      new Actions.ObligationSummaryError('page error')
    );
    state = obligationReducer(state, new Actions.ObligationClearPageError());
    expect(state).toBeTruthy();
    expect(state.pageError).toBeNull();
    expect(state.summary).toBeNull();
  });

  it('testing ObligationClearPageSuccess reducer', () => {
    let state = obligationReducer(
      undefined,
      new Actions.ObligationSummaryError('page error')
    );
    state = obligationReducer(
      { ...state, pageSuccess: 'page is success' },
      new Actions.ObligationClearPageSuccess()
    );
    expect(state).toBeTruthy();
    expect(state.pageSuccess).toBeNull();
  });

  it('testing PositionSummaryFound reducer', () => {
    let state = obligationReducer(
      undefined,
      new Actions.ObligationSummaryFound({
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
      })
    );
    state = obligationReducer(
      state,
      new Actions.ObligationParticipantIdChange('100', false)
    );
    state = obligationReducer(state, new Actions.ObligationResetForm());

    expect(state).toBeTruthy();
    expect(state.form).toEqual({
      participantId: {
        type: 'string',
        editable: true,
        touched: false,
        value: null,
        error: null,
        async: true,
        validatable: true,
        validated: false,
        validating: false,
      },
    });
    expect(state.summary).toBeNull();
  });

  it('testing ObligationTradesOpen reducer', () => {
    const state = obligationReducer(
      undefined,
      new Actions.ObligationTradesOpen('100', 'ticker')
    );
    expect(state).toBeTruthy();
    expect(state.selection).toEqual({
      itemId: '100',
      pendingId: null,
      transactions: [],
      trades: [],
    });
  });

  it('testing ObligationTradesClose reducer', () => {
    const state = obligationReducer(
      obligationReducer(
        undefined,
        new Actions.ObligationTradesOpen('100', 'ticker')
      ),
      new Actions.ObligationTradesClose()
    );
    expect(state).toBeTruthy();
    expect(state.selection).toEqual({
      itemId: null,
      pendingId: null,
      transactions: [],
      trades: [],
    });
  });

  it('testing ObligationTradesFetch reducer', () => {
    const state = obligationReducer(
      obligationReducer(undefined, new Actions.ObligationTradesFetch('ticker')),
      new Actions.ObligationTradesFetch('ticker')
    );
    expect(state).toBeTruthy();
    expect(state.selection).toEqual({
      itemId: null,
      pendingId: null,
      transactions: [],
      trades: [],
    });
  });

  it('testing ObligationTradesFound reducer', () => {
    const state = obligationReducer(
      undefined,
      new Actions.ObligationTradesFound([
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
      ])
    );
    expect(state).toBeTruthy();
    expect(state.selection).toEqual({
      itemId: null,
      pendingId: null,
      transactions: [],
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

  it('testing ObligationTradesError reducer', () => {
    let state = obligationReducer(
      undefined,
      new Actions.ObligationTradesFound([
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
      ])
    );
    state = obligationReducer(
      state,
      new Actions.ObligationTradesError('error')
    );
    expect(state).toBeTruthy();
    expect(state.summary).toBeNull();
    expect(state.selection).toEqual({
      itemId: null,
      pendingId: null,
      transactions: [],
      trades: [],
    });
  });

  it('testing ObligationTransactionsOpen reducer', () => {
    const state = obligationReducer(
      undefined,
      new Actions.ObligationTransactionsOpen('100')
    );
    expect(state).toBeTruthy();
    expect(state.selection).toEqual({
      itemId: null,
      pendingId: '100',
      transactions: [],
      trades: [],
    });
  });

  it('testing ObligationTransactionsClose reducer', () => {
    const state = obligationReducer(
      obligationReducer(
        undefined,
        new Actions.ObligationTransactionsOpen('100')
      ),
      new Actions.ObligationTransactionsClose()
    );
    expect(state).toBeTruthy();
    expect(state.selection).toEqual({
      itemId: null,
      pendingId: null,
      transactions: [],
      trades: [],
    });
  });

  it('testing ObligationTransactionsFetch reducer', () => {
    const state = obligationReducer(
      undefined,
      new Actions.ObligationTransactionsFetch()
    );
    expect(state).toBeTruthy();
    expect(state.selection).toEqual({
      itemId: null,
      pendingId: null,
      transactions: [],
      trades: [],
    });
  });

  it('testing ObligationTransactionsFound reducer', () => {
    const state = obligationReducer(
      undefined,
      new Actions.ObligationTransactionsFound([
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
      ])
    );
    expect(state).toBeTruthy();
    expect(state.selection).toEqual({
      itemId: null,
      pendingId: null,
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
      trades: [],
    });
  });

  it('testing ObligationTransactionsError reducer', () => {
    let state = obligationReducer(
      undefined,
      new Actions.ObligationTransactionsFound([
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
      ])
    );
    state = obligationReducer(
      state,
      new Actions.ObligationTransactionsError('error')
    );
    expect(state).toBeTruthy();
    expect(state.summary).toBeNull();
    expect(state.selection).toEqual({
      itemId: null,
      pendingId: null,
      transactions: [],
      trades: [],
    });
  });

  it('testing PositionCusipChange reducer', () => {
    let state = obligationReducer(
      undefined,
      new Actions.ObligationSummaryFound({
        cusip: '',
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
      })
    );
    state = obligationReducer(state, new Actions.ObligationCusipChange('100'));
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
  });

  it('testing ObligationCusipSearchOpen reducer', () => {
    const state = obligationReducer(
      undefined,
      new Actions.ObligationCusipSearchOpen()
    );
    expect(state).toBeTruthy();
    expect(state.dialog).toEqual({
      cusip: true,
    });
  });

  it('testing ObligationCusipSearchClose reducer', () => {
    const state = obligationReducer(
      obligationReducer(undefined, new Actions.ObligationCusipSearchOpen()),
      new Actions.ObligationCusipSearchClose()
    );
    expect(state).toBeTruthy();
    expect(state.dialog).toEqual({
      cusip: false,
    });
  });
});
