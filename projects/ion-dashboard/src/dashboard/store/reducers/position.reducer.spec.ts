import * as moment from 'moment';

import { reducer as positionReducer } from './position.reducer';
import * as Actions from '../actions/position.actions';

describe('PositionReducer', () => {
  it('testing default state', () => {
    const state = positionReducer(undefined, { type: 'init' } as any);
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
      cusip: {
        type: 'string',
        editable: true,
        touched: false,
        value: null,
        error: null,
        async: false,
        validatable: true,
        validated: false,
        validating: false,
      },
      date: {
        type: 'string',
        editable: true,
        touched: false,
        value: moment().format('L'),
        error: null,
        async: false,
        validatable: true,
        validated: false,
        validating: false,
      },
    });
    expect(state.dialog).toEqual({
      cusip: false,
    });
    expect(state.summary).toBeNull();
  });

  it('testing PositionPageLoaded reducer', () => {
    const mockedDate = new Date();
    jasmine.clock().mockDate(mockedDate);
    const state = positionReducer(undefined, new Actions.PositionPageLoaded());
    expect(state).toBeTruthy();
    expect(state.initialLoaded).toEqual(mockedDate);
    expect(state.pageLoaded).toEqual(mockedDate);
  });

  it('testing PositionParticipantIdChange reducer', () => {
    const state = positionReducer(
      undefined,
      new Actions.PositionParticipantIdChange('100', false)
    );
    expect(state).toBeTruthy();
    expect(state.form.participantId.value).toBe('100');
    expect(state.form.participantId.touched).toBeTrue();
    expect(state.form.participantId.validating).toBe(true);
    expect(state.form.participantId.validated).toBe(false);
    expect(state.summary).toBeNull();
  });

  it('testing PositionParticipantIdFound reducer', () => {
    const state = positionReducer(
      undefined,
      new Actions.PositionParticipantIdFound('100', false)
    );
    expect(state).toBeTruthy();
    expect(state.form.participantId.error).toBeNull();
    expect(state.form.participantId.validating).toBe(false);
    expect(state.form.participantId.validated).toBe(true);
    expect(state.summary).toBeNull();
  });

  it('testing PositionParticipantIdError reducer', () => {
    const state = positionReducer(
      undefined,
      new Actions.PositionParticipantIdError('error')
    );
    expect(state).toBeTruthy();
    expect(state.form.participantId.error).toBe('error');
    expect(state.form.participantId.validating).toBe(false);
    expect(state.form.participantId.validated).toBe(false);
    expect(state.summary).toBeNull();
  });

  it('testing PositionCusipChange reducer', () => {
    const state = positionReducer(
      undefined,
      new Actions.PositionCusipChange('100')
    );
    expect(state).toBeTruthy();
    expect(state.form.cusip.value).toBe('100');
    expect(state.form.cusip.touched).toBeTrue();
    expect(state.form.cusip.validating).toBe(false);
    expect(state.form.cusip.validated).toBe(true);
    expect(state.summary).toBeNull();
  });

  it('testing PositionDateChange reducer', () => {
    const state = positionReducer(
      undefined,
      new Actions.PositionDateChange('12/10/2020')
    );
    expect(state).toBeTruthy();
    expect(state.form.date.value).toBe('12/10/2020');
    expect(state.form.date.touched).toBeTrue();
    expect(state.form.date.validating).toBe(false);
    expect(state.form.date.validated).toBe(true);
    expect(state.summary).toBeNull();
  });

  it('testing PositionSummarySearch reducer', () => {
    const state = positionReducer(
      undefined,
      new Actions.PositionSummarySearch()
    );
    expect(state).toBeTruthy();
    expect(state.summary).toBeNull();
    expect(state.pageError).toBeNull();
  });

  it('testing PositionSummaryFound reducer', () => {
    const state = positionReducer(
      undefined,
      new Actions.PositionSummaryFound({
        security: '1',
        ticker: '2',
        cusip: '3',
        netAdditions: 100,
        minimumAmount: 200,
        memoSegregation: 300,
        totalFreeExcess: 400,
        pledged: 500,
        totalPositions: 600,
      })
    );
    expect(state).toBeTruthy();
    expect(state.summary).toEqual({
      security: '1',
      ticker: '2',
      cusip: '3',
      netAdditions: 100,
      minimumAmount: 200,
      memoSegregation: 300,
      totalFreeExcess: 400,
      pledged: 500,
      totalPositions: 600,
    });
  });

  it('testing PositionSummaryError reducer', () => {
    let state = positionReducer(
      undefined,
      new Actions.PositionSummaryFound({
        security: '1',
        ticker: '2',
        cusip: '3',
        netAdditions: 100,
        minimumAmount: 200,
        memoSegregation: 300,
        totalFreeExcess: 400,
        pledged: 500,
        totalPositions: 600,
      })
    );
    state = positionReducer(
      state,
      new Actions.PositionSummaryError('page error')
    );
    expect(state).toBeTruthy();
    expect(state.form.cusip.error).toBe('page error');
    expect(state.form.cusip.validating).toBe(false);
    expect(state.form.cusip.validated).toBe(false);
    expect(state.summary).toBeNull();
  });

  it('testing PositionSummaryServerError reducer', () => {
    let state = positionReducer(
      undefined,
      new Actions.PositionSummaryFound({
        security: '1',
        ticker: '2',
        cusip: '3',
        netAdditions: 100,
        minimumAmount: 200,
        memoSegregation: 300,
        totalFreeExcess: 400,
        pledged: 500,
        totalPositions: 600,
      })
    );
    state = positionReducer(
      state,
      new Actions.PositionSummaryServerError('page error')
    );
    expect(state).toBeTruthy();
    expect(state.pageError).toBe(
      'Sorry, there was an unexpected error. We are currently trying to fix the problem. In the meantime, you can refresh the page or contact the administrator.'
    );
    expect(state.summary).toBeNull();
  });

  it('testing PositionClearPageError reducer', () => {
    let state = positionReducer(
      undefined,
      new Actions.PositionSummaryError('page error')
    );
    state = positionReducer(state, new Actions.PositionClearPageError());
    expect(state).toBeTruthy();
    expect(state.pageError).toBeNull();
    expect(state.summary).toBeNull();
  });

  it('testing PositionClearPageSuccess reducer', () => {
    let state = positionReducer(
      undefined,
      new Actions.PositionSummaryError('page error')
    );
    state = positionReducer(
      { ...state, pageSuccess: 'page is success' },
      new Actions.PositionClearPageSuccess()
    );
    expect(state).toBeTruthy();
    expect(state.pageSuccess).toBeNull();
  });

  it('testing PositionResetForm reducer', () => {
    let state = positionReducer(
      undefined,
      new Actions.PositionSummaryFound({
        security: '1',
        ticker: '2',
        cusip: '3',
        netAdditions: 100,
        minimumAmount: 200,
        memoSegregation: 300,
        totalFreeExcess: 400,
        pledged: 500,
        totalPositions: 600,
      })
    );
    state = positionReducer(state, new Actions.PositionCusipChange('200'));
    state = positionReducer(state, new Actions.PositionResetForm());

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
      cusip: {
        type: 'string',
        editable: true,
        touched: false,
        value: null,
        error: null,
        async: false,
        validatable: true,
        validated: false,
        validating: false,
      },
      date: {
        type: 'string',
        editable: true,
        touched: false,
        value: moment().format('L'),
        error: null,
        async: false,
        validatable: true,
        validated: false,
        validating: false,
      },
    });
    expect(state.summary).toBeNull();
  });

  it('testing PositionCusipSearchOpen reducer', () => {
    const state = positionReducer(
      undefined,
      new Actions.PositionCusipSearchOpen()
    );
    expect(state).toBeTruthy();
    expect(state.dialog).toEqual({
      cusip: true,
    });
  });

  it('testing PositionCusipSearchClose reducer', () => {
    const state = positionReducer(
      positionReducer(undefined, new Actions.PositionCusipSearchOpen()),
      new Actions.PositionCusipSearchClose()
    );
    expect(state).toBeTruthy();
    expect(state.dialog).toEqual({
      cusip: false,
    });
  });
});
