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
import { MemoService } from '../../service/memo.service';
import { FormParticipantIdError } from '../actions/form.actions';

import {
  MemoClearPageError,
  MemoPageDestroyed,
  MemoSummaryError,
  MemoSummaryServerError,
  MemoSummaryFound,
  MemoSummarySearch,
  MemoClearPageSuccess,
} from '../actions/memo.actions';
import {
  selectFormBusinessDate,
  selectFormParticipantId,
} from '../selectors/form.selectors';

@Injectable()
export class MemoEffects {
  pageDestroyedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<MemoPageDestroyed>(MemoPageDestroyed.Type),
      mergeMap((action) =>
        of(new MemoClearPageError(), new MemoClearPageSuccess())
      )
    )
  );

  searchSummaryEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<MemoSummarySearch>(MemoSummarySearch.Type),
      withLatestFrom(
        this.store.select(selectFormParticipantId),
        this.store.select(selectFormBusinessDate)
      ),
      switchMap(([action, participantId, businessDate]) =>
        this.service.search(participantId, businessDate).pipe(
          map((memo) => new MemoSummaryFound(memo)),
          catchError((error) => {
            if (error.code === 500) {
              return of(new MemoSummaryServerError(error.description));
            } else {
              return of(
                new MemoSummaryError(error),
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
    private service: MemoService,
    private store: Store
  ) {}
}
