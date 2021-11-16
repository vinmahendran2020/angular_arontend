import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  switchMap,
  withLatestFrom,
  mergeMap,
} from 'rxjs/operators';

import { CoreService } from 'ion-core';

import { CashService } from '../../service/cash.service';

import {
  CashClearPageError,
  CashFormEnterKeyed,
  CashPageDestroyed,
  CashPageRefreshed,
  CashSummaryError,
  CashSummaryServerError,
  CashSummaryFound,
  CashSummarySearch,
  CashParticipantIdChange,
  CashParticipantIdError,
  CashParticipantIdFound,
  CashClearPageSuccess,
  CashPageLoaded,
  CashActivitySubmit,
  CashActivitySubmitResult,
  CashActivitySubmitError,
} from '../actions/cash.actions';
import {
  selectCashFormDisabled,
  selectCashParticipantId,
  selectCashIsFirstLoad,
  selectCashActivityAmount,
  selectCashActivityOperation,
  selectCashParticipantIdError,
} from '../selectors/cash.selectors';

import { selectShellParticipant } from '../selectors/shell.selectors';

@Injectable()
export class CashEffects {
  shellParticipantSwitchedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<{
        type: 'Shell/ParticipantSwitched';
        current: string;
        previous: string;
      }>('Shell/ParticipantSwitched'),
      withLatestFrom(this.store.select(selectCashParticipantId)),
      filter(
        ([action, participantId]) =>
          !participantId || action.previous === participantId
      ),
      map(
        ([action]) =>
          new CashParticipantIdChange(action.current, /* triggerSearch */ true)
      )
    )
  );

  pageFirstLoadEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<CashPageLoaded>(CashPageLoaded.Type),
      withLatestFrom(
        this.store.select(selectCashIsFirstLoad),
        this.store.select(selectCashParticipantId),
        this.store.select(selectShellParticipant)
      ),
      filter(
        ([_, firstLoad, participantId, participant]) =>
          firstLoad && participantId !== participant
      ),
      map(
        ([_, __, ___, participant]) =>
          new CashParticipantIdChange(participant, /* triggerSearch */ true)
      )
    )
  );

  pageDestroyedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<CashPageDestroyed>(CashPageDestroyed.Type),
      mergeMap((action) =>
        of(new CashClearPageError(), new CashClearPageSuccess())
      )
    )
  );

  participantIdEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<CashParticipantIdChange>(CashParticipantIdChange.Type),
      filter((action) => !!action.participantId),
      withLatestFrom(
        this.store.select(selectCashParticipantIdError)
      ),
      filter(([_, participantIdError]) => !participantIdError),
      switchMap(([action]) =>
        this.coreService.getParticipant(action.participantId).pipe(
          map(
            (participant) =>
              new CashParticipantIdFound(
                participant.partId,
                action.triggerSearch
              )
          ),
          catchError((error) => of(new CashParticipantIdError(error)))
        )
      )
    )
  );

  participantIdChangeSearchEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<CashParticipantIdFound>(CashParticipantIdFound.Type),
      map((action) => new CashPageRefreshed())
    )
  );

  pageRefreshedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<CashPageRefreshed>(CashPageRefreshed.Type),
      withLatestFrom(this.store.select(selectCashFormDisabled)),
      filter(([_, formDisabled]) => !formDisabled),
      map((_) => new CashSummarySearch())
    )
  );

  formEnteredEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<CashFormEnterKeyed>(CashFormEnterKeyed.Type),
      withLatestFrom(this.store.select(selectCashFormDisabled)),
      filter(([_, formDisabled]) => !formDisabled),
      map((_) => new CashSummarySearch())
    )
  );

  searchSummaryEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<CashSummarySearch>(CashSummarySearch.Type),
      withLatestFrom(this.store.select(selectCashParticipantId)),
      switchMap(([action, participantId]) =>
        this.service.search(participantId).pipe(
          map((summary) => new CashSummaryFound(summary)),
          catchError((error) => {
            if (error.code === 500) {
              return of(new CashSummaryServerError(error.description));
            } else {
              return of(new CashSummaryError(error));
            }
          })
        )
      )
    )
  );

  submitEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<CashActivitySubmit>(CashActivitySubmit.Type),
      withLatestFrom(
        this.store.select(selectCashParticipantId),
        this.store.select(selectCashActivityOperation),
        this.store.select(selectCashActivityAmount)
      ),
      mergeMap(([action, participantId, operation, amount]) =>
        this.service.submit(participantId, operation, amount).pipe(
          map((message) => new CashActivitySubmitResult(message)),
          catchError((error) => of(new CashActivitySubmitError(error)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: CashService,
    private store: Store,
    private coreService: CoreService
  ) {}
}
