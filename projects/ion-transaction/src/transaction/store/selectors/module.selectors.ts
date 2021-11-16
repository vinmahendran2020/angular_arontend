import * as fromRouter from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IRouterState, ITransactionState, ICurrentTab } from '../../types';

export const selectRouterState = createFeatureSelector<
  { router: IRouterState },
  fromRouter.RouterReducerState<any>
>('router');

export const {
  selectUrl, // select the current url
} = fromRouter.getSelectors(selectRouterState);

export const selectTransactionState = createFeatureSelector<ITransactionState>(
  'transaction'
);

export const selectCurrentTab = createSelector(
  selectUrl,
  (url: string): ICurrentTab => {
    const path = (url || '').toLowerCase();
    if (path.includes('cash')) {
      return 'cash' as const;
    } else if (path.includes('order')) {
      return 'order' as const;
    } else if (path.includes('memo')) {
      return 'memo' as const;
    }else if (path.includes('preposition')) {
      return 'preposition' as const;
    } else if (path.includes('delivery')) {
      return 'delivery' as const;
    }
    return 'none' as const;
  }
);
