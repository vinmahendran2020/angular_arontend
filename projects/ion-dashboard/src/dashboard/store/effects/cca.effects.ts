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

import { CCAService } from '../../service/cca.service';

import {
  CCAParticipantIdChange,
  CCAParticipantIdError,
  CCASummaryError,
  CCASummaryServerError,
  CCASummaryFound,
  CCASummarySearch,
  CCADetailFetch,
  CCADetailFound,
  CCADetailError,
  CCADetailOpen,
  CCAClearPageError,
  CCAPageDestroyed,
  CCAPageRefreshed,
  CCAFormEnterKeyed,
  CCAParticipantIdFound,
  CCAClearPageSuccess,
  CCAPageLoaded,
} from '../actions/cca.actions';
import {
  selectCCAForm,
  selectCCAFormDisabled,
  selectCCASelectedItemId,
  selectCCAParticipantIdError,
  selectCCAParticipantId,
  selectCCAIsFirstLoad,
} from '../selectors/cca.selectors';
import { selectShellParticipant } from '../selectors/shell.selectors';

@Injectable()
export class CCAEffects {
  shellParticipantSwitchedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<{
        type: 'Shell/ParticipantSwitched';
        current: string;
        previous: string;
      }>('Shell/ParticipantSwitched'),
      withLatestFrom(this.store.select(selectCCAParticipantId)),
      filter(
        ([action, participantId]) =>
          !participantId || action.previous === participantId
      ),
      map(
        ([action]) =>
          new CCAParticipantIdChange(action.current, /* triggerSearch */ true)
      )
    )
  );

  pageFirstLoadEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<CCAPageLoaded>(CCAPageLoaded.Type),
      withLatestFrom(
        this.store.select(selectCCAIsFirstLoad),
        this.store.select(selectCCAParticipantId),
        this.store.select(selectShellParticipant)
      ),
      filter(
        ([_, firstLoad, participantId, participant]) =>
          firstLoad && participantId !== participant
      ),
      map(
        ([_, __, ___, participant]) =>
          new CCAParticipantIdChange(participant, /* triggerSearch */ true)
      )
    )
  );

  pageDestroyedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<CCAPageDestroyed>(CCAPageDestroyed.Type),
      mergeMap((action) =>
        of(new CCAClearPageError(), new CCAClearPageSuccess())
      )
    )
  );

  participantIdEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<CCAParticipantIdChange>(CCAParticipantIdChange.Type),
      withLatestFrom(
        this.store.select(selectCCAParticipantIdError)
      ),
      filter(([_, participantIdError]) => !participantIdError),
      switchMap(([action]) =>
        this.coreService.getParticipant(action.participantId).pipe(
          map(
            (participant) =>
              new CCAParticipantIdFound(
                participant.partId,
                action.triggerSearch
              )
          ),
          catchError((error) => of(new CCAParticipantIdError(error)))
        )
      )
    )
  );

  participantIdChangeSearchEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<CCAParticipantIdFound>(CCAParticipantIdFound.Type),
      filter((action) => action.triggerSearch),
      map((action) => new CCAPageRefreshed())
    )
  );

  pageRefreshedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<CCAPageRefreshed>(CCAPageRefreshed.Type),
      withLatestFrom(this.store.select(selectCCAFormDisabled)),
      filter(([_, formDisabled]) => !formDisabled),
      map((_) => new CCASummarySearch())
    )
  );

  formEnteredEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<CCAFormEnterKeyed>(CCAFormEnterKeyed.Type),
      withLatestFrom(this.store.select(selectCCAFormDisabled)),
      filter(([_, formDisabled]) => !formDisabled),
      map((_) => new CCASummarySearch())
    )
  );

  searchSummaryEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<CCASummarySearch>(CCASummarySearch.Type),
      withLatestFrom(this.store.select(selectCCAForm)),
      switchMap(([action, form]) =>
        this.service
          .search(
            form.participantId.value,
            form.settlementDate.value[0],
            form.settlementDate.value[1]
          )
          .pipe(
            map((summary) => new CCASummaryFound(summary)),
            catchError((error) => {
              if (error.code === 500) {
                return of(new CCASummaryServerError(error.description));
              } else {
                return of(new CCASummaryError(error));
              }
            })
          )
      )
    )
  );

  openTransacctionsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<CCADetailOpen>(CCADetailOpen.Type),
      map((_) => new CCADetailFetch())
    )
  );

  fetchTransactionsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<CCADetailFetch>(CCADetailFetch.Type),
      withLatestFrom(this.store.select(selectCCASelectedItemId)),
      switchMap(([action, ccaId]) =>
        this.service.transactions(ccaId).pipe(
          map((transactions) => new CCADetailFound(transactions)),
          catchError((error) => of(new CCADetailError(error)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: CCAService,
    private store: Store,
    private coreService: CoreService
  ) {}
}
