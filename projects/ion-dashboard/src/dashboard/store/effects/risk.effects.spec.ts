import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { Observable, of, ReplaySubject, throwError } from 'rxjs';
import { take, toArray } from 'rxjs/operators';

import { Action } from '@ngrx/store';
import { IParticipant, CoreService } from 'ion-core';

import * as Actions from '../actions/risk.actions';
import { RiskEffects } from './risk.effects';
import { RiskService } from '../../service/risk.service';
import { IRiskSummary } from '../../types';

import {
  selectRiskFormDisabled,
  selectRiskIsFirstLoad,
} from '../selectors/risk.selectors';

describe('RiskEffects', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;
  let store: MockStore;
  let service: RiskService;
  let coreService: CoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideMockStore({
          initialState: {
            dashboard: {
              risk: {
                form: {
                  participantId: {
                    type: 'string',
                    value: '1',
                    error: null,
                    async: true,
                    validatable: true,
                    validated: false,
                    validating: false,
                  },
                  collateralId: {
                    type: 'string',
                    value: '2',
                    error: null,
                    async: false,
                    validatable: true,
                    validated: true,
                    validating: false,
                  },
                },
                summary: {
                  participantId: '00005208',
                  collateralId: '200',
                  settlementBalance: 100,
                  netDepitCap: 200,
                  collateralMonitor: 300,
                  sppNetActivity: 400,
                  valueAtRisk: 100,
                },
              },
            },
            shell: {
              participant: '00001116',
            },
          },
        }),
        {
          provide: CoreService,
          useValue: {
            getParticipant(participantId: string): Observable<IParticipant> {
              console.log(participantId);
              if (participantId === 'error') {
                return throwError(participantId + '-error');
              }
              return of({
                partId: participantId + 'x',
                collGrpId: participantId + 'x',
                createDate: '2021-01-11',
                lastUpdateDate: '2021-01-11',
                partMSegInd: 'Y',
                partName: 'Alpha Financial Group',
                status: 'ACTIVE',
                testPartInd: 'Y',
              });
            },
          },
        },
        {
          provide: RiskService,
          useValue: {
            search(
              participantId: string,
              collateralId: string
            ): Observable<IRiskSummary> {
              if (participantId === 'error') {
                return throwError(participantId + '-error');
              } else if (participantId === 'server-error') {
                return throwError({
                  code: 500,
                  description: 'internal server error',
                });
              }
              return of({
                participantId: '300',
                collateralId: '200',
                settlementBalance: 500,
                netDepitCap: 600,
                collateralMonitor: 0,
                sppNetActivity: 0,
                netDirection: 'D',
                valueAtRisk: 100,
              });
            },
          },
        },
      ],
    });
    service = TestBed.inject(RiskService);
    store = TestBed.inject(MockStore);
    coreService = TestBed.inject(CoreService);
  });

  it('should create', () => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new RiskEffects(actions$, service, store, coreService);

    expect(effects).toBeTruthy();
    expect(effects.participantIdEffect$).toBeTruthy();
    expect(effects.searchSummaryEffect$).toBeTruthy();
  });

  it('should fire page destroy effects', (done) => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new RiskEffects(actions$, service, store, coreService);

    effects.pageDestroyedEffect$
      .pipe(take(2), toArray())
      .subscribe(
        (
          actions: [Actions.RiskClearPageError, Actions.RiskClearPageSuccess]
        ) => {
          expect(actions[0].type).toBe(Actions.RiskClearPageError.Type);
          expect(actions[1].type).toBe(Actions.RiskClearPageSuccess.Type);
          done();
        }
      );

    (actions$ as ReplaySubject<Action>).next(new Actions.RiskPageDestroyed());
  });

  it('should fire pageFirstLoadEffect', (done) => {
    store.overrideSelector(selectRiskIsFirstLoad, true);

    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new RiskEffects(actions$, service, store, coreService);

    effects.pageFirstLoadEffect$.subscribe(
      (action: Actions.RiskParticipantIdChange) => {
        expect(action.type).toBe(Actions.RiskParticipantIdChange.Type);
        expect((action as Actions.RiskParticipantIdChange).participantId).toBe(
          '00001116'
        );
        done();
      }
    );

    (actions$ as ReplaySubject<Action>).next(new Actions.RiskPageLoaded());
  });

  it('should fire pageRefreshedEffect', (done) => {
    store.overrideSelector(selectRiskFormDisabled, false);

    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new RiskEffects(actions$, service, store, coreService);

    effects.pageRefreshedEffect$.subscribe(
      (action: Actions.RiskSummarySearch) => {
        expect(action.type).toBe(Actions.RiskSummarySearch.Type);
        done();
      }
    );

    (actions$ as ReplaySubject<Action>).next(new Actions.RiskPageRefreshed());
  });

  it('should fire formEnteredEffect', (done) => {
    store.overrideSelector(selectRiskFormDisabled, false);

    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new RiskEffects(actions$, service, store, coreService);

    effects.formEnteredEffect$.subscribe(
      (action: Actions.RiskSummarySearch) => {
        expect(action.type).toBe(Actions.RiskSummarySearch.Type);
        done();
      }
    );

    (actions$ as ReplaySubject<Action>).next(new Actions.RiskFormEnterKeyed());
  });

  it('should find collateralId for participantId', (done) => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new RiskEffects(actions$, service, store, coreService);

    effects.participantIdEffect$
      .pipe(take(2), toArray())
      .subscribe(
        (
          actions: [
            Actions.RiskParticipantIdFound,
            Actions.RiskCollateralIdChange
          ]
        ) => {
          expect(actions[0].type).toBe(Actions.RiskParticipantIdFound.Type);
          expect(actions[0].participantId).toBe('00005208x');

          expect(actions[1].type).toBe(Actions.RiskCollateralIdChange.Type);
          expect(actions[1].collateralId).toBe('00005208x');

          done();
        }
      );

    (actions$ as ReplaySubject<Action>).next(
      new Actions.RiskParticipantIdChange('00005208', false)
    );
  });

  it('should throw collateralId error for participantId', (done) => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new RiskEffects(actions$, service, store, coreService);

    effects.participantIdEffect$.subscribe(
      (action: Actions.RiskParticipantIdError) => {
        expect(action.type).toBe(Actions.RiskParticipantIdError.Type);
        expect(action.participantIdError).toBe('error-error');
        done();
      },
      (action: Actions.RiskParticipantIdError) => {
        expect(action.type).toBe(Actions.RiskParticipantIdError.Type);
        expect(action.participantIdError).toBe('error-error');
        done();
      }
    );

    (actions$ as ReplaySubject<Action>).next(
      new Actions.RiskParticipantIdChange('error', false)
    );
  });

  it('should participantId change not trigger search', (done) => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new RiskEffects(actions$, service, store, coreService);

    const actions: string[] = [];

    effects.participantIdChangeSearchEffect$.subscribe(
      (action: Actions.RiskPageRefreshed) => {
        actions.push(action.type);
      }
    );

    (actions$ as ReplaySubject<Action>).next(
      new Actions.RiskCollateralIdChange('00005208', false)
    );

    setTimeout(() => {
      if (actions.length === 0) {
        done();
      }
    }, 200);
  });

  it('should participantId change to trigger search', (done) => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new RiskEffects(actions$, service, store, coreService);

    effects.participantIdChangeSearchEffect$.subscribe(
      (action: Actions.RiskPageRefreshed) => {
        expect(action.type).toBe(Actions.RiskPageRefreshed.Type);
        done();
      }
    );

    (actions$ as ReplaySubject<Action>).next(
      new Actions.RiskCollateralIdChange('00005208', true)
    );
  });

  it('should find summary for form', (done) => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new RiskEffects(actions$, service, store, coreService);

    effects.searchSummaryEffect$.subscribe(
      (action: Actions.RiskSummaryFound) => {
        expect(action.type).toBe(Actions.RiskSummaryFound.Type);
        expect(action.summary).toEqual({
          participantId: '300',
          collateralId: '200',
          settlementBalance: 500,
          netDepitCap: 600,
          collateralMonitor: 0,
          sppNetActivity: 0,
          netDirection: 'D',
          valueAtRisk: 100,
        });
        done();
      }
    );

    store.setState({
      dashboard: {
        risk: {
          form: {
            participantId: {
              type: 'string',
              editable: true,
              touched: false,
              value: '00005208',
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
            participantId: '00005208',
            collateralId: '200',
            settlementBalance: 100,
            netDepitCap: 200,
            collateralMonitor: 300,
            sppNetActivity: 400,
            valueAtRisk: 100,
          },
        },
      },
    });

    (actions$ as ReplaySubject<Action>).next(new Actions.RiskSummarySearch());
  });

  it('should find summary throw error for form', (done) => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new RiskEffects(actions$, service, store, coreService);

    effects.searchSummaryEffect$.subscribe(
      (action: Actions.RiskSummaryError) => {
        expect(action.type).toBe(Actions.RiskSummaryError.Type);
        expect(action.error).toBe('error-error');
        done();
      }
    );

    store.setState({
      dashboard: {
        risk: {
          form: {
            participantId: {
              type: 'string',
              editable: true,
              touched: false,
              value: 'error',
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
            participantId: '00005208',
            collateralId: '200',
            settlementBalance: 100,
            netDepitCap: 200,
            collateralMonitor: 300,
            sppNetActivity: 400,
            valueAtRisk: 100,
          },
        },
      },
    });

    (actions$ as ReplaySubject<Action>).next(new Actions.RiskSummarySearch());
  });

  it('should throw summary server error for form', (done) => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new RiskEffects(actions$, service, store, coreService);

    effects.searchSummaryEffect$.subscribe(
      (action: Actions.RiskSummaryServerError) => {
        expect(action.type).toBe(Actions.RiskSummaryServerError.Type);
        expect(action.error).toBe('internal server error');
        done();
      }
    );

    store.setState({
      dashboard: {
        risk: {
          form: {
            participantId: {
              type: 'string',
              editable: true,
              touched: false,
              value: 'server-error',
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
            participantId: '00005208',
            collateralId: '200',
            settlementBalance: 100,
            netDepitCap: 200,
            collateralMonitor: 300,
            sppNetActivity: 400,
            valueAtRisk: 100,
          },
        },
      },
    });

    (actions$ as ReplaySubject<Action>).next(new Actions.RiskSummarySearch());
  });

  it('should shell switching participant Id from null', (done) => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new RiskEffects(actions$, service, store, coreService);

    effects.shellParticipantSwitchedEffect$.subscribe(
      (action: Actions.RiskParticipantIdChange) => {
        expect(action.type).toBe(Actions.RiskParticipantIdChange.Type);
        expect(action.participantId).toBe('00005208');
        done();
      }
    );

    store.setState({
      dashboard: {
        risk: {
          form: {
            participantId: {
              type: 'string',
              value: null,
              error: null,
              async: true,
              validatable: true,
              validated: false,
              validating: false,
            },
            collateralId: {
              type: 'string',
              value: '2',
              error: null,
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
          },
          summary: {
            participantId: '00005208',
            collateralId: '200',
            settlementBalance: 100,
            netDepitCap: 200,
            collateralMonitor: 300,
            sppNetActivity: 400,
            valueAtRisk: 100,
          },
        },
      },
    });

    (actions$ as ReplaySubject<Action>).next({
      type: 'Shell/ParticipantSwitched',
      current: '00005208',
      previous: null,
    } as Action);
  });

  it('should shell switching participant Id from value', (done) => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new RiskEffects(actions$, service, store, coreService);

    effects.shellParticipantSwitchedEffect$.subscribe(
      (action: Actions.RiskParticipantIdChange) => {
        expect(action.type).toBe(Actions.RiskParticipantIdChange.Type);
        expect(action.participantId).toBe('00005208');
        done();
      }
    );

    store.setState({
      dashboard: {
        risk: {
          form: {
            participantId: {
              type: 'string',
              value: '00001116',
              error: null,
              async: true,
              validatable: true,
              validated: false,
              validating: false,
            },
            collateralId: {
              type: 'string',
              value: '2',
              error: null,
              async: false,
              validatable: true,
              validated: true,
              validating: false,
            },
          },
          summary: {
            participantId: '00005208',
            collateralId: '200',
            settlementBalance: 100,
            netDepitCap: 200,
            collateralMonitor: 300,
            sppNetActivity: 400,
            valueAtRisk: 100,
          },
        },
      },
    });

    (actions$ as ReplaySubject<Action>).next({
      type: 'Shell/ParticipantSwitched',
      current: '00005208',
      previous: '00001116',
    } as Action);
  });
});
