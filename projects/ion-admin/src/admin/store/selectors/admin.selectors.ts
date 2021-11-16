import { createSelector } from '@ngrx/store';

import { ICurrentTab } from '../../types';

import { selectCurrentTab } from './module.selectors';

import { selectCashLastUpdated } from './cash.selectors';
import { selectNettingLastUpdated } from './netting.selectors';
import { selectSecurityLastUpdated } from './security.selectors';
import { selectStartLastUpdated } from './start.selectors';
import { selectEndLastUpdated } from './end.selectors';

export const selectLastUpdated = createSelector(
  selectCurrentTab,
  selectCashLastUpdated,
  selectNettingLastUpdated,
  selectSecurityLastUpdated,
  selectStartLastUpdated,
  selectEndLastUpdated,
  (
    currentTab: ICurrentTab,
    cashLastUpdated: Date,
    nettingLastUpdated: Date,
    securityLastUpdated: Date,
    startLastUpdated: Date,
    EndLastUpdated: Date,
  ): Date | null => {
    if (currentTab === 'cash') {
      return cashLastUpdated;
    } else if (currentTab === 'netting') {
      return nettingLastUpdated;
    } else if (currentTab === 'security') {
      return securityLastUpdated;
    } else if (currentTab === 'start') {
      return startLastUpdated
    } else if (currentTab === 'end') {
      return EndLastUpdated
    }
    return null;
  }
);
