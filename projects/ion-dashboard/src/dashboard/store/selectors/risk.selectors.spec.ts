import { IDashboardState } from '../../types';
import * as selectors from './risk.selectors';

describe('RiskSelector', () => {
  it('testing risk state selector', () => {
    const state = selectors.selectRiskState({
      dashboard: {
        risk: {
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
            collateralId: {
              type: 'string',
              editable: false,
              touched: false,
              value: '2',
              error: null,
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
          },
          summary: {
            participantId: '100',
            collateralId: '200',
            settlementBalance: 100,
            netDepitCap: 200,
            collateralMonitor: 300,
            sppNetActivity: 400,
            netDirection: 'D',
            valueAtRisk: 100,
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
      participantId: '100',
      collateralId: '200',
      settlementBalance: 100,
      netDepitCap: 200,
      collateralMonitor: 300,
      sppNetActivity: 400,
      netDirection: 'D',
      valueAtRisk: 100,
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
      collateralId: {
        type: 'string',
        editable: false,
        touched: false,
        value: '2',
        error: null,
        async: false,
        validatable: true,
        validated: true,
        validating: false,
      },
    });
  });

  it('testing selectRiskSummary selector', () => {
    const summary = selectors.selectRiskSummary({
      dashboard: {
        risk: {
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
            collateralId: {
              type: 'string',
              editable: false,
              touched: false,
              value: '2',
              error: null,
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
          },
          summary: {
            participantId: '100',
            collateralId: '200',
            settlementBalance: 100,
            netDepitCap: 200,
            collateralMonitor: 300,
            sppNetActivity: 400,
            netDirection: 'D',
            valueAtRisk: 100,
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

  it('testing selectRiskForm selector', () => {
    const form = selectors.selectRiskForm({
      dashboard: {
        risk: {
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
            collateralId: {
              type: 'string',
              editable: false,
              touched: false,
              value: '2',
              error: null,
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
          },
          summary: {
            participantId: '100',
            collateralId: '200',
            settlementBalance: 100,
            netDepitCap: 200,
            collateralMonitor: 300,
            sppNetActivity: 400,
            netDirection: 'D',
            valueAtRisk: 100,
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
      collateralId: {
        type: 'string',
        editable: false,
        touched: false,
        value: '2',
        error: null,
        async: false,
        validatable: true,
        validated: true,
        validating: false,
      },
    });
  });

  it('testing selectRiskParticipantId selector', () => {
    const participantId = selectors.selectRiskParticipantId({
      dashboard: {
        risk: {
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
            collateralId: {
              type: 'string',
              editable: false,
              touched: false,
              value: '2',
              error: null,
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
          },
          summary: {
            participantId: '100',
            collateralId: '200',
            settlementBalance: 100,
            netDepitCap: 200,
            collateralMonitor: 300,
            sppNetActivity: 400,
            netDirection: 'D',
            valueAtRisk: 100,
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

  it('testing selectRiskCollateralId selector', () => {
    const collateralId = selectors.selectRiskCollateralId({
      dashboard: {
        risk: {
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
            collateralId: {
              type: 'string',
              editable: false,
              touched: false,
              value: '2',
              error: null,
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
          },
          summary: {
            participantId: '100',
            collateralId: '200',
            settlementBalance: 100,
            netDepitCap: 200,
            collateralMonitor: 300,
            sppNetActivity: 400,
            netDirection: 'D',
            valueAtRisk: 100,
          },
          lastUpdated: null,
          initialLoaded: null,
          pageLoaded: null,
          pageError: null,
          pageSuccess: null,
        },
      },
    } as { dashboard: IDashboardState });
    expect(collateralId).toBe('2');
  });

  it('testing selectRiskParticipantIdError selector', () => {
    const participantIdError = selectors.selectRiskParticipantIdError({
      dashboard: {
        risk: {
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
            collateralId: {
              type: 'string',
              editable: false,
              touched: false,
              value: '2',
              error: null,
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
          },
          summary: {
            participantId: '100',
            collateralId: '200',
            settlementBalance: 100,
            netDepitCap: 200,
            collateralMonitor: 300,
            sppNetActivity: 400,
            netDirection: 'D',
            valueAtRisk: 100,
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

  it('testing selectRiskFormDisabled disabled selector', () => {
    const formDisabled = selectors.selectRiskFormDisabled({
      dashboard: {
        risk: {
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
            collateralId: {
              type: 'string',
              editable: false,
              touched: false,
              value: '2',
              error: null,
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
          },
          summary: {
            participantId: '100',
            collateralId: '200',
            settlementBalance: 100,
            netDepitCap: 200,
            collateralMonitor: 300,
            sppNetActivity: 400,
            netDirection: 'D',
            valueAtRisk: 100,
          },
          lastUpdated: null,
          initialLoaded: null,
          pageLoaded: null,
          pageError: null,
          pageSuccess: null,
        },
      },
    } as { dashboard: IDashboardState });
    expect(formDisabled).toBe(true);
  });

  it('testing selectRiskFormDisabled selector', () => {
    const formDisabled = selectors.selectRiskFormDisabled({
      dashboard: {
        risk: {
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
            collateralId: {
              type: 'string',
              editable: false,
              touched: false,
              value: '2',
              error: null,
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
          },
          summary: {
            participantId: '100',
            collateralId: '200',
            settlementBalance: 100,
            netDepitCap: 200,
            collateralMonitor: 300,
            sppNetActivity: 400,
            netDirection: 'D',
            valueAtRisk: 100,
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

  it('testing selectRiskLastUpdated selector', () => {
    const lastUpdated = selectors.selectRiskLastUpdated({
      dashboard: {
        risk: {
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
            collateralId: {
              type: 'string',
              editable: false,
              touched: false,
              value: '2',
              error: null,
              async: false,
              validatable: true,
              validated: true,
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
