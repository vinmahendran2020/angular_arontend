import { createSelector } from '@ngrx/store';

import {
  ICommonState,
  ITickerState,
  ITickerForm,
  ITickerRecord,
} from '../../types';

import { selectCommonState } from './common.selectors';

export const selectTickerState = createSelector(
  selectCommonState,
  (state: ICommonState) => state.ticker
);

export const selectTickerResult = createSelector(
  selectTickerState,
  (state: ITickerState) => state.result
);

export const selectTickerForm = createSelector(
  selectTickerState,
  (state: ITickerState) => state.form
);

export const selectTickerSecurityName = createSelector(
  selectTickerForm,
  (state: ITickerForm) => state.securityName
);

export const selectTickerIssuerName = createSelector(
  selectTickerForm,
  (state: ITickerForm) => state.issuerName
);

export const selectTickerCusip = createSelector(
  selectTickerForm,
  (state: ITickerForm) => state.cusip
);

export const selectTickerError = createSelector(
  selectTickerState,
  (state: ITickerState) => state.error
);

export const selectChoosenTickerRecord = createSelector(
  selectTickerState,
  (state: ITickerState) => state.result.items.find((item) => item.selected)
);

export const selectCanSubmitTicker = createSelector(
  selectChoosenTickerRecord,
  (state: ITickerRecord) => !!state
);
