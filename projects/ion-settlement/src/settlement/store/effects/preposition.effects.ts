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

import { PrepositionService } from '../../service/preposition.service';
import { FormParticipantIdError } from '../actions/form.actions';

import {
  PrepositionClearPageError,
  PrepositionPageDestroyed,
  PrepositionSummaryError,
  PrepositionSummaryServerError,
  PrepositionSummaryFound,
  PrepositionSummarySearch,
  PrepositionClearPageSuccess,
} from '../actions/preposition.actions';
import {
  selectFormBusinessDate,
  selectFormParticipantId,
} from '../selectors/form.selectors';

@Injectable()
export class PrepositionEffects {
  pageDestroyedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<PrepositionPageDestroyed>(PrepositionPageDestroyed.Type),
      mergeMap((action) =>
        of(new PrepositionClearPageError(), new PrepositionClearPageSuccess())
      )
    )
  );

  searchSummaryEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<PrepositionSummarySearch>(PrepositionSummarySearch.Type),
      withLatestFrom(
        this.store.select(selectFormParticipantId),
        this.store.select(selectFormBusinessDate)
      ),
      switchMap(([action, participantId, businessDate]) =>
        this.service.search(participantId, businessDate).pipe(
          map((preposition) => new PrepositionSummaryFound(preposition)),
          catchError((error) => {
            if (error.code === 500) {
              return of(new PrepositionSummaryServerError(error.description));
            } else {
              return of(
                new PrepositionSummaryError(error),
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
    private service: PrepositionService,
    private store: Store
  ) {}
}
