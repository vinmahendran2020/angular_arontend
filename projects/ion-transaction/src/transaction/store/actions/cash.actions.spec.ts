import * as Actions from './cash.actions';

describe('CashActions', () => {
  it('testing CashParticipantIdChange action', () => {
    const action = new Actions.CashParticipantIdChange(
      '100',
      /* triggerSearch */ false
    );
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.CashParticipantIdChange.Type);
    expect(action.participantId).toBe('100');
  });

  it('testing CashParticipantIdFound action', () => {
    const action = new Actions.CashParticipantIdFound(
      '100',
      /* triggerSearch */ false
    );
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.CashParticipantIdFound.Type);
    expect(action.participantId).toBe('100');
  });

  it('testing CashParticipantIdError action', () => {
    const action = new Actions.CashParticipantIdError('error');
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.CashParticipantIdError.Type);
    expect(action.participantIdError).toBe('error');
  });

  it('testing CashActivityResetForm action', () => {
    const action = new Actions.CashActivityResetForm();
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.CashActivityResetForm.Type);
  });

  it('testing CashSummarySearch action', () => {
    const action = new Actions.CashSummarySearch();
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.CashSummarySearch.Type);
  });

  // it('testing CashSummaryFound action', () => {
  //   const action = new Actions.CashSummaryFound({
  //     security: '1',
  //     ticker: '2',
  //     cusip: '3',
  //     netAdditions: 100,
  //     minimumAmount: 200,
  //     memoSegregation: 300,
  //     totalFreeExcess: 400,
  //     pledged: 500,
  //     totalCashs: 600,
  //   });
  //   expect(action).toBeTruthy();
  //   expect(action.type).toBe(Actions.CashSummaryFound.Type);
  //   expect(action.summary).toEqual({
  //     security: '1',
  //     ticker: '2',
  //     cusip: '3',
  //     netAdditions: 100,
  //     minimumAmount: 200,
  //     memoSegregation: 300,
  //     totalFreeExcess: 400,
  //     pledged: 500,
  //     totalCashs: 600,
  //   });
  // });

  it('testing CashSummaryError action', () => {
    const action = new Actions.CashSummaryError('error');
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.CashSummaryError.Type);
    expect(action.error).toBe('error');
  });
});
