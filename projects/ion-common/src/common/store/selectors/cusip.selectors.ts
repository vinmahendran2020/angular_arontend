import { createSelector } from '@ngrx/store';

import {
  ICommonState,
  ICusipState,
  ICusipForm,
  ICusipRecord,
} from '../../types';

import { selectCommonState } from './common.selectors';

export const selectCusipState = createSelector(
  selectCommonState,
  (state: ICommonState) => state.cusip
);

export const selectCusipResult = createSelector(
  selectCusipState,
  (state: ICusipState) => state.result
);

export const selectCusipForm = createSelector(
  selectCusipState,
  (state: ICusipState) => state.form
);

export const selectCusipSecurityName = createSelector(
  selectCusipForm,
  (state: ICusipForm) => state.securityName
);

export const selectCusipIssuerName = createSelector(
  selectCusipForm,
  (state: ICusipForm) => state.issuerName
);

export const selectCusipTicker = createSelector(
  selectCusipForm,
  (state: ICusipForm) => state.ticker
);

export const selectCusipError = createSelector(
  selectCusipState,
  (state: ICusipState) => state.error
);

export const selectChoosenCusipRecord = createSelector(
  selectCusipState,
  (state: ICusipState) =>
    state.result && state.result.items.find((item) => item.selected)
);

export const selectCanSubmitCusip = createSelector(
  selectChoosenCusipRecord,
  (state: ICusipRecord) => !!state
);
