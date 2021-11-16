import { IAdminState } from '../../types';

import { ActionReducerMap } from '@ngrx/store';
import { reducer as nettingReducer } from './netting.reducer';
import { reducer as securityReducer } from './security.reducer';
import { reducer as cashReducer } from './cash.reducer';
import { reducer as startReducer } from './start.reducer';
import { reducer as endReducer } from './end.reducer';

export const reducers: ActionReducerMap<IAdminState> = {
  netting: nettingReducer,
  security: securityReducer,
  cash: cashReducer,
  start: startReducer,
  end: endReducer
};
