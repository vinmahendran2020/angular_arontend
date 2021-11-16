import produce from 'immer';

import {
  TradeCountChange,
  TradeParticipantIdChange,
  TradeCusipChange,
  TradeDirectionChange,
  TradeSettlementTypeChange,
  TradeSummarySearch,
  TradeSummaryFound,
  TradeSummaryError,
  TradeSummaryServerError,
  TradeResetForm,
  TradePageLoaded,
  TradeClearPageError,
  TradePageRefreshed,
  TradeClearPageSuccess,
  LoadParticipants,
  LoadSecurities,
  TradeDetailSubmit,
  TradeSubmitSuccess,
  TradeSubmitError,
} from '../actions/trade.actions';

import { ITradeState } from '../../types';

export const initialState: ITradeState = {
  form: {
    count: null,
    participantId: ['All'],
    cusip: ['All'],
    direction: ['All'],
    settlementType: ['All']
  },
  tradeCounts: ['1', '2', '5', '10', '20' , '50','100'],
  participants: [],
  securities: [],
  directions: ['buy', 'sell'],
  settlementTypes: ['t+0', 't+1', 't+2'],
  summary: null,
  lastUpdated: null,
  initialLoaded: null,
  pageLoaded: null,
  pageError: null,
  pageSuccess: null,
};

export function reducer(
  state: ITradeState = initialState,
  action:
    | TradePageLoaded
    | TradePageRefreshed
    | TradeClearPageError
    | TradeClearPageSuccess
    | TradeCountChange
    | TradeParticipantIdChange
    | TradeCusipChange
    | TradeDirectionChange
    | TradeSettlementTypeChange
    | TradeSummarySearch
    | TradeSummaryFound
    | TradeSummaryError
    | TradeSummaryServerError
    | TradeResetForm
    | LoadParticipants
    | LoadSecurities
    | TradeDetailSubmit
    | TradeSubmitSuccess
    | TradeSubmitError
): ITradeState {
  return produce(state, (draft) => {
    switch (action.type) {
      case TradePageLoaded.Type:
        draft.pageLoaded = new Date();
        draft.initialLoaded = state.initialLoaded || draft.pageLoaded;
        break;
      case TradePageRefreshed.Type:
        draft.lastUpdated = new Date();
        break;
      case TradeClearPageError.Type:
        draft.pageError = null;
        break;
      case TradeClearPageSuccess.Type:
        draft.pageSuccess = null;
        break;
      case TradeCountChange.Type:
        draft.form.count = action.count;
        break; 
      case TradeParticipantIdChange.Type:
        draft.form.participantId = action.participantId;
        break;
      case TradeCusipChange.Type:
        draft.form.cusip = action.cusip;
        break;
      case TradeDirectionChange.Type:
        draft.form.direction = action.direction;
        break;
      case TradeSettlementTypeChange.Type:
        draft.form.settlementType = action.settlementType;
        break;
      case TradeSummarySearch.Type:
        draft.summary = null;
        draft.pageError = null;
        draft.pageSuccess = null;
        break;
      case TradeSummaryFound.Type:
        draft.lastUpdated = new Date();
        draft.summary = { ...action.summary };
        draft.pageError = null;
        break;
      case TradeSummaryError.Type:
        draft.lastUpdated = new Date();
        draft.summary = null;
        break;
      case TradeSummaryServerError.Type:
        draft.lastUpdated = new Date();
        draft.summary = null;
        draft.pageError =
          'Sorry, there was an unexpected error. We are currently trying to fix the problem. In the meantime, you can refresh the page or contact the administrator.'; // action.error;
        break;
      case TradeResetForm.Type:
        draft.form.count = null;
        draft.form.participantId = ['All'];
        draft.form.cusip = ['All'];
        draft.form.direction = ['All'];
        draft.form.settlementType = ['All'];
        draft.summary = null;
        draft.pageError = null;
        draft.pageSuccess = null;
        break;
      case LoadParticipants.Type:
        draft.participants = action.participants;
        break;
      case LoadSecurities.Type:
        draft.securities = action.securities;
        break;
      case TradeDetailSubmit.Type:
        draft.pageError = null;
        draft.pageSuccess = null;
        break;
      case TradeSubmitSuccess.Type:
        draft.lastUpdated = new Date();
        draft.pageSuccess = 'Market Trade(s) successfully submitted.';
        draft.form.count = null;
        draft.form.participantId = ['All'];
        draft.form.cusip = ['All'];
        draft.form.direction = ['All'];
        draft.form.settlementType = ['All'];
        draft.summary = null;
        break;
      case TradeSubmitError.Type:
        draft.lastUpdated = new Date();
        draft.pageError =
          'Sorry, there was an unexpected error. We are currently trying to fix the problem. In the meantime, you can refresh the page or contact the administrator.'; // action.error;
        break;
    }
  });
}
