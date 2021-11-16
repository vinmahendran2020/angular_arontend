import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { Observable, of, ReplaySubject, throwError } from 'rxjs';
import { take, toArray } from 'rxjs/operators';

import { Action } from '@ngrx/store';
import { IParticipant, CoreService } from 'ion-core';

import * as Actions from '../actions/obligation.actions';
import { ObligationEffects } from './obligation.effects';
import { ObligationService } from '../../service/obligation.service';
import { IObligationSummary } from '../../types';

import {
  selectObligationFormDisabled,
  selectObligationIsFirstLoad,
} from '../selectors/obligation.selectors';

describe('ObligationEffects', () => {
  let store: MockStore;
  let service: ObligationService;
  let coreService: CoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideMockStore({
          initialState: {
            dashboard: {
              obligation: {
                form: {
                  participantId: {
                    type: 'string',
                    value: '',
                    error: null,
                    async: true,
                    validatable: true,
                    validated: false,
                    validating: false,
                  },
                },
                summary: null,
                selection: {
                  itemId: null,
                  pendingId: null,
                  transactions: [],
                  trades: [],
                },
                dialog: {
                  cusip: false,
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
          provide: ObligationService,
          useValue: {
            search(participantId: string): Observable<IObligationSummary> {
              if (participantId === 'error') {
                return throwError(participantId + '-error');
              } else if (participantId === 'server-error') {
                return throwError({
                  code: 500,
                  description: 'internal server error',
                });
              }
              return of({
                cusip: '3',
                sortBy: undefined,
                longs: [],
                shorts: [],
                closed: [],
              });
            },
          },
        },
      ],
    });
    service = TestBed.inject(ObligationService);
    store = TestBed.inject(MockStore);
    coreService = TestBed.inject(CoreService);
  });

  it('should create', () => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new ObligationEffects(
      actions$,
      service,
      store,
      coreService
    );

    expect(effects).toBeTruthy();
    expect(effects.searchSummaryEffect$).toBeTruthy();
  });

  it('should fire pageDestroyedEffect', (done) => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new ObligationEffects(
      actions$,
      service,
      store,
      coreService
    );

    effects.pageDestroyedEffect$
      .pipe(take(2), toArray())
      .subscribe(
        (
          actions: [
            Actions.ObligationClearPageError,
            Actions.ObligationClearPageSuccess
          ]
        ) => {
          expect(actions[0].type).toBe(Actions.ObligationClearPageError.Type);
          expect(actions[1].type).toBe(Actions.ObligationClearPageSuccess.Type);
          done();
        }
      );

    (actions$ as ReplaySubject<Action>).next(
      new Actions.ObligationPageDestroyed()
    );
  });

  it('should fire pageFirstLoadEffect', (done) => {
    store.overrideSelector(selectObligationIsFirstLoad, true);

    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new ObligationEffects(
      actions$,
      service,
      store,
      coreService
    );

    effects.pageFirstLoadEffect$.subscribe(
      (action: Actions.ObligationParticipantIdChange) => {
        expect(action.type).toBe(Actions.ObligationParticipantIdChange.Type);
        expect(
          (action as Actions.ObligationParticipantIdChange).participantId
        ).toBe('00001116');
        done();
      }
    );

    (actions$ as ReplaySubject<Action>).next(
      new Actions.ObligationPageLoaded()
    );
  });

  it('should fire pageRefreshedEffect', (done) => {
    store.overrideSelector(selectObligationFormDisabled, false);

    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new ObligationEffects(
      actions$,
      service,
      store,
      coreService
    );

    effects.pageRefreshedEffect$.subscribe(
      (action: Actions.ObligationSummarySearch) => {
        expect(action.type).toBe(Actions.ObligationSummarySearch.Type);
        done();
      }
    );

    (actions$ as ReplaySubject<Action>).next(
      new Actions.ObligationPageRefreshed()
    );
  });

  it('should fire formEnteredEffect', (done) => {
    store.overrideSelector(selectObligationFormDisabled, false);

    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new ObligationEffects(
      actions$,
      service,
      store,
      coreService
    );

    effects.formEnteredEffect$.subscribe(
      (action: Actions.ObligationSummarySearch) => {
        expect(action.type).toBe(Actions.ObligationSummarySearch.Type);
        done();
      }
    );

    (actions$ as ReplaySubject<Action>).next(
      new Actions.ObligationFormEnterKeyed()
    );
  });

  it('should find entity for participantId', (done) => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new ObligationEffects(
      actions$,
      service,
      store,
      coreService
    );

    effects.participantIdEffect$.subscribe(
      (action: Actions.ObligationParticipantIdFound) => {
        expect(action.type).toBe(Actions.ObligationParticipantIdFound.Type);
        expect(action.participantId).toBe('00005208x');
        done();
      }
    );

    (actions$ as ReplaySubject<Action>).next(
      new Actions.ObligationParticipantIdChange('00005208', false)
    );
  });

  it('should participantId change not trigger search', (done) => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new ObligationEffects(
      actions$,
      service,
      store,
      coreService
    );

    const actions: string[] = [];

    effects.participantIdChangeSearchEffect$.subscribe(
      (action: Actions.ObligationPageRefreshed) => {
        actions.push(action.type);
      }
    );

    (actions$ as ReplaySubject<Action>).next(
      new Actions.ObligationParticipantIdFound('00005208', false)
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

    const effects = new ObligationEffects(
      actions$,
      service,
      store,
      coreService
    );

    effects.participantIdChangeSearchEffect$.subscribe(
      (action: Actions.ObligationPageRefreshed) => {
        expect(action.type).toBe(Actions.ObligationPageRefreshed.Type);
        done();
      }
    );

    (actions$ as ReplaySubject<Action>).next(
      new Actions.ObligationParticipantIdFound('00005208', true)
    );
  });

  it('should throw participantIdError for participantId', (done) => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new ObligationEffects(
      actions$,
      service,
      store,
      coreService
    );

    effects.participantIdEffect$.subscribe(
      (action: Actions.ObligationParticipantIdError) => {
        expect(action.type).toBe(Actions.ObligationParticipantIdError.Type);
        expect(action.participantIdError).toBe('error-error');
        done();
      },
      (action: Actions.ObligationParticipantIdError) => {
        expect(action.type).toBe(Actions.ObligationParticipantIdError.Type);
        expect(action.participantIdError).toBe('error-error');
        done();
      }
    );

    (actions$ as ReplaySubject<Action>).next(
      new Actions.ObligationParticipantIdChange('error', false)
    );
  });

  it('should find summary for form', (done) => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new ObligationEffects(
      actions$,
      service,
      store,
      coreService
    );

    effects.searchSummaryEffect$.subscribe(
      (action: Actions.ObligationSummaryFound) => {
        expect(action.type).toBe(Actions.ObligationSummaryFound.Type);
        expect(action.summary).toEqual({
          cusip: '3',
          sortBy: undefined,
          longs: [],
          shorts: [],
          closed: [],
        });
        done();
      }
    );

    store.setState({
      dashboard: {
        obligation: {
          form: {
            participantId: {
              type: 'string',
              editable: true,
              touched: false,
              value: '',
              error: null,
              async: true,
              validatable: true,
              validated: false,
              validating: false,
            },
          },
          summary: null,
          selection: {
            itemId: null,
            pendingId: null,
            transactions: [],
            trades: [],
          },
          dialog: {
            cusip: false,
          },
          lastUpdated: null,
          initialLoaded: null,
          pageLoaded: null,
          pageError: null,
        },
      },
    });

    (actions$ as ReplaySubject<Action>).next(
      new Actions.ObligationSummarySearch()
    );
  });

  it('should find summary throw error for form', (done) => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new ObligationEffects(
      actions$,
      service,
      store,
      coreService
    );

    effects.searchSummaryEffect$.subscribe(
      (action: Actions.ObligationSummaryError) => {
        expect(action.type).toBe(Actions.ObligationSummaryError.Type);
        expect(action.error).toBe('error-error');
        done();
      }
    );

    store.setState({
      dashboard: {
        obligation: {
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
          },
          summary: null,
          selection: {
            itemId: null,
            pendingId: null,
            transactions: [],
            trades: [],
          },
          dialog: {
            cusip: false,
          },
          lastUpdated: null,
          initialLoaded: null,
          pageLoaded: null,
          pageError: null,
        },
      },
    });

    (actions$ as ReplaySubject<Action>).next(
      new Actions.ObligationSummarySearch()
    );
  });

  it('should throw summary server error for form', (done) => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new ObligationEffects(
      actions$,
      service,
      store,
      coreService
    );

    effects.searchSummaryEffect$.subscribe(
      (action: Actions.ObligationSummaryServerError) => {
        expect(action.type).toBe(Actions.ObligationSummaryServerError.Type);
        expect(action.error).toBe('internal server error');
        done();
      }
    );

    store.setState({
      dashboard: {
        obligation: {
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
          },
          summary: null,
          selection: {
            itemId: null,
            pendingId: null,
            transactions: [],
            trades: [],
          },
          dialog: {
            cusip: false,
          },
          lastUpdated: null,
          initialLoaded: null,
          pageLoaded: null,
          pageError: null,
        },
      },
    });

    (actions$ as ReplaySubject<Action>).next(
      new Actions.ObligationSummarySearch()
    );
  });

  it('should open trades', (done) => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new ObligationEffects(
      actions$,
      service,
      store,
      coreService
    );

    effects.openTradeEffect$.subscribe(
      (action: Actions.ObligationTradesFetch) => {
        expect(action.type).toBe(Actions.ObligationTradesFetch.Type);
        done();
      }
    );

    (actions$ as ReplaySubject<Action>).next(
      new Actions.ObligationTradesOpen('00005208', '000023')
    );
  });

  it('should open transactions', (done) => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new ObligationEffects(
      actions$,
      service,
      store,
      coreService
    );

    effects.openTransactionsEffect$.subscribe(
      (action: Actions.ObligationTransactionsFetch) => {
        expect(action.type).toBe(Actions.ObligationTransactionsFetch.Type);
        done();
      }
    );

    (actions$ as ReplaySubject<Action>).next(
      new Actions.ObligationTransactionsOpen('00005208')
    );
  });

  it('should shell switching participant Id from null', (done) => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new ObligationEffects(
      actions$,
      service,
      store,
      coreService
    );

    effects.shellParticipantSwitchedEffect$.subscribe(
      (action: Actions.ObligationParticipantIdChange) => {
        expect(action.type).toBe(Actions.ObligationParticipantIdChange.Type);
        expect(action.participantId).toBe('00005208');
        done();
      }
    );

    store.setState({
      dashboard: {
        obligation: {
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
          },
          summary: null,
          selection: {
            itemId: null,
            pendingId: null,
            transactions: [],
            trades: [],
          },
          dialog: {
            cusip: false,
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

    const effects = new ObligationEffects(
      actions$,
      service,
      store,
      coreService
    );

    effects.shellParticipantSwitchedEffect$.subscribe(
      (action: Actions.ObligationParticipantIdChange) => {
        expect(action.type).toBe(Actions.ObligationParticipantIdChange.Type);
        expect(action.participantId).toBe('00005208');
        done();
      }
    );

    store.setState({
      dashboard: {
        obligation: {
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
          },
          summary: null,
          selection: {
            itemId: null,
            pendingId: null,
            transactions: [],
            trades: [],
          },
          dialog: {
            cusip: false,
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
