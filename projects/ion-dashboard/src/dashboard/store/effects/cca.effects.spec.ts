import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { Observable, of, ReplaySubject, throwError } from 'rxjs';
import { take, toArray } from 'rxjs/operators';

import { Action } from '@ngrx/store';
import { IParticipant, CoreService } from 'ion-core';

import * as Actions from '../actions/cca.actions';
import { CCAEffects } from './cca.effects';
import { CCAService } from '../../service/cca.service';
import { ICCASummary, ICCATransactionDetail } from '../../types';

import {
  selectCCAFormDisabled,
  selectCCAIsFirstLoad,
} from '../selectors/cca.selectors';

describe('CCAEffects', () => {
  let store: MockStore;
  let service: CCAService;
  let coreService: CoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideMockStore({
          initialState: {
            dashboard: {
              cca: {
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
                  settlementDate: {
                    type: 'string',
                    value: ['12/12/2020', '12/14/2020'],
                    error: null,
                    async: true,
                    validatable: true,
                    validated: false,
                    validating: false,
                  },
                },
                summary: null,
                detail: {
                  ccaId: null,
                  cusip: '',
                  debits: [],
                  credits: [],
                },
                lastUpdated: null,
                initialLoaded: null,
                pageLoaded: null,
                pageError: null,
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
          provide: CCAService,
          useValue: {
            transactions(ccaId: string): Observable<ICCATransactionDetail> {
              if (ccaId === 'error') {
                return throwError(ccaId + '-error');
              }
              return of({
                ccaId: '1',
                cusip: '1',
                debits: [],
                credits: [],
              });
            },
            search(
              participantId: string,
              startDate: string,
              endDate: string
            ): Observable<ICCASummary> {
              if (participantId === 'error') {
                return throwError(participantId + '-error');
              } else if (participantId === 'server-error') {
                return throwError({
                  code: 500,
                  description: 'internal server error',
                });
              }
              return of({
                participantId: '00005208',
                adjustments: [
                  {
                    ccaId: '1',
                    settlementDate: '2020-01-26',
                    debitCredit: 'D',
                    netCCAAmount: 100,
                    settlementStatus: 'settled',
                  },
                ],
              });
            },
          },
        },
      ],
    });
    service = TestBed.inject(CCAService);
    store = TestBed.inject(MockStore);
    coreService = TestBed.inject(CoreService);
  });

  it('should create', () => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new CCAEffects(actions$, service, store, coreService);

    expect(effects).toBeTruthy();
    expect(effects.searchSummaryEffect$).toBeTruthy();
  });

  it('should fire pageDestroyedEffect', (done) => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new CCAEffects(actions$, service, store, coreService);

    effects.pageDestroyedEffect$
      .pipe(take(2), toArray())
      .subscribe(
        (actions: [Actions.CCAClearPageError, Actions.CCAClearPageSuccess]) => {
          expect(actions[0].type).toBe(Actions.CCAClearPageError.Type);
          expect(actions[1].type).toBe(Actions.CCAClearPageSuccess.Type);
          done();
        }
      );

    (actions$ as ReplaySubject<Action>).next(new Actions.CCAPageDestroyed());
  });

  it('should fire pageFirstLoadEffect', (done) => {
    store.overrideSelector(selectCCAIsFirstLoad, true);

    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new CCAEffects(actions$, service, store, coreService);

    effects.pageFirstLoadEffect$.subscribe(
      (action: Actions.CCAParticipantIdChange) => {
        expect(action.type).toBe(Actions.CCAParticipantIdChange.Type);
        expect((action as Actions.CCAParticipantIdChange).participantId).toBe(
          '00001116'
        );
        done();
      }
    );

    (actions$ as ReplaySubject<Action>).next(new Actions.CCAPageLoaded());
  });

  it('should fire pageRefreshedEffect', (done) => {
    store.overrideSelector(selectCCAFormDisabled, false);

    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new CCAEffects(actions$, service, store, coreService);

    effects.pageRefreshedEffect$.subscribe(
      (action: Actions.CCASummarySearch) => {
        expect(action.type).toBe(Actions.CCASummarySearch.Type);
        done();
      }
    );

    (actions$ as ReplaySubject<Action>).next(new Actions.CCAPageRefreshed());
  });

  it('should fire formEnteredEffect', (done) => {
    store.overrideSelector(selectCCAFormDisabled, false);

    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new CCAEffects(actions$, service, store, coreService);

    effects.formEnteredEffect$.subscribe((action: Actions.CCASummarySearch) => {
      expect(action.type).toBe(Actions.CCASummarySearch.Type);
      done();
    });

    (actions$ as ReplaySubject<Action>).next(new Actions.CCAFormEnterKeyed());
  });

  it('should find entity for participantId', (done) => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new CCAEffects(actions$, service, store, coreService);

    effects.participantIdEffect$.subscribe(
      (action: Actions.CCAParticipantIdFound) => {
        expect(action.type).toBe(Actions.CCAParticipantIdFound.Type);
        expect(action.participantId).toBe('00005208x');
        done();
      }
    );

    (actions$ as ReplaySubject<Action>).next(
      new Actions.CCAParticipantIdChange('00005208', false)
    );
  });

  it('should participantId change not trigger search', (done) => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new CCAEffects(actions$, service, store, coreService);

    const actions: string[] = [];

    effects.participantIdChangeSearchEffect$.subscribe(
      (action: Actions.CCAPageRefreshed) => {
        actions.push(action.type);
      }
    );

    (actions$ as ReplaySubject<Action>).next(
      new Actions.CCAParticipantIdFound('00005208', false)
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

    const effects = new CCAEffects(actions$, service, store, coreService);

    effects.participantIdChangeSearchEffect$.subscribe(
      (action: Actions.CCAPageRefreshed) => {
        expect(action.type).toBe(Actions.CCAPageRefreshed.Type);
        done();
      }
    );

    (actions$ as ReplaySubject<Action>).next(
      new Actions.CCAParticipantIdFound('00005208', true)
    );
  });

  it('should throw participantIdError for participantId', (done) => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new CCAEffects(actions$, service, store, coreService);

    effects.participantIdEffect$.subscribe(
      (action: Actions.CCAParticipantIdError) => {
        expect(action.type).toBe(Actions.CCAParticipantIdError.Type);
        expect(action.participantIdError).toBe('error-error');
        done();
      },
      (action: Actions.CCAParticipantIdError) => {
        expect(action.type).toBe(Actions.CCAParticipantIdError.Type);
        expect(action.participantIdError).toBe('error-error');
        done();
      }
    );

    (actions$ as ReplaySubject<Action>).next(
      new Actions.CCAParticipantIdChange('error', false)
    );
  });

  it('should find transactions for ccaId', (done) => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new CCAEffects(actions$, service, store, coreService);

    effects.fetchTransactionsEffect$.subscribe(
      (action: Actions.CCADetailFound) => {
        expect(action.type).toBe(Actions.CCADetailFound.Type);
        expect(action.detail.ccaId).toBe('1');
        done();
      }
    );

    (actions$ as ReplaySubject<Action>).next(new Actions.CCADetailFetch());
  });

  it('should throw detailError for ccaId', (done) => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new CCAEffects(actions$, service, store, coreService);

    effects.fetchTransactionsEffect$.subscribe(
      (action: Actions.CCADetailError) => {
        expect(action.type).toBe(Actions.CCADetailError.Type);
        expect(action.error).toBe('error-error');
        done();
      },
      (action: Actions.CCADetailError) => {
        expect(action.type).toBe(Actions.CCADetailError.Type);
        expect(action.error).toBe('error-error');
        done();
      }
    );

    store.setState({
      dashboard: {
        cca: {
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
            settlementDate: {
              type: 'string',
              editable: true,
              touched: false,
              value: ['12/12/2020', '12/14/2020'],
              error: null,
              async: true,
              validatable: true,
              validated: false,
              validating: false,
            },
          },
          summary: null,
          detail: {
            ccaId: 'error',
            cusip: '',
            debits: [],
            credits: [],
          },
          lastUpdated: null,
          initialLoaded: null,
          pageLoaded: null,
          pageError: null,
        },
      },
    });

    (actions$ as ReplaySubject<Action>).next(new Actions.CCADetailFetch());
  });

  it('should find summary for form', (done) => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new CCAEffects(actions$, service, store, coreService);

    effects.searchSummaryEffect$.subscribe(
      (action: Actions.CCASummaryFound) => {
        expect(action.type).toBe(Actions.CCASummaryFound.Type);
        expect(action.summary).toEqual({
          participantId: '00005208',
          adjustments: [
            {
              ccaId: '1',
              settlementDate: '2020-01-26',
              debitCredit: 'D',
              netCCAAmount: 100,
              settlementStatus: 'settled',
            },
          ],
        });
        done();
      }
    );

    store.setState({
      dashboard: {
        cca: {
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
            settlementDate: {
              type: 'string',
              editable: true,
              touched: false,
              value: ['12/12/2020', '12/14/2020'],
              error: null,
              async: true,
              validatable: true,
              validated: false,
              validating: false,
            },
          },
          summary: null,
          detail: {
            ccaId: null,
            cusip: '',
            debits: [],
            credits: [],
          },
          lastUpdated: null,
          initialLoaded: null,
          pageLoaded: null,
          pageError: null,
        },
      },
    });

    (actions$ as ReplaySubject<Action>).next(new Actions.CCASummarySearch());
  });

  it('should find summary throw error for form', (done) => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new CCAEffects(actions$, service, store, coreService);

    effects.searchSummaryEffect$.subscribe(
      (action: Actions.CCASummaryError) => {
        expect(action.type).toBe(Actions.CCASummaryError.Type);
        expect(action.error).toBe('error-error');
        done();
      }
    );

    store.setState({
      dashboard: {
        cca: {
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
            settlementDate: {
              type: 'string',
              editable: true,
              touched: false,
              value: ['12/12/2020', '12/14/2020'],
              error: null,
              async: true,
              validatable: true,
              validated: false,
              validating: false,
            },
          },
          summary: null,
          detail: {
            ccaId: null,
            cusip: '',
            debits: [],
            credits: [],
          },
          lastUpdated: null,
          initialLoaded: null,
          pageLoaded: null,
          pageError: null,
        },
      },
    });

    (actions$ as ReplaySubject<Action>).next(new Actions.CCASummarySearch());
  });

  it('should throw summary server error for form', (done) => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new CCAEffects(actions$, service, store, coreService);

    effects.searchSummaryEffect$.subscribe(
      (action: Actions.CCASummaryServerError) => {
        expect(action.type).toBe(Actions.CCASummaryServerError.Type);
        expect(action.error).toBe('internal server error');
        done();
      }
    );

    store.setState({
      dashboard: {
        cca: {
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
            settlementDate: {
              type: 'string',
              editable: true,
              touched: false,
              value: ['12/12/2020', '12/14/2020'],
              error: null,
              async: true,
              validatable: true,
              validated: false,
              validating: false,
            },
          },
          summary: null,
          detail: {
            ccaId: null,
            cusip: '',
            debits: [],
            credits: [],
          },
          lastUpdated: null,
          initialLoaded: null,
          pageLoaded: null,
          pageError: null,
        },
      },
    });

    (actions$ as ReplaySubject<Action>).next(new Actions.CCASummarySearch());
  });

  it('should open transactions', (done) => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new CCAEffects(actions$, service, store, coreService);

    effects.openTransacctionsEffect$.subscribe(
      (action: Actions.CCADetailFetch) => {
        expect(action.type).toBe(Actions.CCADetailFetch.Type);
        done();
      }
    );

    (actions$ as ReplaySubject<Action>).next(
      new Actions.CCADetailOpen('00005208')
    );
  });

  it('should shell switching participant Id from null', (done) => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new CCAEffects(actions$, service, store, coreService);

    effects.shellParticipantSwitchedEffect$.subscribe(
      (action: Actions.CCAParticipantIdChange) => {
        expect(action.type).toBe(Actions.CCAParticipantIdChange.Type);
        expect(action.participantId).toBe('00005208');
        done();
      }
    );

    store.setState({
      dashboard: {
        cca: {
          form: {
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
              value: ['12/12/2020', '12/14/2020'],
              error: null,
              async: true,
              validatable: true,
              validated: false,
              validating: false,
            },
          },
          summary: null,
          detail: {
            ccaId: null,
            cusip: '',
            debits: [],
            credits: [],
          },
          lastUpdated: null,
          initialLoaded: null,
          pageLoaded: null,
          pageError: null,
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

    const effects = new CCAEffects(actions$, service, store, coreService);

    effects.shellParticipantSwitchedEffect$.subscribe(
      (action: Actions.CCAParticipantIdChange) => {
        expect(action.type).toBe(Actions.CCAParticipantIdChange.Type);
        expect(action.participantId).toBe('00005208');
        done();
      }
    );

    store.setState({
      dashboard: {
        cca: {
          form: {
            participantId: {
              type: 'string',
              editable: true,
              touched: false,
              value: '00001116',
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
              value: ['12/12/2020', '12/14/2020'],
              error: null,
              async: true,
              validatable: true,
              validated: false,
              validating: false,
            },
          },
          summary: null,
          detail: {
            ccaId: null,
            cusip: '',
            debits: [],
            credits: [],
          },
          lastUpdated: null,
          initialLoaded: null,
          pageLoaded: null,
          pageError: null,
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
