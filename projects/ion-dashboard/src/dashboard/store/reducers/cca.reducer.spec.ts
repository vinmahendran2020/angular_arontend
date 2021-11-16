import { reducer as ccaReducer } from './cca.reducer';
import * as Actions from '../actions/cca.actions';
import moment from 'moment';

describe('CCAReducer', () => {
  it('testing default state', () => {
    const state = ccaReducer(undefined, { type: 'init' } as any);
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
      settlementDate: {
        type: 'string',
        editable: true,
        touched: false,
        value: [moment().format('L'), moment().add(2, 'days').format('L')],
        error: null,
        async: false,
        validatable: true,
        validated: false,
        validating: false,
      },
    });
    expect(state.summary).toBeNull();
    expect(state.detail).toEqual({
      ccaId: null,
      cusip: '',
      debits: [],
      credits: [],
    });
    expect(state.lastUpdated).toBeNull();
    expect(state.initialLoaded).toBeNull();
    expect(state.pageLoaded).toBeNull();
    expect(state.pageError).toBeNull();
  });

  it('testing CCAPageLoaded reducer', () => {
    const mockedDate = new Date();
    jasmine.clock().mockDate(mockedDate);
    const state = ccaReducer(undefined, new Actions.CCAPageLoaded());
    expect(state).toBeTruthy();
    expect(state.initialLoaded).toEqual(mockedDate);
    expect(state.pageLoaded).toEqual(mockedDate);
  });

  it('testing CCAParticipantIdChange reducer', () => {
    const state = ccaReducer(
      undefined,
      new Actions.CCAParticipantIdChange('100', false)
    );
    expect(state).toBeTruthy();
    expect(state.form.participantId.value).toBe('100');
    expect(state.form.participantId.touched).toBeTrue();
    expect(state.form.participantId.validating).toBe(true);
    expect(state.form.participantId.validated).toBe(false);
    expect(state.summary).toBeNull();
  });

  it('testing CCAParticipantIdFound reducer', () => {
    const state = ccaReducer(
      undefined,
      new Actions.CCAParticipantIdFound('100', false)
    );
    expect(state).toBeTruthy();
    expect(state.form.participantId.error).toBeNull();
    expect(state.form.participantId.validating).toBe(false);
    expect(state.form.participantId.validated).toBe(true);
    expect(state.summary).toBeNull();
  });

  it('testing CCAParticipantIdError reducer', () => {
    const state = ccaReducer(
      undefined,
      new Actions.CCAParticipantIdError('error')
    );
    expect(state).toBeTruthy();
    expect(state.form.participantId.error).toBe('error');
    expect(state.form.participantId.validating).toBe(false);
    expect(state.form.participantId.validated).toBe(false);
    expect(state.summary).toBeNull();
  });

  it('testing CCASummarySearch reducer', () => {
    const state = ccaReducer(undefined, new Actions.CCASummarySearch());
    expect(state).toBeTruthy();
    expect(state.summary).toBeNull();
  });

  it('testing CCASummaryFound reducer', () => {
    const state = ccaReducer(
      undefined,
      new Actions.CCASummaryFound({
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
      })
    );
    expect(state).toBeTruthy();
    expect(state.summary).toEqual({
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
    });
  });

  it('testing CCASummaryError reducer', () => {
    let state = ccaReducer(
      undefined,
      new Actions.CCASummaryFound({
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
      })
    );
    state = ccaReducer(state, new Actions.CCASummaryError('page error'));
    expect(state).toBeTruthy();
    expect(state.form.participantId.error).toBe('page error');
    expect(state.form.participantId.validating).toBe(false);
    expect(state.form.participantId.validated).toBe(false);
    expect(state.summary).toBeNull();
  });

  it('testing CCASummaryServerError reducer', () => {
    let state = ccaReducer(
      undefined,
      new Actions.CCASummaryFound({
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
      })
    );
    state = ccaReducer(state, new Actions.CCASummaryServerError('page error'));
    expect(state).toBeTruthy();
    expect(state.pageError).toBe(
      'Sorry, there was an unexpected error. We are currently trying to fix the problem. In the meantime, you can refresh the page or contact the administrator.'
    );
    expect(state.summary).toBeNull();
  });

  it('testing CCAClearPageError reducer', () => {
    let state = ccaReducer(
      undefined,
      new Actions.CCASummaryError('page error')
    );
    state = ccaReducer(state, new Actions.CCAClearPageError());
    expect(state).toBeTruthy();
    expect(state.pageError).toBeNull();
    expect(state.summary).toBeNull();
  });

  it('testing CCAClearPageSuccess reducer', () => {
    let state = ccaReducer(
      undefined,
      new Actions.CCASummaryError('page error')
    );
    state = ccaReducer(
      { ...state, pageSuccess: 'page is success' },
      new Actions.CCAClearPageSuccess()
    );
    expect(state).toBeTruthy();
    expect(state.pageSuccess).toBeNull();
  });

  it('testing CCASummaryFound reducer', () => {
    let state = ccaReducer(
      undefined,
      new Actions.CCASummaryFound({
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
      })
    );
    state = ccaReducer(state, new Actions.CCAParticipantIdChange('100', false));
    state = ccaReducer(state, new Actions.CCAResetForm());

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
      settlementDate: {
        type: 'string',
        editable: true,
        touched: false,
        value: [moment().format('L'), moment().add(2, 'days').format('L')],
        error: null,
        async: false,
        validatable: true,
        validated: false,
        validating: false,
      },
    });
    expect(state.summary).toBeNull();
  });

  it('testing CCADetailOpen reducer', () => {
    const state = ccaReducer(undefined, new Actions.CCADetailOpen('100'));
    expect(state).toBeTruthy();
    expect(state.detail).toEqual({
      ccaId: '100',
      cusip: '',
      debits: [],
      credits: [],
    });
  });

  it('testing CCADetailClose reducer', () => {
    const state = ccaReducer(
      ccaReducer(undefined, new Actions.CCADetailOpen('100')),
      new Actions.CCADetailClose()
    );
    expect(state).toBeTruthy();
    expect(state.detail).toEqual({
      ccaId: null,
      cusip: '',
      debits: [],
      credits: [],
    });
  });

  it('testing CCADetailFetch reducer', () => {
    const state = ccaReducer(
      ccaReducer(undefined, new Actions.CCADetailFetch()),
      new Actions.CCADetailFetch()
    );
    expect(state).toBeTruthy();
    expect(state.detail).toEqual({
      ccaId: null,
      cusip: '',
      debits: [],
      credits: [],
    });
  });

  it('testing CCADetailFound reducer', () => {
    const state = ccaReducer(
      undefined,
      new Actions.CCADetailFound({
        ccaId: '100',
        cusip: '1',
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
            direction: 'Debit',
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
            direction: 'Credit',
          },
        ],
      })
    );
    expect(state).toBeTruthy();
    expect(state.detail).toEqual({
      ccaId: '100',
      cusip: '1',
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
          direction: 'Debit',
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
          direction: 'Credit',
        },
      ],
    });
  });

  it('testing CCADetailError reducer', () => {
    let state = ccaReducer(
      undefined,
      new Actions.CCADetailFound({
        ccaId: '100',
        cusip: '1',
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
            direction: 'Debit',
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
            direction: 'Credit',
          },
        ],
      })
    );
    state = ccaReducer(state, new Actions.CCADetailError('error'));
    expect(state).toBeTruthy();
    expect(state.summary).toBeNull();
    expect(state.detail).toEqual({
      ccaId: '100',
      cusip: '1',
      debits: [],
      credits: [],
    });
  });
});
