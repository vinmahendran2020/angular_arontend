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

import { PrepositionService } from '../../service/preposition.service';

import {
  PrepositionClearPageError,
  PrepositionPageDestroyed,
  PrepositionParticipantIdChange,
  PrepositionParticipantIdFound,
  PrepositionParticipantIdError,
  PrepositionCusipChangeForId,
  PrepositionCusipFoundForId,
  PrepositionCusipErrorForId,
  PrepositionSubmit,
  PrepositionSubmitSuccess,
  PrepositionSubmitError,
  PrepositionSubmitFailure,
  PrepositionClearPageSuccess,
  PrepositionPageLoaded,
} from '../actions/preposition.actions';
import {
  selectPrepositionCusipErrorForId,
  selectPrepositionCusipForId,
  selectPrepositionIsFirstLoad,
  selectPrepositionParticipantId,
  selectPrepositionParticipantIdError,
  selectSubmitPrepositions,
} from '../selectors/preposition.selectors';
import { selectShellParticipant } from '../selectors/shell.selectors';

@Injectable()
export class PrepositionEffects {
  shellParticipantSwitchedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<{
        type: 'Shell/ParticipantSwitched';
        current: string;
        previous: string;
      }>('Shell/ParticipantSwitched'),
      withLatestFrom(this.store.select(selectPrepositionParticipantId)),
      filter(
        ([action, participantId]) =>
          !participantId || action.previous === participantId
      ),
      map(([action]) => new PrepositionParticipantIdChange(action.current))
    )
  );

  pageFirstLoadEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<PrepositionPageLoaded>(PrepositionPageLoaded.Type),
      withLatestFrom(
        this.store.select(selectPrepositionIsFirstLoad),
        this.store.select(selectPrepositionParticipantId),
        this.store.select(selectShellParticipant)
      ),
      filter(
        ([_, firstLoad, participantId, participant]) =>
          firstLoad && participantId !== participant
      ),
      map(
        ([_, __, ___, participant]) =>
          new PrepositionParticipantIdChange(participant)
      )
    )
  );

  pageDestroyedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<PrepositionPageDestroyed>(PrepositionPageDestroyed.Type),
      mergeMap((action) =>
        of(new PrepositionClearPageError(), new PrepositionClearPageSuccess())
      )
    )
  );

  participantIdEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<PrepositionParticipantIdChange>(
        PrepositionParticipantIdChange.Type
      ),
      withLatestFrom(this.store.select(selectPrepositionParticipantIdError)),
      filter(([_, participantIdError]) => !participantIdError),
      switchMap(([action]) =>
        this.coreService.getParticipant(action.participantId).pipe(
          map(
            (participant) =>
              new PrepositionParticipantIdFound(participant.partId)
          ),
          catchError((error) => of(new PrepositionParticipantIdError(error)))
        )
      )
    )
  );

  cusipIdEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<PrepositionCusipChangeForId>(PrepositionCusipChangeForId.Type),
      switchMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.select(selectPrepositionCusipForId, action.id),
            this.store.select(selectPrepositionCusipErrorForId, action.id)
          ),
          filter(([_, __, cusipIdError]) => !cusipIdError),
          switchMap(([caction, cusipId]) =>
            this.coreService.getCusip(cusipId).pipe(
              map((cusip) => new PrepositionCusipFoundForId(caction.id, cusip)),
              catchError((error) =>
                of(new PrepositionCusipErrorForId(caction.id, error))
              )
            )
          )
        )
      )
    )
  );

  submitEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<PrepositionSubmit>(PrepositionSubmit.Type),
      withLatestFrom(
        this.store.select(selectPrepositionParticipantId),
        this.store.select(selectSubmitPrepositions)
      ),
      switchMap(([action, participantId, pledges]) =>
        this.service.submit(participantId, pledges).pipe(
          mergeMap((results) => {
            const actions: Array<
              PrepositionSubmitSuccess | PrepositionSubmitFailure
            > = [];
            const successes = results
              .filter((x) => x.status === 200)
              .map((x) => x.rowNo);
            const failures = results
              .filter((x) => x.status !== 200)
              .map((x) => x.rowNo);
            if (successes.length) {
              actions.push(new PrepositionSubmitSuccess(successes));
            }
            if (failures.length) {
              actions.push(new PrepositionSubmitFailure(failures));
            }
            return of(...actions);
          }),
          catchError((error) =>
            of(new PrepositionSubmitError(error.description || error))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: PrepositionService,
    private store: Store,
    private coreService: CoreService
  ) {}
}
