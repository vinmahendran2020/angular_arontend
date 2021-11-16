import { createSelector } from '@ngrx/store';

import { ICurrentTab } from '../../types';

import { selectCurrentTab } from './form.selectors';

import { selectCashLastUpdated } from './cash.selectors';
import { selectMemoLastUpdated } from './memo.selectors';
import { selectOrderLastUpdated } from './order.selectors';
import { selectMovementLastUpdated } from './movement.selectors';
import { selectObligationLastUpdated } from './obligation.selectors';
import { selectAdjustmentLastUpdated } from './adjustment.selectors';
import { selectPrepositionLastUpdated } from './preposition.selectors';

import { selectCashIsFirstLoad } from './cash.selectors';
import { selectMemoIsFirstLoad } from './memo.selectors';
import { selectOrderIsFirstLoad } from './order.selectors';
import { selectMovementIsFirstLoad } from './movement.selectors';
import { selectObligationIsFirstLoad } from './obligation.selectors';
import { selectAdjustmentIsFirstLoad } from './adjustment.selectors';
import { selectPrepositionIsFirstLoad } from './preposition.selectors';

export const selectLastUpdated = createSelector(
  selectCurrentTab,
  selectCashLastUpdated,
  selectMemoLastUpdated,
  selectOrderLastUpdated,
  selectMovementLastUpdated,
  selectObligationLastUpdated,
  selectAdjustmentLastUpdated,
  selectPrepositionLastUpdated,
  (
    tab: ICurrentTab,
    cashLastUpdated: Date,
    memoLastUpdated: Date,
    orderLastUpdated: Date,
    movemetLastUpdated: Date,
    obligationLastUpdated: Date,
    adjustmentLastUpdated: Date,
    prepositionLastUpdated: Date
  ): Date | null => {
    if (tab === 'cash') {
      return cashLastUpdated;
    } else if (tab === 'memo') {
      return memoLastUpdated;
    } else if (tab === 'order') {
      return orderLastUpdated;
    } else if (tab === 'movement') {
      return movemetLastUpdated;
    } else if (tab === 'obligation') {
      return obligationLastUpdated;
    } else if (tab === 'adjustment') {
      return adjustmentLastUpdated;
    } else if (tab === 'preposition') {
      return prepositionLastUpdated;
    }
    return null;
  }
);

export const selectIsFirstLoad = createSelector(
  selectCurrentTab,
  selectCashIsFirstLoad,
  selectMemoIsFirstLoad,
  selectOrderIsFirstLoad,
  selectMovementIsFirstLoad,
  selectObligationIsFirstLoad,
  selectAdjustmentIsFirstLoad,
  selectPrepositionIsFirstLoad,
  (
    tab: ICurrentTab,
    cashIsFirstLoad: boolean,
    memoIsFirstLoad: boolean,
    orderIsFirstLoad: boolean,
    movemetIsFirstLoad: boolean,
    obligationIsFirstLoad: boolean,
    adjustmentIsFirstLoad: boolean,
    prepositionIsFirstLoad: boolean
  ): boolean => {
    if (tab === 'cash') {
      return cashIsFirstLoad;
    } else if (tab === 'memo') {
      return memoIsFirstLoad;
    } else if (tab === 'order') {
      return orderIsFirstLoad;
    } else if (tab === 'movement') {
      return movemetIsFirstLoad;
    } else if (tab === 'obligation') {
      return obligationIsFirstLoad;
    } else if (tab === 'adjustment') {
      return adjustmentIsFirstLoad;
    } else if (tab === 'preposition') {
      return prepositionIsFirstLoad;
    }
    return false;
  }
);
