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
import { AdjustmentService } from '../../service/adjustment.service';

import {
  AdjustmentClearPageError,
  AdjustmentPageDestroyed,
  AdjustmentSummaryError,
  AdjustmentSummaryServerError,
  AdjustmentSummaryFound,
  AdjustmentSummarySearch,
  AdjustmentClearPageSuccess,
} from '../actions/adjustment.actions';
import { FormParticipantIdError } from '../actions/form.actions';
import {
  selectFormBusinessDate,
  selectFormParticipantId,
} from '../selectors/form.selectors';

@Injectable()
export class AdjustmentEffects {
  pageDestroyedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<AdjustmentPageDestroyed>(AdjustmentPageDestroyed.Type),
      mergeMap((action) =>
        of(new AdjustmentClearPageError(), new AdjustmentClearPageSuccess())
      )
    )
  );

  searchSummaryEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<AdjustmentSummarySearch>(AdjustmentSummarySearch.Type),
      withLatestFrom(
        this.store.select(selectFormParticipantId),
        this.store.select(selectFormBusinessDate)
      ),
      switchMap(([action, participantId, businessDate]) =>
        this.service.search(participantId, businessDate).pipe(
          map((adjustment) => new AdjustmentSummaryFound(adjustment)),
          catchError((error) => {
            if (error.code === 500) {
              return of(new AdjustmentSummaryServerError(error.description));
            } else {
              return of(
                new AdjustmentSummaryError(error),
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
    private service: AdjustmentService,
    private store: Store
  ) {}
}
