import * as Actions from './cca.actions';

describe('CCAActions', () => {
  it('testing CCAParticipantIdChange action', () => {
    const action = new Actions.CCAParticipantIdChange(
      '100',
      /* triggerSearch */ false
    );
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.CCAParticipantIdChange.Type);
    expect(action.participantId).toBe('100');
  });

  it('testing CCAParticipantIdFound action', () => {
    const action = new Actions.CCAParticipantIdFound(
      '100',
      /* triggerSearch */ false
    );
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.CCAParticipantIdFound.Type);
    expect(action.participantId).toBe('100');
  });

  it('testing CCAParticipantIdError action', () => {
    const action = new Actions.CCAParticipantIdError('error');
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.CCAParticipantIdError.Type);
    expect(action.participantIdError).toBe('error');
  });

  it('testing CCAResetForm action', () => {
    const action = new Actions.CCAResetForm();
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.CCAResetForm.Type);
  });

  it('testing CCASummarySearch action', () => {
    const action = new Actions.CCASummarySearch();
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.CCASummarySearch.Type);
  });

  it('testing CCASummaryFound action', () => {
    const action = new Actions.CCASummaryFound({
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
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.CCASummaryFound.Type);
    expect(action.summary).toEqual({
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

  it('testing CCASummaryError action', () => {
    const action = new Actions.CCASummaryError('error');
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.CCASummaryError.Type);
    expect(action.error).toBe('error');
  });

  it('testing CCADetailOpen action', () => {
    const action = new Actions.CCADetailOpen('200');
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.CCADetailOpen.Type);
    expect(action.ccaId).toBe('200');
  });

  it('testing CCADetailClose action', () => {
    const action = new Actions.CCADetailClose();
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.CCADetailClose.Type);
  });

  it('testing CCADetailOpen action', () => {
    const action = new Actions.CCADetailOpen('200');
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.CCADetailOpen.Type);
    expect(action.ccaId).toBe('200');
  });

  it('testing CCADetailClose action', () => {
    const action = new Actions.CCADetailClose();
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.CCADetailClose.Type);
  });

  it('testing CCADetailFetch action', () => {
    const action = new Actions.CCADetailFetch();
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.CCADetailFetch.Type);
  });

  it('testing CCADetailFound action', () => {
    const action = new Actions.CCADetailFound({
      ccaId: null,
      cusip: '',
      debits: [],
      credits: [],
    });
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.CCADetailFound.Type);
    expect(action.detail).toEqual({
      ccaId: null,
      cusip: '',
      debits: [],
      credits: [],
    });
  });

  it('testing CCADetailError action', () => {
    const action = new Actions.CCADetailError('error');
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.CCADetailError.Type);
    expect(action.error).toBe('error');
  });

  it('testing CCACusipChange action', () => {
    const action = new Actions.CCACusipChange('300');
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.CCACusipChange.Type);
    expect(action.cusip).toBe('300');
  });
});
