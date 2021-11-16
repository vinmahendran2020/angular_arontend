import { createSelector } from '@ngrx/store';

import { ICurrentTab } from '../../types';

import { selectCurrentTab } from './module.selectors';

import { selectCashLastUpdated } from './cash.selectors';
import { selectDeliveryLastUpdated } from './delivery.selectors';
import { selectOrderLastUpdated } from './order.selectors';
import { selectMemoLastUpdated } from './memo.selectors';
import { selectPrepositionLastUpdated } from './preposition.selectors';

export const selectLastUpdated = createSelector(
  selectCurrentTab,
  selectCashLastUpdated,
  selectDeliveryLastUpdated,
  selectOrderLastUpdated,
  selectMemoLastUpdated,
  selectPrepositionLastUpdated,
  (
    currentTab: ICurrentTab,
    cashLastUpdated: Date,
    deliveryLastUpdated: Date,
    orderLastUpdated: Date,
    memoLastUpdated: Date,
    prepositionLastUpdated: Date
  ): Date | null => {
    if (currentTab === 'cash') {
      return cashLastUpdated;
    } else if (currentTab === 'delivery') {
      return deliveryLastUpdated;
    } else if (currentTab === 'order') {
      return orderLastUpdated;
    } else if (currentTab === 'memo') {
      return memoLastUpdated;
    } else if (currentTab === 'preposition') {
      return prepositionLastUpdated;
    }
    return null;
  }
);
