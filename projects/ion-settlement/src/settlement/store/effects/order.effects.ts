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
import { OrderService } from '../../service/order.service';
import { FormParticipantIdError } from '../actions/form.actions';

import {
  OrderClearPageError,
  OrderPageDestroyed,
  OrderSummaryError,
  OrderSummaryServerError,
  OrderSummaryFound,
  OrderSummarySearch,
  OrderClearPageSuccess,
} from '../actions/order.actions';
import {
  selectFormBusinessDate,
  selectFormParticipantId,
} from '../selectors/form.selectors';

@Injectable()
export class OrderEffects {
  pageDestroyedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<OrderPageDestroyed>(OrderPageDestroyed.Type),
      mergeMap((action) =>
        of(new OrderClearPageError(), new OrderClearPageSuccess())
      )
    )
  );

  searchSummaryEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<OrderSummarySearch>(OrderSummarySearch.Type),
      withLatestFrom(
        this.store.select(selectFormParticipantId),
        this.store.select(selectFormBusinessDate)
      ),
      switchMap(([action, participantId, businessDate]) =>
        this.service.search(participantId, businessDate).pipe(
          map((order) => new OrderSummaryFound(order)),
          catchError((error) => {
            if (error.code === 500) {
              return of(new OrderSummaryServerError(error.description));
            } else {
              return of(
                new OrderSummaryError(error),
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
    private service: OrderService,
    private store: Store
  ) {}
}
