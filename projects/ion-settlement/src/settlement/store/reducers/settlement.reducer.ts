import { ISettlementState } from '../../types';

import { ActionReducerMap } from '@ngrx/store';
import { reducer as targetReducer } from './target.reducer';
import { reducer as formReducer } from './form.reducer';
import { reducer as cashReducer } from './cash.reducer';
import { reducer as memoReducer } from './memo.reducer';
import { reducer as orderReducer } from './order.reducer';
import { reducer as movementReducer } from './movement.reducer';
import { reducer as obligationReducer } from './obligation.reducer';
import { reducer as adjustmentReducer } from './adjustment.reducer';
import { reducer as prepositionReducer } from './preposition.reducer';

export const reducers: ActionReducerMap<ISettlementState> = {
  form: formReducer,
  cash: cashReducer,
  memo: memoReducer,
  order: orderReducer,
  movement: movementReducer,
  adjustment: adjustmentReducer,
  obligation: obligationReducer,
  preposition: prepositionReducer,
  pageTarget: targetReducer,
};
