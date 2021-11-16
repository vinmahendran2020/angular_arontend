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

import { PositionService } from '../../service/position.service';

import {
  PositionClearPageError,
  PositionFormEnterKeyed,
  PositionPageDestroyed,
  PositionPageRefreshed,
  PositionSummaryError,
  PositionSummaryServerError,
  PositionSummaryFound,
  PositionSummarySearch,
  PositionParticipantIdChange,
  PositionParticipantIdError,
  PositionParticipantIdFound,
  PositionClearPageSuccess,
  PositionPageLoaded,
} from '../actions/position.actions';
import {
  selectPositionCusip,
  selectPositionDate,
  selectPositionFormDisabled,
  selectPositionIsFirstLoad,
  selectPositionParticipantId,
  selectPositionParticipantIdError,
} from '../selectors/position.selectors';
import { selectShellParticipant } from '../selectors/shell.selectors';

@Injectable()
export class PositionEffects {
  shellParticipantSwitchedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<{
        type: 'Shell/ParticipantSwitched';
        current: string;
        previous: string;
      }>('Shell/ParticipantSwitched'),
      withLatestFrom(this.store.select(selectPositionParticipantId)),
      filter(
        ([action, participantId]) =>
          !participantId || action.previous === participantId
      ),
      map(
        ([action]) =>
          new PositionParticipantIdChange(
            action.current,
            /* triggerSearch */ true
          )
      )
    )
  );

  pageFirstLoadEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<PositionPageLoaded>(PositionPageLoaded.Type),
      withLatestFrom(
        this.store.select(selectPositionIsFirstLoad),
        this.store.select(selectPositionParticipantId),
        this.store.select(selectShellParticipant)
      ),
      filter(
        ([_, firstLoad, participantId, participant]) =>
          firstLoad && participantId !== participant
      ),
      map(
        ([_, __, ___, participant]) =>
          new PositionParticipantIdChange(participant, /* triggerSearch */ true)
      )
    )
  );

  pageDestroyedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<PositionPageDestroyed>(PositionPageDestroyed.Type),
      mergeMap((action) =>
        of(new PositionClearPageError(), new PositionClearPageSuccess())
      )
    )
  );

  participantIdEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<PositionParticipantIdChange>(PositionParticipantIdChange.Type),
      withLatestFrom(
        this.store.select(selectPositionParticipantIdError)
      ),
      filter(([_, participantIdError]) => !participantIdError),
      switchMap(([action]) =>
        this.coreService.getParticipant(action.participantId).pipe(
          map(
            (participant) =>
              new PositionParticipantIdFound(
                participant.partId,
                action.triggerSearch
              )
          ),
          catchError((error) => of(new PositionParticipantIdError(error)))
        )
      )
    )
  );

  participantIdChangeSearchEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<PositionParticipantIdFound>(PositionParticipantIdFound.Type),
      filter((action) => action.triggerSearch),
      map((action) => new PositionPageRefreshed())
    )
  );

  pageRefreshedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<PositionPageRefreshed>(PositionPageRefreshed.Type),
      withLatestFrom(this.store.select(selectPositionFormDisabled)),
      filter(([_, formDisabled]) => !formDisabled),
      map((_) => new PositionSummarySearch())
    )
  );

  formEnteredEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<PositionFormEnterKeyed>(PositionFormEnterKeyed.Type),
      withLatestFrom(this.store.select(selectPositionFormDisabled)),
      filter(([_, formDisabled]) => !formDisabled),
      map((_) => new PositionSummarySearch())
    )
  );

  searchSummaryEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<PositionSummarySearch>(PositionSummarySearch.Type),
      withLatestFrom(
        this.store.select(selectPositionParticipantId),
        this.store.select(selectPositionCusip),
        this.store.select(selectPositionDate)
      ),
      switchMap(([action, participantId, cusip, date]) =>
        this.service.search(participantId, cusip, date).pipe(
          map((summary) => new PositionSummaryFound(summary)),
          catchError((error) => {
            if (error.code === 500) {
              return of(new PositionSummaryServerError(error.description));
            } else {
              return of(new PositionSummaryError(error));
            }
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: PositionService,
    private store: Store,
    private coreService: CoreService
  ) {}
}
