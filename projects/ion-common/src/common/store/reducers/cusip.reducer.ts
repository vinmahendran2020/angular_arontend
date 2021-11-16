import produce from 'immer';

import {
  CusipSecurityNameChange,
  CusipIssuerNameChange,
  CusipTickerChange,
  CusipSearch,
  CusipReset,
  CusipSearchFound,
  CusipSearchError,
  CusipSearchBack,
  CusipErrorClear,
  CusipSearchSelection,
} from '../actions/cusip.actions';

import { ICusipState } from '../../types';

export const initialState: ICusipState = {
  error: '',
  form: {
    securityName: '',
    issuerName: '',
    ticker: '',
  },
  result: null,
};

export function reducer(
  state: ICusipState = initialState,
  action:
    | CusipSecurityNameChange
    | CusipIssuerNameChange
    | CusipTickerChange
    | CusipSearch
    | CusipReset
    | CusipSearchFound
    | CusipSearchError
    | CusipSearchBack
    | CusipErrorClear
    | CusipSearchSelection
): ICusipState {
  return produce(state, (draft) => {
    switch (action.type) {
      case CusipSecurityNameChange.Type:
        draft.form.securityName = action.securityName;
        break;
      case CusipIssuerNameChange.Type:
        draft.form.issuerName = action.issuerName;
        break;
      case CusipTickerChange.Type:
        draft.form.ticker = action.ticker;
        break;
      case CusipSearch.Type:
        draft.error = undefined;
        draft.result = undefined;
        break;
      case CusipReset.Type:
        draft.error = undefined;
        draft.result = undefined;
        draft.form.securityName = '';
        draft.form.issuerName = '';
        draft.form.ticker = '';
        break;
      case CusipSearchBack.Type:
        draft.result = undefined;
        break;
      case CusipSearchFound.Type:
        draft.error = undefined;
        draft.result = { ...action.result };
        break;
      case CusipSearchError.Type:
        draft.result = undefined;
        draft.error = action.error;
        break;
      case CusipErrorClear.Type:
        draft.error = undefined;
        break;
      case CusipSearchSelection.Type:
        draft.result.items.forEach((item) => {
          item.selected = item.cusip === action.cusip;
        });
        break;
    }
  });
}
