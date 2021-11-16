import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { MovementService } from '../../service/movement.service';
import { FormParticipantIdError } from '../actions/form.actions';

import {
  MovementClearPageError,
  MovementPageDestroyed,
  MovementSummaryError,
  MovementSummaryServerError,
  MovementSummaryFound,
  MovementSummarySearch,
  MovementClearPageSuccess,
} from '../actions/movement.actions';
import {
  selectFormBusinessDate,
  selectFormParticipantId,
} from '../selectors/form.selectors';

@Injectable()
export class MovementEffects {
  pageDestroyedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<MovementPageDestroyed>(MovementPageDestroyed.Type),
      mergeMap((action) =>
        of(new MovementClearPageError(), new MovementClearPageSuccess())
      )
    )
  );

  searchSummaryEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<MovementSummarySearch>(MovementSummarySearch.Type),
      withLatestFrom(
        this.store.select(selectFormParticipantId),
        this.store.select(selectFormBusinessDate)
      ),
      switchMap(([action, participantId, businessDate]) =>
        this.service.search(participantId, businessDate).pipe(
          map((movement) => new MovementSummaryFound(movement)),
          catchError((error) => {
            if (error.code === 500) {
              return of(new MovementSummaryServerError(error.description));
            } else {
              return of(
                new MovementSummaryError(error),
                new FormParticipantIdError(
                  'No information found for this Participant ID'
                )
              );
            }
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: MovementService,
    private store: Store
  ) {}
}
