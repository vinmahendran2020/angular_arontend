import * as fromRouter from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IRouterState, IAdminState, ICurrentTab } from '../../types';

export const selectRouterState = createFeatureSelector<
  { router: IRouterState },
  fromRouter.RouterReducerState<any>
>('router');

export const {
  selectUrl, // select the current url
} = fromRouter.getSelectors(selectRouterState);

export const selectAdminState = createFeatureSelector<IAdminState>('admin');

export const selectCurrentTab = createSelector(
  selectUrl,
  (url: string): ICurrentTab => {
    const path = (url || '').toLowerCase();
    if (path.includes('netting')) {
      return 'netting' as const;
    } else if (path.includes('security')) {
      return 'security' as const;
    } else if (path.includes('cash')) {
      return 'cash' as const;
    } else if (path.includes('start')) {
      return 'start' as const;
    } else if (path.includes('end')) {
      return 'end' as const;
    }
    return 'none' as const;
  }
);
