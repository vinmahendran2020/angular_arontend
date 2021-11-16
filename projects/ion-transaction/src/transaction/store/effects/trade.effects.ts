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
import { TradeService } from '../../service/trade.service';

import {
  TradeClearPageError,
  TradeFormEnterKeyed,
  TradePageDestroyed,
  TradePageRefreshed,
  LoadParticipants,
  LoadSecurities,
  TradeSummaryError,
  TradeSummaryServerError,
  TradeSummaryFound,
  TradeSummarySearch,
  TradeClearPageSuccess,
  TradePageLoaded,
  TradeDetailSubmit,
  TradeSubmitSuccess,
  TradeSubmitError,
} from '../actions/trade.actions';
import {
  selectTradeFormDisabled,
  selectTradeIsFirstLoad,
  selectTradeState,
  selectTradeSummary,
} from '../selectors/trade.selectors';

@Injectable()
export class TradeEffects {
  pageDestroyedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<TradePageDestroyed>(TradePageDestroyed.Type),
      mergeMap((action) =>
        of(new TradeClearPageError(), new TradeClearPageSuccess())
      )
    )
  );

  loadParticipantsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<TradePageLoaded>(TradePageLoaded.Type),
      withLatestFrom(this.store.select(selectTradeIsFirstLoad)),
      mergeMap((_) =>
        this.service.listParticipants().pipe(
          filter((participants) => participants !== null),
          mergeMap((participants) =>
            of(new LoadParticipants(participants), new TradePageRefreshed())
          )
        )
      )
    )
  );

  loadCusipsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<TradePageLoaded>(TradePageLoaded.Type),
      withLatestFrom(this.store.select(selectTradeIsFirstLoad)),
      mergeMap((_) =>
        this.service.listSecurities().pipe(
          filter((cusips) => cusips !== null),
          mergeMap((cusips) =>
            of(new LoadSecurities(cusips), new TradePageRefreshed())
          )
        )
      )
    )
  );

  pageRefreshedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<TradePageRefreshed>(TradePageRefreshed.Type),
      withLatestFrom(this.store.select(selectTradeFormDisabled)),
      filter(([_, formDisabled]) => !formDisabled),
      map((_) => new TradeSummarySearch())
    )
  );

  formEnteredEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<TradeFormEnterKeyed>(TradeFormEnterKeyed.Type),
      withLatestFrom(this.store.select(selectTradeFormDisabled)),
      filter(([_, formDisabled]) => !formDisabled),
      map((_) => new TradeSummarySearch())
    )
  );

  searchSummaryEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<TradeSummarySearch>(TradeSummarySearch.Type),
      withLatestFrom(this.store.select(selectTradeState)),
      switchMap(([action, state]) =>
        this.service.generateTrades(state).pipe(
          map((trades) => new TradeSummaryFound({ trades })),
          catchError((error) => {
            if (error.code === 500) {
              return of(new TradeSummaryServerError(error.description));
            } else {
              return of(new TradeSummaryError(error));
            }
          })
        )
      )
    )
  );

  submitTradesEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<TradeDetailSubmit>(TradeDetailSubmit.Type),
      withLatestFrom(this.store.select(selectTradeSummary)),
      switchMap(([action, summary]) =>
        this.service.submitTrades(summary).pipe(
          map((response) => new TradeSubmitSuccess()),
          catchError((error) => of(new TradeSubmitError(error)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: TradeService,
    private store: Store
  ) {}
}
