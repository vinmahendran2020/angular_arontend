import * as fromRouter from '@ngrx/router-store';

import { ICashState } from './cash';
import { IOrderState } from './order';
import { IDeliveryState } from './delivery';
import { IMemoState } from './memo';
import { IPrepositionState } from './preposition';
import { ITradeState } from './trade';

export type ICurrentTab =
  | 'trade'
  | 'cash'
  | 'order'
  | 'delivery'
  | 'memo'
  | 'preposition'
  | 'none';

export interface ITransactionState {
  trade?: ITradeState;
  cash?: ICashState;
  order?: IOrderState;
  delivery?: IDeliveryState;
  memo?: IMemoState;
  preposition?: IPrepositionState;
}

export type IRouterState = fromRouter.RouterReducerState<any>;
