import * as fromRouter from '@ngrx/router-store';

import { ICashState } from './cash';
import { ISettlementForm } from './form';
import { IMemoState } from './memo';
import { IOrderState } from './order';
import { IMovementState } from './movement';
import { IObligationState } from './obligation';
import { IAdjustmentState } from './adjustment';
import { IPrepositionState } from './preposition';

export type ICurrentTab =
  | 'obligation'
  | 'order'
  | 'preposition'
  | 'memo'
  | 'adjustment'
  | 'movement'
  | 'cash'
  | 'none';

export interface ISettlementState {
  form: ISettlementForm;
  cash: ICashState;
  memo: IMemoState;
  order: IOrderState;
  movement: IMovementState;
  obligation: IObligationState;
  adjustment: IAdjustmentState;
  preposition: IPrepositionState;
  pageTarget: string | null;
}

export type IRouterState = fromRouter.RouterReducerState<any>;
