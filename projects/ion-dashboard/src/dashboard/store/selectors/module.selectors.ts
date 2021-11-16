import * as fromRouter from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IRouterState, IDashboardState, ICurrentTab } from '../../types';

export const selectRouterState = createFeatureSelector<
  { router: IRouterState },
  fromRouter.RouterReducerState<any>
>('router');

export const {
  selectUrl, // select the current url
} = fromRouter.getSelectors(selectRouterState);

export const selectDashboardState = createFeatureSelector<IDashboardState>(
  'dashboard'
);

export const selectCurrentTab = createSelector(
  selectUrl,
  (url: string): ICurrentTab => {
    const path = (url || '').toLowerCase();
    if (path.includes('position')) {
      return 'position' as const;
    } else if (path.includes('risk')) {
      return 'risk' as const;
    } else if (path.includes('obligation')) {
      return 'obligation' as const;
    } else if (path.includes('cca')) {
      return 'cca' as const;
    }
    return 'none' as const;
  }
);
