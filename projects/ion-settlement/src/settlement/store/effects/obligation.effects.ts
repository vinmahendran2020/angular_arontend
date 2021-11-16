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
import { ObligationService } from '../../service/obligation.service';
import { FormParticipantIdError } from '../actions/form.actions';

import {
  ObligationClearPageError,
  ObligationPageDestroyed,
  ObligationSummaryError,
  ObligationSummaryServerError,
  ObligationSummaryFound,
  ObligationSummarySearch,
  ObligationClearPageSuccess,
} from '../actions/obligation.actions';
import {
  selectFormBusinessDate,
  selectFormParticipantId,
} from '../selectors/form.selectors';

@Injectable()
export class ObligationEffects {
  pageDestroyedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ObligationPageDestroyed>(ObligationPageDestroyed.Type),
      mergeMap((action) =>
        of(new ObligationClearPageError(), new ObligationClearPageSuccess())
      )
    )
  );

  searchSummaryEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ObligationSummarySearch>(ObligationSummarySearch.Type),
      withLatestFrom(
        this.store.select(selectFormParticipantId),
        this.store.select(selectFormBusinessDate)
      ),
      switchMap(([action, participantId, businessDate]) =>
        this.service.search(participantId, businessDate).pipe(
          map((obligation) => new ObligationSummaryFound(obligation)),
          catchError((error) => {
            if (error.code === 500) {
              return of(new ObligationSummaryServerError(error.description));
            } else {
              return of(
                new ObligationSummaryError(error),
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
    private service: ObligationService,
    private store: Store
  ) {}
}
