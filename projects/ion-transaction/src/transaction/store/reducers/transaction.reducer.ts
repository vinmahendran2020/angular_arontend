import { ITransactionState } from '../../types';

import { ActionReducerMap } from '@ngrx/store';
import { reducer as tradeReducer } from './trade.reducer.';
import { reducer as cashReducer } from './cash.reducer';
import { reducer as orderReducer } from './order.reducer';
import { reducer as deliveryReducer } from './delivery.reducer';
import { reducer as memoReducer } from './memo.reducer';
import { reducer as prepositionReducer } from './preposition.reducer';

export const reducers: ActionReducerMap<ITransactionState> = {
  trade: tradeReducer,
  cash: cashReducer,
  order: orderReducer,
  delivery: deliveryReducer,
  memo: memoReducer,
  preposition: prepositionReducer,
};
