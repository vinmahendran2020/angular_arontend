import * as fromRouter from '@ngrx/router-store';

import { IPositionState } from './position';
import { IRiskState } from './risk';
import { IObligationState } from './obligation';
import { ICCAState } from './cca';

export type ICurrentTab = 'position' | 'risk' | 'obligation' | 'cca' | 'none';

export interface IDashboardState {
  position?: IPositionState;
  risk?: IRiskState;
  obligation?: IObligationState;
  cca?: ICCAState;
}

export type IRouterState = fromRouter.RouterReducerState<any>;
