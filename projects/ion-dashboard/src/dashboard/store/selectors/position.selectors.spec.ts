import { IDashboardState } from '../../types';
import * as selectors from './position.selectors';

describe('PositionSelector', () => {
  it('testing position state selector', () => {
    const state = selectors.selectPositionState({
      dashboard: {
        position: {
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
            cusip: {
              type: 'string',
              editable: true,
              touched: false,
              value: '3',
              error: null,
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
            date: {
              type: 'string',
              editable: true,
              touched: false,
              value: '12/10/2020',
              error: null,
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
          },
          summary: {
            security: '1',
            ticker: '2',
            cusip: '3',
            netAdditions: 100,
            minimumAmount: 200,
            memoSegregation: 300,
            totalFreeExcess: 400,
            pledged: 500,
            totalPositions: 600,
          },
          dialog: {
            cusip: false,
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
      cusip: {
        type: 'string',
        editable: true,
        touched: false,
        value: '3',
        error: null,
        async: false,
        validatable: true,
        validated: true,
        validating: false,
      },
      date: {
        type: 'string',
        editable: true,
        touched: false,
        value: '12/10/2020',
        error: null,
        async: false,
        validatable: true,
        validated: true,
        validating: false,
      },
    });
  });

  it('testing selectPositionSummary selector', () => {
    const summary = selectors.selectPositionSummary({
      dashboard: {
        position: {
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
            cusip: {
              type: 'string',
              editable: true,
              touched: false,
              value: '3',
              error: null,
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
            date: {
              type: 'string',
              editable: true,
              touched: false,
              value: '12/10/2020',
              error: null,
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
          },
          summary: {
            security: '1',
            ticker: '2',
            cusip: '3',
            netAdditions: 100,
            minimumAmount: 200,
            memoSegregation: 300,
            totalFreeExcess: 400,
            pledged: 500,
            totalPositions: 600,
          },
          dialog: {
            cusip: false,
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

  it('testing selectPositionForm selector', () => {
    const form = selectors.selectPositionForm({
      dashboard: {
        position: {
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
            cusip: {
              type: 'string',
              editable: true,
              touched: false,
              value: '3',
              error: null,
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
            date: {
              type: 'string',
              editable: true,
              touched: false,
              value: '12/10/2020',
              error: null,
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
          },
          summary: {
            security: '1',
            ticker: '2',
            cusip: '3',
            netAdditions: 100,
            minimumAmount: 200,
            memoSegregation: 300,
            totalFreeExcess: 400,
            pledged: 500,
            totalPositions: 600,
          },
          dialog: {
            cusip: false,
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
      cusip: {
        type: 'string',
        editable: true,
        touched: false,
        value: '3',
        error: null,
        async: false,
        validatable: true,
        validated: true,
        validating: false,
      },
      date: {
        type: 'string',
        editable: true,
        touched: false,
        value: '12/10/2020',
        error: null,
        async: false,
        validatable: true,
        validated: true,
        validating: false,
      },
    });
  });

  it('testing selectPositionDialog selector', () => {
    const dialog = selectors.selectPositionDialog({
      dashboard: {
        position: {
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
            cusip: {
              type: 'string',
              editable: true,
              touched: false,
              value: '3',
              error: null,
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
            date: {
              type: 'string',
              editable: true,
              touched: false,
              value: '12/10/2020',
              error: null,
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
          },
          summary: {
            security: '1',
            ticker: '2',
            cusip: '3',
            netAdditions: 100,
            minimumAmount: 200,
            memoSegregation: 300,
            totalFreeExcess: 400,
            pledged: 500,
            totalPositions: 600,
          },
          dialog: {
            cusip: false,
          },
          lastUpdated: null,
          initialLoaded: null,
          pageLoaded: null,
          pageError: null,
          pageSuccess: null,
        },
      },
    } as { dashboard: IDashboardState });
    expect(dialog).toEqual({
      cusip: false,
    });
  });

  it('testing selectPositionParticipantId selector', () => {
    const participantId = selectors.selectPositionParticipantId({
      dashboard: {
        position: {
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
            cusip: {
              type: 'string',
              editable: true,
              touched: false,
              value: '3',
              error: null,
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
            date: {
              type: 'string',
              editable: true,
              touched: false,
              value: '12/10/2020',
              error: null,
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
          },
          summary: {
            security: '1',
            ticker: '2',
            cusip: '3',
            netAdditions: 100,
            minimumAmount: 200,
            memoSegregation: 300,
            totalFreeExcess: 400,
            pledged: 500,
            totalPositions: 600,
          },
          dialog: {
            cusip: false,
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

  it('testing selectPositionParticipantIdError selector', () => {
    const participantIdError = selectors.selectPositionParticipantIdError({
      dashboard: {
        position: {
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
            cusip: {
              type: 'string',
              editable: true,
              touched: false,
              value: '3',
              error: null,
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
            date: {
              type: 'string',
              editable: true,
              touched: false,
              value: '12/10/2020',
              error: null,
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
          },
          summary: {
            security: '1',
            ticker: '2',
            cusip: '3',
            netAdditions: 100,
            minimumAmount: 200,
            memoSegregation: 300,
            totalFreeExcess: 400,
            pledged: 500,
            totalPositions: 600,
          },
          dialog: {
            cusip: false,
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

  it('testing selectPositionCusip selector', () => {
    const cusip = selectors.selectPositionCusip({
      dashboard: {
        position: {
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
            cusip: {
              type: 'string',
              editable: true,
              touched: false,
              value: '3',
              error: null,
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
            date: {
              type: 'string',
              editable: true,
              touched: false,
              value: '12/10/2020',
              error: null,
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
          },
          summary: {
            security: '1',
            ticker: '2',
            cusip: '3',
            netAdditions: 100,
            minimumAmount: 200,
            memoSegregation: 300,
            totalFreeExcess: 400,
            pledged: 500,
            totalPositions: 600,
          },
          dialog: {
            cusip: false,
          },
          lastUpdated: null,
          initialLoaded: null,
          pageLoaded: null,
          pageError: null,
          pageSuccess: null,
        },
      },
    } as { dashboard: IDashboardState });
    expect(cusip).toBe('3');
  });

  it('testing selectPositionCusipError selector', () => {
    const cusipError = selectors.selectPositionCusipError({
      dashboard: {
        position: {
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
            cusip: {
              type: 'string',
              editable: true,
              touched: false,
              value: '3',
              error: 'error',
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
            date: {
              type: 'string',
              editable: true,
              touched: false,
              value: '12/10/2020',
              error: null,
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
          },
          summary: {
            security: '1',
            ticker: '2',
            cusip: '3',
            netAdditions: 100,
            minimumAmount: 200,
            memoSegregation: 300,
            totalFreeExcess: 400,
            pledged: 500,
            totalPositions: 600,
          },
          dialog: {
            cusip: false,
          },
          lastUpdated: null,
          initialLoaded: null,
          pageLoaded: null,
          pageError: null,
          pageSuccess: null,
        },
      },
    } as { dashboard: IDashboardState });
    expect(cusipError).toBe('error');
  });

  it('testing selectPositionDate selector', () => {
    const date = selectors.selectPositionDate({
      dashboard: {
        position: {
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
            cusip: {
              type: 'string',
              editable: true,
              touched: false,
              value: '3',
              error: null,
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
            date: {
              type: 'string',
              editable: true,
              touched: false,
              value: '12/10/2020',
              error: null,
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
          },
          summary: {
            security: '1',
            ticker: '2',
            cusip: '3',
            netAdditions: 100,
            minimumAmount: 200,
            memoSegregation: 300,
            totalFreeExcess: 400,
            pledged: 500,
            totalPositions: 600,
          },
          dialog: {
            cusip: false,
          },
          lastUpdated: null,
          initialLoaded: null,
          pageLoaded: null,
          pageError: null,
          pageSuccess: null,
        },
      },
    } as { dashboard: IDashboardState });
    expect(date).toBe('12/10/2020');
  });

  it('testing selectPositionCusipSearch selector', () => {
    const cusip = selectors.selectPositionCusipSearch({
      dashboard: {
        position: {
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
            cusip: {
              type: 'string',
              editable: true,
              touched: false,
              value: '3',
              error: null,
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
            date: {
              type: 'string',
              editable: true,
              touched: false,
              value: '12/10/2020',
              error: null,
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
          },
          summary: {
            security: '1',
            ticker: '2',
            cusip: '3',
            netAdditions: 100,
            minimumAmount: 200,
            memoSegregation: 300,
            totalFreeExcess: 400,
            pledged: 500,
            totalPositions: 600,
          },
          dialog: {
            cusip: true,
          },
          lastUpdated: null,
          initialLoaded: null,
          pageLoaded: null,
          pageError: null,
          pageSuccess: null,
        },
      },
    } as { dashboard: IDashboardState });
    expect(cusip).toBe(true);
  });

  it('testing selectPositionDate selector', () => {
    const date = selectors.selectPositionDate({
      dashboard: {
        position: {
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
            cusip: {
              type: 'string',
              editable: true,
              touched: false,
              value: '3',
              error: null,
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
            date: {
              type: 'string',
              editable: true,
              touched: false,
              value: '12/10/2020',
              error: null,
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
          },
          summary: {
            security: '1',
            ticker: '2',
            cusip: '3',
            netAdditions: 100,
            minimumAmount: 200,
            memoSegregation: 300,
            totalFreeExcess: 400,
            pledged: 500,
            totalPositions: 600,
          },
          dialog: {
            cusip: false,
          },
          lastUpdated: null,
          initialLoaded: null,
          pageLoaded: null,
          pageError: null,
          pageSuccess: null,
        },
      },
    } as { dashboard: IDashboardState });
    expect(date).toBe('12/10/2020');
  });

  it('testing selectPositionFormDisabled false selector', () => {
    const formDisabled = selectors.selectPositionFormDisabled({
      dashboard: {
        position: {
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
            cusip: {
              type: 'string',
              editable: true,
              touched: false,
              value: '3',
              error: null,
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
            date: {
              type: 'string',
              editable: true,
              touched: false,
              value: '12/10/2020',
              error: null,
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
          },
          summary: {
            security: '1',
            ticker: '2',
            cusip: '3',
            netAdditions: 100,
            minimumAmount: 200,
            memoSegregation: 300,
            totalFreeExcess: 400,
            pledged: 500,
            totalPositions: 600,
          },
          dialog: {
            cusip: true,
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

  it('testing selectPositionFormDisabled true selector', () => {
    const formDisabled = selectors.selectPositionFormDisabled({
      dashboard: {
        position: {
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
            cusip: {
              type: 'string',
              editable: true,
              touched: false,
              value: '',
              error: null,
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
            date: {
              type: 'string',
              editable: true,
              touched: false,
              value: '12/10/2020',
              error: null,
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
          },
          summary: {
            security: '1',
            ticker: '2',
            cusip: '3',
            netAdditions: 100,
            minimumAmount: 200,
            memoSegregation: 300,
            totalFreeExcess: 400,
            pledged: 500,
            totalPositions: 600,
          },
          dialog: {
            cusip: true,
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

  it('testing selectRiskLastUpdated selector', () => {
    const lastUpdated = selectors.selectPositionLastUpdated({
      dashboard: {
        position: {
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
            cusip: {
              type: 'string',
              editable: true,
              touched: false,
              value: '',
              error: null,
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
            date: {
              type: 'string',
              editable: true,
              touched: false,
              value: '12/10/2020',
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
