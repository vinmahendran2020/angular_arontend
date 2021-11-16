import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { TickerService } from '../../service/ticker.service';

import {
  TickerSearchError,
  TickerSearchFound,
  TickerSearch,
} from '../actions/ticker.actions';
import { selectTickerForm } from '../selectors/ticker.selectors';

@Injectable()
export class TickerEffects {
  searchSummaryEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<TickerSearch>(TickerSearch.Type),
      withLatestFrom(this.store.select(selectTickerForm)),
      mergeMap(([action, form]) =>
        this.service.search(form).pipe(
          map((result) => new TickerSearchFound(result)),
          catchError((error) => of(new TickerSearchError(error)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: TickerService,
    private store: Store
  ) {}
}
