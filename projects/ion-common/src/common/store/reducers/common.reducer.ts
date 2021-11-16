import { ICommonState } from '../../types';

import { ActionReducerMap } from '@ngrx/store';
import { reducer as cusipReducer } from './cusip.reducer';
import { reducer as tickerReducer } from './ticker.reducer';

export const reducers: ActionReducerMap<ICommonState> = {
  cusip: cusipReducer,
  ticker: tickerReducer,
};
