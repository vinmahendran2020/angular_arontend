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
import { CashService } from '../../service/cash.service';

import {
  CashClearPageError,
  CashPageDestroyed,
  CashSummaryError,
  CashSummaryServerError,
  CashSummaryFound,
  CashSummarySearch,
  CashClearPageSuccess,
} from '../actions/cash.actions';
import { FormParticipantIdError } from '../actions/form.actions';
import {
  selectFormBusinessDate,
  selectFormParticipantId,
} from '../selectors/form.selectors';

@Injectable()
export class CashEffects {
  pageDestroyedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<CashPageDestroyed>(CashPageDestroyed.Type),
      mergeMap((action) =>
        of(new CashClearPageError(), new CashClearPageSuccess())
      )
    )
  );

  searchSummaryEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<CashSummarySearch>(CashSummarySearch.Type),
      withLatestFrom(
        this.store.select(selectFormParticipantId),
        this.store.select(selectFormBusinessDate)
      ),
      switchMap(([action, participantId, businessDate]) =>
        this.service.search(participantId, businessDate).pipe(
          map((cash) => new CashSummaryFound(cash)),
          catchError((error) => {
            if (error.code === 500) {
              return of(new CashSummaryServerError(error.description));
            } else {
              return of(
                new CashSummaryError(error),
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
    private service: CashService,
    private store: Store
  ) {}
}
