import * as Actions from './obligation.actions';

describe('ObligationActions', () => {
  it('testing ObligationParticipantIdChange action', () => {
    const action = new Actions.ObligationParticipantIdChange(
      '100',
      /* triggerSearch */ false
    );
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.ObligationParticipantIdChange.Type);
    expect(action.participantId).toBe('100');
  });

  it('testing ObligationParticipantIdFound action', () => {
    const action = new Actions.ObligationParticipantIdFound(
      '100',
      /* triggerSearch */ false
    );
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.ObligationParticipantIdFound.Type);
    expect(action.participantId).toBe('100');
  });

  it('testing ObligationParticipantIdError action', () => {
    const action = new Actions.ObligationParticipantIdError('error');
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.ObligationParticipantIdError.Type);
    expect(action.participantIdError).toBe('error');
  });

  it('testing ObligationResetForm action', () => {
    const action = new Actions.ObligationResetForm();
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.ObligationResetForm.Type);
  });

  it('testing ObligationSummarySearch action', () => {
    const action = new Actions.ObligationSummarySearch();
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.ObligationSummarySearch.Type);
  });

  it('testing ObligationSummaryFound action', () => {
    const action = new Actions.ObligationSummaryFound({
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
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.ObligationSummaryFound.Type);
    expect(action.summary).toEqual({
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

  it('testing ObligationSummaryError action', () => {
    const action = new Actions.ObligationSummaryError('error');
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.ObligationSummaryError.Type);
    expect(action.error).toBe('error');
  });

  it('testing ObligationTransactionsOpen action', () => {
    const action = new Actions.ObligationTransactionsOpen('200');
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.ObligationTransactionsOpen.Type);
    expect(action.obligationId).toBe('200');
  });

  it('testing ObligationTransactionsClose action', () => {
    const action = new Actions.ObligationTransactionsClose();
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.ObligationTransactionsClose.Type);
  });

  it('testing ObligationTradesOpen action', () => {
    const action = new Actions.ObligationTradesOpen('200', 'ticker');
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.ObligationTradesOpen.Type);
    expect(action.obligationId).toBe('200');
  });

  it('testing ObligationTradesClose action', () => {
    const action = new Actions.ObligationTradesClose();
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.ObligationTradesClose.Type);
  });

  it('testing ObligationTradesFetch action', () => {
    const action = new Actions.ObligationTradesFetch('ticker');
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.ObligationTradesFetch.Type);
  });

  it('testing ObligationTradesFound action', () => {
    const action = new Actions.ObligationTradesFound([
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
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.ObligationTradesFound.Type);
    expect(action.trades).toEqual([
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

  it('testing ObligationTradesError action', () => {
    const action = new Actions.ObligationTradesError('error');
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.ObligationTradesError.Type);
    expect(action.error).toBe('error');
  });

  it('testing ObligationTransactionsFetch action', () => {
    const action = new Actions.ObligationTransactionsFetch();
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.ObligationTransactionsFetch.Type);
  });

  it('testing ObligationTransactionsFound action', () => {
    const action = new Actions.ObligationTransactionsFound([
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
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.ObligationTransactionsFound.Type);
    expect(action.transactions).toEqual([
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

  it('testing ObligationTransactionsError action', () => {
    const action = new Actions.ObligationTransactionsError('error');
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.ObligationTransactionsError.Type);
    expect(action.error).toBe('error');
  });

  it('testing ObligationCusipChange action', () => {
    const action = new Actions.ObligationCusipChange('300');
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.ObligationCusipChange.Type);
    expect(action.cusip).toBe('300');
  });

  it('testing ObligationCusipSearchOpen action', () => {
    const action = new Actions.ObligationCusipSearchOpen();
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.ObligationCusipSearchOpen.Type);
  });

  it('testing ObligationCusipSearchClose action', () => {
    const action = new Actions.ObligationCusipSearchClose();
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.ObligationCusipSearchClose.Type);
  });
});
