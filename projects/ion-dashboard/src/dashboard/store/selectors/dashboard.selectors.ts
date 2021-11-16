import { createSelector } from '@ngrx/store';

import { ICurrentTab } from '../../types';

import { selectCurrentTab } from './module.selectors';

import { selectObligationLastUpdated } from './obligation.selectors';
import { selectPositionLastUpdated } from './position.selectors';
import { selectRiskLastUpdated } from './risk.selectors';
import { selectCCALastUpdated } from './cca.selectors';

export const selectLastUpdated = createSelector(
  selectCurrentTab,
  selectObligationLastUpdated,
  selectPositionLastUpdated,
  selectRiskLastUpdated,
  selectCCALastUpdated,
  (
    currentTab: ICurrentTab,
    obligationLastUpdated: Date,
    positionLastUpdated: Date,
    riskLastUpdated: Date,
    ccaLastUpdated: Date,
  ): Date | null => {
    if (currentTab === 'obligation') {
      return obligationLastUpdated;
    } else if (currentTab === 'position') {
      return positionLastUpdated;
    } else if (currentTab === 'risk') {
      return riskLastUpdated;
    } else if (currentTab === 'cca') {
      return ccaLastUpdated;
    }
    return null;
  }
);
