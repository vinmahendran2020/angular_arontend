import { IDashboardState } from '../../types';

import { ActionReducerMap } from '@ngrx/store';
import { reducer as positionReducer } from './position.reducer';
import { reducer as riskReducer } from './risk.reducer';
import { reducer as obligationReducer } from './obligation.reducer';
import { reducer as ccaReducer } from './cca.reducer';

export const reducers: ActionReducerMap<IDashboardState> = {
  position: positionReducer,
  risk: riskReducer,
  obligation: obligationReducer,
  cca: ccaReducer,
};
