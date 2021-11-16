import { reducer as riskReducer } from './risk.reducer';
import * as Actions from '../actions/risk.actions';

describe('RiskReducer', () => {
  it('testing default state', () => {
    const state = riskReducer(undefined, { type: 'init' } as any);
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
      collateralId: {
        type: 'string',
        editable: false,
        touched: false,
        value: null,
        error: null,
        async: false,
        validatable: true,
        validated: false,
        validating: false,
      },
    });
    expect(state.summary).toBeNull();
  });

  it('testing RiskPageLoaded reducer', () => {
    const mockedDate = new Date();
    jasmine.clock().mockDate(mockedDate);
    const state = riskReducer(undefined, new Actions.RiskPageLoaded());
    expect(state).toBeTruthy();
    expect(state.initialLoaded).toEqual(mockedDate);
    expect(state.pageLoaded).toEqual(mockedDate);
  });

  it('testing RiskParticipantIdChange reducer', () => {
    const state = riskReducer(
      undefined,
      new Actions.RiskParticipantIdChange('100', false)
    );
    expect(state).toBeTruthy();
    expect(state.form.participantId.value).toBe('100');
    expect(state.form.participantId.touched).toBeTrue();
    expect(state.form.participantId.validating).toBe(true);
    expect(state.form.participantId.validated).toBe(false);
    expect(state.form.participantId.error).toBe(
      'A valid Participant ID is an 8-digit number'
    );
  });

  it('testing RiskParticipantIdChange on number reducer', () => {
    const state = riskReducer(
      undefined,
      new Actions.RiskParticipantIdChange('t0000000', false)
    );
    expect(state).toBeTruthy();
    expect(state.form.participantId.value).toBe('t0000000');
    expect(state.form.participantId.touched).toBeTrue();
    expect(state.form.participantId.validating).toBe(true);
    expect(state.form.participantId.validated).toBe(false);
    expect(state.form.participantId.error).toBe(
      'A valid Participant ID is an 8-digit number'
    );
  });

  it('testing RiskParticipantIdChange valid reducer', () => {
    const state = riskReducer(
      undefined,
      new Actions.RiskParticipantIdChange('00005208', false)
    );
    expect(state).toBeTruthy();
    expect(state.form.participantId.value).toBe('00005208');
    expect(state.form.participantId.touched).toBeTrue();
    expect(state.form.participantId.validating).toBe(true);
    expect(state.form.participantId.validated).toBe(false);
    expect(state.form.participantId.error).toBeNull();
  });

  it('testing RiskParticipantIdError reducer', () => {
    const state = riskReducer(
      undefined,
      new Actions.RiskParticipantIdError('error')
    );
    expect(state).toBeTruthy();
    expect(state.form.participantId.error).toBe('error');
    expect(state.form.participantId.validating).toBe(false);
    expect(state.form.participantId.validated).toBe(false);
  });

  it('testing RiskParticipantIdFound reducer', () => {
    const state = riskReducer(
      undefined,
      new Actions.RiskParticipantIdFound('00005208', false)
    );
    expect(state).toBeTruthy();
    expect(state.form.participantId.error).toBeNull();
    expect(state.form.participantId.validating).toBe(false);
    expect(state.form.participantId.validated).toBe(true);
  });

  it('testing RiskCollateralIdChange reducer', () => {
    const state = riskReducer(
      undefined,
      new Actions.RiskCollateralIdChange('100', false)
    );
    expect(state).toBeTruthy();

    expect(state.form.collateralId.value).toBe('100');
    expect(state.form.collateralId.touched).toBeTrue();
    expect(state.form.collateralId.validating).toBe(false);
    expect(state.form.collateralId.validated).toBe(true);
    expect(state.summary).toBeNull();
  });

  it('testing RiskSummarySearch reducer', () => {
    const state = riskReducer(undefined, new Actions.RiskSummarySearch());
    expect(state).toBeTruthy();
    expect(state.summary).toBeNull();
    expect(state.pageError).toBeNull();
  });

  it('testing RiskSummaryFound reducer', () => {
    const state = riskReducer(
      undefined,
      new Actions.RiskSummaryFound({
        participantId: '100',
        collateralId: '200',
        settlementBalance: 100,
        netDepitCap: 200,
        collateralMonitor: 300,
        sppNetActivity: 400,
        netDirection: 'D',
        valueAtRisk: 100,
      })
    );
    expect(state).toBeTruthy();
    expect(state.summary).toEqual({
      participantId: '100',
      collateralId: '200',
      settlementBalance: 100,
      netDepitCap: 200,
      collateralMonitor: 300,
      sppNetActivity: 400,
      netDirection: 'D',
      valueAtRisk: 100,
    });
  });

  it('testing RiskSummaryError reducer', () => {
    let state = riskReducer(
      undefined,
      new Actions.RiskSummaryFound({
        participantId: '100',
        collateralId: '200',
        settlementBalance: 100,
        netDepitCap: 200,
        collateralMonitor: 300,
        sppNetActivity: 400,
        netDirection: 'D',
        valueAtRisk: 100,
      })
    );
    state = riskReducer(state, new Actions.RiskSummaryError('page error'));
    expect(state).toBeTruthy();
    expect(state.summary).toBeNull();
  });

  it('testing RiskSummaryServerError reducer', () => {
    let state = riskReducer(
      undefined,
      new Actions.RiskSummaryFound({
        participantId: '100',
        collateralId: '200',
        settlementBalance: 100,
        netDepitCap: 200,
        collateralMonitor: 300,
        sppNetActivity: 400,
        netDirection: 'D',
        valueAtRisk: 100,
      })
    );
    state = riskReducer(
      state,
      new Actions.RiskSummaryServerError('page error')
    );
    expect(state).toBeTruthy();
    expect(state.pageError).toBe(
      'Sorry, there was an unexpected error. We are currently trying to fix the problem. In the meantime, you can refresh the page or contact the administrator.'
    );
    expect(state.summary).toBeNull();
  });

  it('testing RiskClearPageError reducer', () => {
    let state = riskReducer(
      undefined,
      new Actions.RiskSummaryError('page error')
    );
    state = riskReducer(state, new Actions.RiskClearPageError());
    expect(state).toBeTruthy();
    expect(state.pageError).toBeNull();
    expect(state.summary).toBeNull();
  });

  it('testing RiskPageRefreshed reducer', () => {
    const mockedDate = new Date();
    jasmine.clock().mockDate(mockedDate);

    const state = riskReducer(undefined, new Actions.RiskPageRefreshed());
    expect(state).toBeTruthy();
    expect(state.lastUpdated).toEqual(mockedDate);
  });

  it('testing RiskClearPageSuccess reducer', () => {
    let state = riskReducer(
      undefined,
      new Actions.RiskSummaryError('page error')
    );
    state = riskReducer(
      { ...state, pageSuccess: 'page is success' },
      new Actions.RiskClearPageSuccess()
    );
    expect(state).toBeTruthy();
    expect(state.pageSuccess).toBeNull();
  });

  it('testing RiskSummaryFound reducer', () => {
    let state = riskReducer(
      undefined,
      new Actions.RiskSummaryFound({
        participantId: '100',
        collateralId: '200',
        settlementBalance: 100,
        netDepitCap: 200,
        collateralMonitor: 300,
        sppNetActivity: 400,
        netDirection: 'D',
        valueAtRisk: 100,
      })
    );
    state = riskReducer(
      state,
      new Actions.RiskParticipantIdChange('100', false)
    );
    state = riskReducer(
      state,
      new Actions.RiskCollateralIdChange('200', false)
    );
    state = riskReducer(state, new Actions.RiskResetForm());

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
      collateralId: {
        type: 'string',
        editable: false,
        touched: false,
        value: null,
        error: null,
        async: false,
        validatable: true,
        validated: false,
        validating: false,
      },
    });
    expect(state.summary).toBeNull();
  });
});
