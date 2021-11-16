import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import {
  TransactionClearPageError,
  TransactionClearPageSuccess,
  TransactionCurrentTabRefresh,
} from '../actions/transaction.actions';
import {
  CashClearPageError,
  CashClearPageSuccess,
  CashPageRefreshed,
} from '../actions/cash.actions';

import { selectCurrentTab } from '../selectors/module.selectors';

import {
  OrderClearPageError,
  OrderClearPageSuccess,
  OrderPageRefreshed,
} from '../actions/order.actions';
import {
  DeliveryClearPageError,
  DeliveryClearPageSuccess,
  DeliveryPageRefreshed,
} from '../actions/delivery.actions';
import {
  PrepositionClearPageError,
  PrepositionClearPageSuccess,
  PrepositionPageRefreshed,
} from '../actions/preposition.actions';
import {
  TradeClearPageError,
  TradeClearPageSuccess,
  TradePageRefreshed,
} from '../actions/trade.actions';
import {
  MemoClearPageError,
  MemoClearPageSuccess,
  MemoPageRefreshed,
} from '../actions/memo.actions';

@Injectable()
export class TransactionEffects {
  shellRefreshEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType('Shell/CurrentPageRefresh'),
      withLatestFrom(this.store.select(selectCurrentTab)),
      filter(([_, currentTab]) => currentTab !== 'none'),
      map(([_, currentTab]) => new TransactionCurrentTabRefresh(currentTab))
    )
  );

  shellClearErrorEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType('Shell/ClearPageError'),
      withLatestFrom(this.store.select(selectCurrentTab)),
      filter(([action, currentTab]) => currentTab !== 'none'),
      map(([action, currentTab]) => new TransactionClearPageError(currentTab))
    )
  );

  shellClearSuccessEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType('Shell/ClearPageSuccess'),
      withLatestFrom(this.store.select(selectCurrentTab)),
      filter(([action, currentTab]) => currentTab !== 'none'),
      map(([action, currentTab]) => new TransactionClearPageSuccess(currentTab))
    )
  );

  transactionRefreshEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<TransactionCurrentTabRefresh>(TransactionCurrentTabRefresh.Type),
      map(({ tab }) => {
        if (tab === 'cash') {
          return new CashPageRefreshed();
        } else if (tab === 'trade') {
          return new TradePageRefreshed();
        } else if (tab === 'delivery') {
          return new DeliveryPageRefreshed();
        } else if (tab === 'order') {
          return new OrderPageRefreshed();
        } else if (tab === 'memo') {
          return new MemoPageRefreshed();
        } else if (tab === 'preposition') {
          return new PrepositionPageRefreshed();
        }
        return { type: 'none' };
      }),
      filter((action) => action.type !== 'none')
    )
  );

  transactionClearPageErrorEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<TransactionClearPageError>(TransactionClearPageError.Type),
      map(({ tab }) => {
        if (tab === 'cash') {
          return new CashClearPageError();
        } else if (tab === 'trade') {
          return new TradeClearPageError();
        } else if (tab === 'delivery') {
          return new DeliveryClearPageError();
        } else if (tab === 'order') {
          return new OrderClearPageError();
        } else if (tab === 'memo') {
          return new MemoClearPageError();
        } else if (tab === 'preposition') {
          return new PrepositionClearPageError();
        }
        return { type: 'none' };
      }),
      filter((action) => action.type !== 'none')
    )
  );

  transactionClearPageSuccessEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<TransactionClearPageSuccess>(TransactionClearPageSuccess.Type),
      map(({ tab }) => {
        if (tab === 'cash') {
          return new CashClearPageSuccess();
        } else if (tab === 'trade') {
          return new TradeClearPageSuccess();
        } else if (tab === 'delivery') {
          return new DeliveryClearPageSuccess();
        } else if (tab === 'order') {
          return new OrderClearPageSuccess();
        } else if (tab === 'memo') {
          return new MemoClearPageSuccess();
        } else if (tab === 'preposition') {
          return new PrepositionClearPageSuccess();
        }
        return { type: 'none' };
      }),
      filter((action) => action.type !== 'none')
    )
  );

  constructor(private actions$: Actions, private store: Store) {}
}
