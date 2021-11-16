import * as Actions from './position.actions';

describe('PositionActions', () => {
  it('testing PositionParticipantIdChange action', () => {
    const action = new Actions.PositionParticipantIdChange(
      '100',
      /* triggerSearch */ false
    );
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.PositionParticipantIdChange.Type);
    expect(action.participantId).toBe('100');
  });

  it('testing PositionParticipantIdFound action', () => {
    const action = new Actions.PositionParticipantIdFound(
      '100',
      /* triggerSearch */ false
    );
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.PositionParticipantIdFound.Type);
    expect(action.participantId).toBe('100');
  });

  it('testing PositionParticipantIdError action', () => {
    const action = new Actions.PositionParticipantIdError('error');
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.PositionParticipantIdError.Type);
    expect(action.participantIdError).toBe('error');
  });

  it('testing PositionCusipChange action', () => {
    const action = new Actions.PositionCusipChange('200');
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.PositionCusipChange.Type);
    expect(action.cusip).toBe('200');
  });

  it('testing PositionDateChange action', () => {
    const action = new Actions.PositionDateChange('12/10/2020');
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.PositionDateChange.Type);
    expect(action.date).toBe('12/10/2020');
  });

  it('testing PositionResetForm action', () => {
    const action = new Actions.PositionResetForm();
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.PositionResetForm.Type);
  });

  it('testing PositionSummarySearch action', () => {
    const action = new Actions.PositionSummarySearch();
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.PositionSummarySearch.Type);
  });

  it('testing PositionSummaryFound action', () => {
    const action = new Actions.PositionSummaryFound({
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
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.PositionSummaryFound.Type);
    expect(action.summary).toEqual({
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

  it('testing PositionSummaryError action', () => {
    const action = new Actions.PositionSummaryError('error');
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.PositionSummaryError.Type);
    expect(action.error).toBe('error');
  });

  it('testing PositionCusipSearchOpen action', () => {
    const action = new Actions.PositionCusipSearchOpen();
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.PositionCusipSearchOpen.Type);
  });

  it('testing PositionCusipSearchClose action', () => {
    const action = new Actions.PositionCusipSearchClose();
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.PositionCusipSearchClose.Type);
  });
});
