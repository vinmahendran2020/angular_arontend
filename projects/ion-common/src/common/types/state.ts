import { ICusipState } from './cusip';
import { ITickerState } from './ticker';

export interface ICommonState {
  cusip?: ICusipState;
  ticker?: ITickerState;
}
