import * as Actions from './risk.actions';

describe('RiskActions', () => {
  it('testing RiskParticipantIdChange action', () => {
    const action = new Actions.RiskParticipantIdChange(
      '100',
      /* triggerSearch */ false
    );
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.RiskParticipantIdChange.Type);
    expect(action.participantId).toBe('100');
  });

  it('testing RiskParticipantIdError action', () => {
    const action = new Actions.RiskParticipantIdError('error');
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.RiskParticipantIdError.Type);
    expect(action.participantIdError).toBe('error');
  });

  it('testing RiskCollateralIdChange action', () => {
    const action = new Actions.RiskCollateralIdChange(
      '100',
      /* triggerSearch */ false
    );
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.RiskCollateralIdChange.Type);
    expect(action.collateralId).toBe('100');
  });

  it('testing RiskResetForm action', () => {
    const action = new Actions.RiskResetForm();
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.RiskResetForm.Type);
  });

  it('testing RiskSummarySearch action', () => {
    const action = new Actions.RiskSummarySearch();
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.RiskSummarySearch.Type);
  });

  it('testing RiskSummaryFound action', () => {
    const action = new Actions.RiskSummaryFound({
      participantId: '100',
      collateralId: '200',
      settlementBalance: 100,
      netDepitCap: 200,
      collateralMonitor: 300,
      sppNetActivity: 400,
      netDirection: 'D',
      valueAtRisk: 100,
    });
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.RiskSummaryFound.Type);
    expect(action.summary).toEqual({
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

  it('testing RiskSummaryError action', () => {
    const action = new Actions.RiskSummaryError('error');
    expect(action).toBeTruthy();
    expect(action.type).toBe(Actions.RiskSummaryError.Type);
    expect(action.error).toBe('error');
  });
});
