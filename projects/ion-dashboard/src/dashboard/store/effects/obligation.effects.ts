import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';

import { CoreService } from 'ion-core';

import { ObligationService } from '../../service/obligation.service';

import {
  ObligationSummaryError,
  ObligationSummaryFound,
  ObligationSummarySearch,
  ObligationSummaryServerError,
  ObligationTradesFetch,
  ObligationTradesFound,
  ObligationTradesError,
  ObligationTransactionsFetch,
  ObligationTransactionsFound,
  ObligationTransactionsError,
  ObligationTradesOpen,
  ObligationTransactionsOpen,
  ObligationClearPageError,
  ObligationPageDestroyed,
  ObligationPageRefreshed,
  ObligationFormEnterKeyed,
  ObligationParticipantIdChange,
  ObligationParticipantIdFound,
  ObligationParticipantIdError,
  ObligationClearPageSuccess,
  ObligationPageLoaded,
} from '../actions/obligation.actions';
import {
  selectObligationFormDisabled,
  selectObligationSelectedItemId,
  selectObligationSelectedPendingId,
  selectObligationParticipantId,
  selectObligationParticipantIdError,
  selectObligationIsFirstLoad,
} from '../selectors/obligation.selectors';
import { selectShellParticipant } from '../selectors/shell.selectors';

@Injectable()
export class ObligationEffects {
  shellParticipantSwitchedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<{
        type: 'Shell/ParticipantSwitched';
        current: string;
        previous: string;
      }>('Shell/ParticipantSwitched'),
      withLatestFrom(this.store.select(selectObligationParticipantId)),
      filter(
        ([action, participantId]) =>
          !participantId || action.previous === participantId
      ),
      map(
        ([action]) =>
          new ObligationParticipantIdChange(
            action.current,
            /* triggerSearch */ true
          )
      )
    )
  );

  pageFirstLoadEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ObligationPageLoaded>(ObligationPageLoaded.Type),
      withLatestFrom(
        this.store.select(selectObligationIsFirstLoad),
        this.store.select(selectObligationParticipantId),
        this.store.select(selectShellParticipant)
      ),
      filter(
        ([_, firstLoad, participantId, participant]) =>
          firstLoad && participantId !== participant
      ),
      map(
        ([_, __, ___, participant]) =>
          new ObligationParticipantIdChange(
            participant,
            /* triggerSearch */ true
          )
      )
    )
  );

  pageDestroyedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ObligationPageDestroyed>(ObligationPageDestroyed.Type),
      mergeMap((action) =>
        of(new ObligationClearPageError(), new ObligationClearPageSuccess())
      )
    )
  );

  participantIdEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ObligationParticipantIdChange>(ObligationParticipantIdChange.Type),
      withLatestFrom(
        this.store.select(selectObligationParticipantIdError)
      ),
      filter(([_, participantIdError]) => !participantIdError),
      switchMap(([action]) =>
        this.coreService.getParticipant(action.participantId).pipe(
          map(
            (participant) =>
              new ObligationParticipantIdFound(
                participant.partId,
                action.triggerSearch
              )
          ),
          catchError((error) => of(new ObligationParticipantIdError(error)))
        )
      )
    )
  );

  participantIdChangeSearchEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ObligationParticipantIdFound>(ObligationParticipantIdFound.Type),
      filter((action) => action.triggerSearch),
      map((action) => new ObligationPageRefreshed())
    )
  );

  pageRefreshedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ObligationPageRefreshed>(ObligationPageRefreshed.Type),
      withLatestFrom(this.store.select(selectObligationFormDisabled)),
      filter(([_, formDisabled]) => !formDisabled),
      map((_) => new ObligationSummarySearch())
    )
  );

  formEnteredEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ObligationFormEnterKeyed>(ObligationFormEnterKeyed.Type),
      withLatestFrom(this.store.select(selectObligationFormDisabled)),
      filter(([_, formDisabled]) => !formDisabled),
      map((_) => new ObligationSummarySearch())
    )
  );

  searchSummaryEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ObligationSummarySearch>(ObligationSummarySearch.Type),
      withLatestFrom(this.store.select(selectObligationParticipantId)),
      switchMap(([action, participantId]) =>
        this.service.search(participantId).pipe(
          map((summary) => new ObligationSummaryFound(summary)),
          catchError((error) => {
            if (error.code === 500) {
              return of(new ObligationSummaryServerError(error.description));
            } else {
              return of(new ObligationSummaryError(error));
            }
          })
        )
      )
    )
  );

  openTradeEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ObligationTradesOpen>(ObligationTradesOpen.Type),
      map((action) => new ObligationTradesFetch(action.ticker))
    )
  );

  fetchTradeEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ObligationTradesFetch>(ObligationTradesFetch.Type),
      withLatestFrom(this.store.select(selectObligationSelectedItemId)),
      switchMap(([action, obligationId]) =>
        this.service.trades(obligationId, action.ticker).pipe(
          map((trades) => new ObligationTradesFound(trades)),
          catchError((error) => of(new ObligationTradesError(error)))
        )
      )
    )
  );

  openTransactionsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ObligationTransactionsOpen>(ObligationTransactionsOpen.Type),
      map((_) => new ObligationTransactionsFetch())
    )
  );

  // fetchTransactionsEffect$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType<ObligationTransactionsFetch>(ObligationTransactionsFetch.Type),
  //     withLatestFrom(this.store.select(selectObligationSelectedPendingId)),
  //     switchMap(([action, obligationId]) =>
  //       this.service.transactions(obligationId).pipe(
  //         map((transactions) => new ObligationTransactionsFound(transactions)),
  //         catchError((error) => of(new ObligationTransactionsError(error)))
  //       )
  //     )
  //   )
  // );

  constructor(
    private actions$: Actions,
    private service: ObligationService,
    private store: Store,
    private coreService: CoreService
  ) {}
}
