import produce from 'immer';

import {
  TickerSecurityNameChange,
  TickerIssuerNameChange,
  TickerCusipChange,
  TickerSearch,
  TickerReset,
  TickerSearchFound,
  TickerSearchError,
  TickerSearchBack,
  TickerErrorClear,
  TickerSearchSelection,
} from '../actions/ticker.actions';

import { ITickerState } from '../../types';

export const initialState: ITickerState = {
  error: '',
  form: {
    securityName: '',
    issuerName: '',
    cusip: '',
  },
  result: null,
};

export function reducer(
  state: ITickerState = initialState,
  action:
    | TickerSecurityNameChange
    | TickerIssuerNameChange
    | TickerCusipChange
    | TickerSearch
    | TickerReset
    | TickerSearchFound
    | TickerSearchError
    | TickerSearchBack
    | TickerErrorClear
    | TickerSearchSelection
): ITickerState {
  return produce(state, (draft) => {
    switch (action.type) {
      case TickerSecurityNameChange.Type:
        draft.form.securityName = action.securityName;
        break;
      case TickerIssuerNameChange.Type:
        draft.form.issuerName = action.issuerName;
        break;
      case TickerCusipChange.Type:
        draft.form.cusip = action.cusip;
        break;
      case TickerSearch.Type:
        draft.error = undefined;
        draft.result = undefined;
        break;
      case TickerReset.Type:
        draft.error = undefined;
        draft.result = undefined;
        draft.form.securityName = '';
        draft.form.issuerName = '';
        draft.form.cusip = '';
        break;
      case TickerSearchBack.Type:
        draft.result = undefined;
        break;
      case TickerSearchFound.Type:
        draft.error = undefined;
        draft.result = { ...action.result };
        break;
      case TickerSearchError.Type:
        draft.result = undefined;
        draft.error = action.error;
        break;
      case TickerErrorClear.Type:
        draft.error = undefined;
        break;
      case TickerSearchSelection.Type:
        draft.result.items.forEach((item) => {
          item.selected = item.ticker === action.ticker;
        });
        break;
    }
  });
}
