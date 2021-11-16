import { createFeatureSelector } from '@ngrx/store';

import { ISettlementState } from '../../types';

export const selectSettlementState = createFeatureSelector<ISettlementState>(
  'settlement'
);
