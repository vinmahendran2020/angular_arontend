import { createSelector } from '@ngrx/store';

import {
  ISettlementState,
  IOrderState,
  IOrderForm,
  IOrderSummary,
} from '../../types';

import { selectSettlementState } from './module.selectors';

export const selectOrderState = createSelector(
  selectSettlementState,
  (state: ISettlementState) => state.order
);

export const selectOrderLastUpdated = createSelector(
  selectOrderState,
  (state: IOrderState) => state.lastUpdated
);

export const selectOrderIsFirstLoad = createSelector(
  selectOrderState,
  (state: IOrderState) => state.pageLoaded === state.initialLoaded
);

export const selectOrderSummary = createSelector(
  selectOrderState,
  (state: IOrderState) => state.summary
);

export const selectOrderForm = createSelector(
  selectOrderState,
  (state: IOrderState) => state.form
);

export const selectSummaryOrders = createSelector(
  selectOrderSummary,
  (summary: IOrderSummary) => [...(summary?.orders || [])]
);

export const selectFilteredOrders = createSelector(
  selectOrderSummary,
  (summary: IOrderSummary) => [...(summary?.filteredOrders || [])]
);

export const selectOrderDelivererId = createSelector(
  selectOrderForm,
  (state: IOrderForm) => state.delivererId.value
);

export const selectOrderReceiverId = createSelector(
  selectOrderForm,
  (state: IOrderForm) => state.receiverId.value
);

export const selectOrderCusipId = createSelector(
  selectOrderForm,
  (state: IOrderForm) => state.cusipId.value
);

export const selectOrderCusipName = createSelector(
  selectOrderForm,
  (state: IOrderForm) => state.cusipName.value
);

export const selectOrderPrefunded = createSelector(
  selectOrderForm,
  (state: IOrderForm) => state.prefunded.value
);

export const selectOrderSettlemetStatus = createSelector(
  selectOrderForm,
  (state: IOrderForm) => state.settlementStatus.value
);

export const selectOrderPendingReason = createSelector(
  selectOrderForm,
  (state: IOrderForm) => state.pendingReason.value
);
