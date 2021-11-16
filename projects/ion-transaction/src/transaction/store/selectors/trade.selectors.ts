import { createSelector } from '@ngrx/store';

import {
  ITransactionState,
  ITradeState,
  ITradeSummary,
  ITradeForm,
} from '../../types';

import { selectTransactionState } from './module.selectors';

export const selectTradeState = createSelector(
  selectTransactionState,
  (state: ITransactionState) => state.trade
);

export const selectTradeLastUpdated = createSelector(
  selectTradeState,
  (state: ITradeState) => state.lastUpdated
);

export const selectTradeCounts = createSelector(
  selectTradeState,
  (state: ITradeState) => state.tradeCounts
);

export const selectParticipants = createSelector(
  selectTradeState,
  (state: ITradeState) => state.participants
);

export const selectSecurities = createSelector(
  selectTradeState,
  (state: ITradeState) => state.securities
);

export const selectDirections = createSelector(
  selectTradeState,
  (state: ITradeState) => state.directions
);

export const selectSettlementTypes = createSelector(
  selectTradeState,
  (state: ITradeState) => state.settlementTypes
);

export const selectTradeIsFirstLoad = createSelector(
  selectTradeState,
  (state: ITradeState) => state.pageLoaded === state.initialLoaded
);

export const selectTradeSummary = createSelector(
  selectTradeState,
  (state: ITradeState) => state.summary
);

export const selectTradeHasSummary = createSelector(
  selectTradeSummary,
  (state: ITradeSummary) => state !== null
);

export const selectTradeForm = createSelector(
  selectTradeState,
  (state: ITradeState) => state.form
);

export const selectTradeCount = createSelector(
  selectTradeForm,
  (state: ITradeForm) => state.count
);

export const selectTradeParticipantId = createSelector(
  selectTradeForm,
  (state: ITradeForm) => state.participantId
);

export const selectTradeCusip = createSelector(
  selectTradeForm,
  (state: ITradeForm) => state.cusip
);

export const selectTradeDirection = createSelector(
  selectTradeForm,
  (state: ITradeForm) => state.direction
);

export const selectTradeSettlementType = createSelector(
  selectTradeForm,
  (state: ITradeForm) => state.settlementType
);

export const selectTradeFormDisabled = createSelector(
  selectTradeCount,
  selectTradeParticipantId,
  selectTradeCusip,
  selectTradeDirection,
  selectTradeSettlementType,
  (count: number, participantId: Array<string>, cusip: Array<string>, direction: Array<string>, settlementType: Array<string>): boolean =>
    !count || participantId.length === 0 || cusip.length === 0 || direction.length === 0 || settlementType.length === 0
);
