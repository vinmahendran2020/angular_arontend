import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { Observable, of, ReplaySubject, throwError } from 'rxjs';
import { take, toArray } from 'rxjs/operators';

import { Action } from '@ngrx/store';
import { IParticipant, CoreService } from 'ion-core';

import * as Actions from '../actions/position.actions';
import { PositionEffects } from './position.effects';
import { PositionService } from '../../service/position.service';
import { IPositionSummary } from '../../types';

import {
  selectPositionFormDisabled,
  selectPositionIsFirstLoad,
} from '../selectors/position.selectors';

describe('PositionEffects', () => {
  let store: MockStore;
  let service: PositionService;
  let coreService: CoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideMockStore({
          initialState: {
            dashboard: {
              position: {
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
                  cusip: '3',
                  date: '12/10/2020',
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
          provide: PositionService,
          useValue: {
            search(
              participantId: string,
              cusip: string,
              settlementDate: string
            ): Observable<IPositionSummary> {
              if (participantId === 'error') {
                return throwError(participantId + '-error');
              } else if (participantId === 'server-error') {
                return throwError({
                  code: 500,
                  description: 'internal server error',
                });
              }
              return of({
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
            },
          },
        },
      ],
    });
    service = TestBed.inject(PositionService);
    store = TestBed.inject(MockStore);
    coreService = TestBed.inject(CoreService);
  });

  it('should create', () => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new PositionEffects(actions$, service, store, coreService);

    expect(effects).toBeTruthy();
    expect(effects.searchSummaryEffect$).toBeTruthy();
  });

  it('should fire pageDestroyedEffect', (done) => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new PositionEffects(actions$, service, store, coreService);

    effects.pageDestroyedEffect$
      .pipe(take(2), toArray())
      .subscribe(
        (
          actions: [
            Actions.PositionClearPageError,
            Actions.PositionClearPageSuccess
          ]
        ) => {
          expect(actions[0].type).toBe(Actions.PositionClearPageError.Type);
          expect(actions[1].type).toBe(Actions.PositionClearPageSuccess.Type);
          done();
        }
      );

    (actions$ as ReplaySubject<Action>).next(
      new Actions.PositionPageDestroyed()
    );
  });

  it('should fire pageFirstLoadEffect', (done) => {
    store.overrideSelector(selectPositionIsFirstLoad, true);

    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new PositionEffects(actions$, service, store, coreService);

    effects.pageFirstLoadEffect$.subscribe(
      (action: Actions.PositionParticipantIdChange) => {
        expect(action.type).toBe(Actions.PositionParticipantIdChange.Type);
        expect(
          (action as Actions.PositionParticipantIdChange).participantId
        ).toBe('00001116');
        done();
      }
    );

    (actions$ as ReplaySubject<Action>).next(new Actions.PositionPageLoaded());
  });

  it('should fire pageRefreshedEffect', (done) => {
    store.overrideSelector(selectPositionFormDisabled, false);

    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new PositionEffects(actions$, service, store, coreService);

    effects.pageRefreshedEffect$.subscribe(
      (action: Actions.PositionSummarySearch) => {
        expect(action.type).toBe(Actions.PositionSummarySearch.Type);
        done();
      }
    );

    (actions$ as ReplaySubject<Action>).next(
      new Actions.PositionPageRefreshed()
    );
  });

  it('should fire formEnteredEffect', (done) => {
    store.overrideSelector(selectPositionFormDisabled, false);

    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new PositionEffects(actions$, service, store, coreService);

    effects.formEnteredEffect$.subscribe(
      (action: Actions.PositionSummarySearch) => {
        expect(action.type).toBe(Actions.PositionSummarySearch.Type);
        done();
      }
    );

    (actions$ as ReplaySubject<Action>).next(
      new Actions.PositionFormEnterKeyed()
    );
  });

  it('should find entity for participantId', (done) => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new PositionEffects(actions$, service, store, coreService);

    effects.participantIdEffect$.subscribe(
      (action: Actions.PositionParticipantIdFound) => {
        expect(action.type).toBe(Actions.PositionParticipantIdFound.Type);
        expect(action.participantId).toBe('100x');
        done();
      }
    );

    (actions$ as ReplaySubject<Action>).next(
      new Actions.PositionParticipantIdChange('100', false)
    );
  });


  it('should participantId change not trigger search', (done) => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new PositionEffects(actions$, service, store, coreService);

    const actions: string[] = [];

    effects.participantIdChangeSearchEffect$.subscribe(
      (action: Actions.PositionPageRefreshed) => {
        actions.push(action.type);
      }
    );

    (actions$ as ReplaySubject<Action>).next(
      new Actions.PositionParticipantIdFound('00005208', false)
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

    const effects = new PositionEffects(actions$, service, store, coreService);

    effects.participantIdChangeSearchEffect$.subscribe(
      (action: Actions.PositionPageRefreshed) => {
        expect(action.type).toBe(Actions.PositionPageRefreshed.Type);
        done();
      }
    );

    (actions$ as ReplaySubject<Action>).next(
      new Actions.PositionParticipantIdFound('00005208', true)
    );
  });

  it('should throw participantIdError for participantId', (done) => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new PositionEffects(actions$, service, store, coreService);

    effects.participantIdEffect$.subscribe(
      (action: Actions.PositionParticipantIdError) => {
        expect(action.type).toBe(Actions.PositionParticipantIdError.Type);
        expect(action.participantIdError).toBe('error-error');
        done();
      },
      (action: Actions.PositionParticipantIdError) => {
        expect(action.type).toBe(Actions.PositionParticipantIdError.Type);
        expect(action.participantIdError).toBe('error-error');
        done();
      }
    );

    (actions$ as ReplaySubject<Action>).next(
      new Actions.PositionParticipantIdChange('error', false)
    );
  });

  it('should find summary for form', (done) => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new PositionEffects(actions$, service, store, coreService);

    effects.searchSummaryEffect$.subscribe(
      (action: Actions.PositionSummaryFound) => {
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
        done();
      }
    );

    store.setState({
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
        },
      },
    });

    (actions$ as ReplaySubject<Action>).next(
      new Actions.PositionSummarySearch()
    );
  });

  it('should find summary throw error for form', (done) => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new PositionEffects(actions$, service, store, coreService);

    effects.searchSummaryEffect$.subscribe(
      (action: Actions.PositionSummaryError) => {
        expect(action.type).toBe(Actions.PositionSummaryError.Type);
        expect(action.error).toBe('error-error');
        done();
      }
    );

    store.setState({
      dashboard: {
        position: {
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
        },
      },
    });

    (actions$ as ReplaySubject<Action>).next(
      new Actions.PositionSummarySearch()
    );
  });

  it('should throw summary server error for form', (done) => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new PositionEffects(actions$, service, store, coreService);

    effects.searchSummaryEffect$.subscribe(
      (action: Actions.PositionSummaryServerError) => {
        expect(action.type).toBe(Actions.PositionSummaryServerError.Type);
        expect(action.error).toBe('internal server error');
        done();
      }
    );

    store.setState({
      dashboard: {
        position: {
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
        },
      },
    });

    (actions$ as ReplaySubject<Action>).next(
      new Actions.PositionSummarySearch()
    );
  });

  it('should shell switching participant Id from null', (done) => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new PositionEffects(actions$, service, store, coreService);

    effects.shellParticipantSwitchedEffect$.subscribe(
      (action: Actions.PositionParticipantIdChange) => {
        expect(action.type).toBe(Actions.PositionParticipantIdChange.Type);
        expect(action.participantId).toBe('00005208');
        done();
      }
    );

    store.setState({
      dashboard: {
        position: {
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
            cusip: '3',
            date: '12/10/2020',
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

    const effects = new PositionEffects(actions$, service, store, coreService);

    effects.shellParticipantSwitchedEffect$.subscribe(
      (action: Actions.PositionParticipantIdChange) => {
        expect(action.type).toBe(Actions.PositionParticipantIdChange.Type);
        expect(action.participantId).toBe('00005208');
        done();
      }
    );

    store.setState({
      dashboard: {
        position: {
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
            cusip: '3',
            date: '12/10/2020',
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
