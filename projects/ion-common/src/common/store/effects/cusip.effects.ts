import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { CusipService } from '../../service/cusip.service';

import {
  CusipSearchError,
  CusipSearchFound,
  CusipSearch,
} from '../actions/cusip.actions';
import { selectCusipForm } from '../selectors/cusip.selectors';

@Injectable()
export class CusipEffects {
  searchSummaryEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<CusipSearch>(CusipSearch.Type),
      withLatestFrom(this.store.select(selectCusipForm)),
      mergeMap(([action, form]) =>
        this.service.search(form).pipe(
          map((result) => new CusipSearchFound(result)),
          catchError((error) => of(new CusipSearchError(error)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: CusipService,
    private store: Store
  ) {}
}
