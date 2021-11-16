import * as fromRouter from '@ngrx/router-store';

import { INettingState } from './netting';
import { ISecurityState } from './security';
import { ICashState } from './cash';
import { IStartState } from './start';
import { IEndState } from './end';

export type ICurrentTab = 'netting' | 'security' | 'cash' | 'start' | 'end' | 'none';

export interface IAdminState {
  readonly netting?: INettingState;
  readonly security?: ISecurityState;
  readonly cash?: ICashState;
  readonly start?: IStartState;
  readonly end?: IEndState;
}

export type IRouterState = fromRouter.RouterReducerState<any>;
