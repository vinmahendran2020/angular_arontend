import { createSelector } from '@ngrx/store';

import {
  ITransactionState,
  IOrderState,
  IOrderForm,
  IOrderSummary,
  IOrder,
  IField,
} from '../../types';

import { selectTransactionState } from './module.selectors';

export const selectOrderState = createSelector(
  selectTransactionState,
  (state: ITransactionState) => state.order
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

export const selectOrderHasSummary = createSelector(
  selectOrderSummary,
  (state: IOrderSummary) => state !== null
);

export const selectOrderForm = createSelector(
  selectOrderState,
  (state: IOrderState) => state.form
);

export const selectOrderParticipantId = createSelector(
  selectOrderForm,
  (state: IOrderForm) => state.participantId.value
);

export const selectOrderParticipantIdValidating = createSelector(
  selectOrderForm,
  (state: IOrderForm) => state.participantId.validating
);

export const selectOrderParticipantIdError = createSelector(
  selectOrderForm,
  (state: IOrderForm) => state.participantId.error
);

export const selectOrderFormDisabled = createSelector(
  selectOrderParticipantId,
  selectOrderParticipantIdValidating,
  selectOrderParticipantIdError,
  (
    participantId: string,
    participantIdValidating: boolean,
    participantIdError: string
  ): boolean =>
    !participantId || participantIdValidating || !!participantIdError
);

export const selectSummaryOrders = createSelector(
  selectOrderSummary,
  (summary: IOrderSummary) => [...(summary?.orders || [])]
);

export const selectOrderIds = createSelector(
  selectSummaryOrders,
  (orders: IOrder[]) => orders.map((order) => order.id.value)
);

export const selectOrderCusipSearchForId = createSelector(
  selectOrderSummary,
  (summary: IOrderSummary, id: number) => summary && !!summary.dialog[id]?.cusip
);

export const selectOrderReceiverForId = createSelector(
  selectSummaryOrders,
  (orders: IOrder[], id: number) =>
    orders.find((order) => order.id.value === id)?.receiver.value
);

export const selectOrderReceiverErrorForId = createSelector(
  selectSummaryOrders,
  (orders: IOrder[], id: number) =>
    orders.find((order) => order.id.value === id)?.receiver.error
);

export const selectOrderCusipForId = createSelector(
  selectSummaryOrders,
  (orders: IOrder[], id: number) =>
    orders.find((order) => order.id.value === id)?.cusip.value
);

export const selectOrderCusipErrorForId = createSelector(
  selectSummaryOrders,
  (orders: IOrder[], id: number) =>
    orders.find((order) => order.id.value === id)?.cusip.error
);

export const selectOrderQuantityForId = createSelector(
  selectSummaryOrders,
  (orders: IOrder[], id: number) =>
    orders.find((order) => order.id.value === id)?.quantity.value
);

export const selectOrderQuantityErrorForId = createSelector(
  selectSummaryOrders,
  (orders: IOrder[], id: number) =>
    orders.find((order) => order.id.value === id)?.quantity.error
);

export const selectOrderAmountForId = createSelector(
  selectSummaryOrders,
  (orders: IOrder[], id: number) =>
    orders.find((order) => order.id.value === id)?.amount.value
);

export const selectOrderAmountErrorForId = createSelector(
  selectSummaryOrders,
  (orders: IOrder[], id: number) =>
    orders.find((order) => order.id.value === id)?.amount.error
);

export const selectOrderDateForId = createSelector(
  selectSummaryOrders,
  (orders: IOrder[], id: number) =>
    orders.find((order) => order.id.value === id)?.date.value
);

export const selectOrderDateErrorForId = createSelector(
  selectSummaryOrders,
  (orders: IOrder[], id: number) =>
    orders.find((order) => order.id.value === id)?.date.error
);

export const selectOrderCommentForId = createSelector(
  selectSummaryOrders,
  (orders: IOrder[], id: number) =>
    orders.find((order) => order.id.value === id)?.comment.value
);

export const selectOrderPrefundedForId = createSelector(
  selectSummaryOrders,
  (orders: IOrder[], id: number) =>
    orders.find((order) => order.id.value === id)?.prefunded.value
);

export const selectOrderValueForId = createSelector(
  selectSummaryOrders,
  (orders: IOrder[], id: number) => {
    const amount = orders.find((order) => order.id.value === id)?.amount;
    if (
      !amount ||
      amount.value === null ||
      amount.value === '' ||
      !!amount.error
    ) {
      return null;
    }
    const value = parseFloat(amount.value);
    if (value === 0) {
      return 'Free';
    }
    return 'Valued';
  }
);

export const selectOrderClonableForId = createSelector(
  selectSummaryOrders,
  (orders: IOrder[], id: number) => {
    const order = orders.find((o) => o.id.value === id);
    return !isOrderValidating(order) && isOrderValidTouched(order);
  }
);

export const selectOrderDeletableForId = createSelector(
  selectSummaryOrders,
  (orders: IOrder[], id: number) =>
    !isOrderValidating(orders.find((order) => order.id.value === id))
);

export const selectOrdersTouched = createSelector(
  selectSummaryOrders,
  (orders: IOrder[]) => orders.filter((order) => isOrderTouched(order))
);

export const selectOrderSubmitDisabled = createSelector(
  selectOrderFormDisabled,
  selectOrdersTouched,
  (formDisabled: boolean, orders: IOrder[]): boolean =>
    formDisabled ||
    orders.length === 0 ||
    orders.some((order) => !isOrderValid(order))
);

export const selectSubmitOrders = createSelector(
  selectSummaryOrders,
  (orders: IOrder[]) => orders.filter((order) => isOrderValid(order))
);

function isOrderValid(order: IOrder | null): boolean {
  return (
    order &&
    Object.values<IField<unknown>>(order as any)
      .filter((v) => v && v.validatable)
      .every((v) => {
        return isFieldValid(v);
      })
  );
}

function isFieldValid(field: IField<unknown>): boolean {
  return (
    !field.error &&
    (field.async ? !field.validating && field.validated : field.validated)
  );
}

function isFieldTouched(field: IField<unknown>): boolean {
  return (
    field.touched &&
    (field.type === 'string' ? field.value !== null : field.value !== false)
  );
}

function isOrderValidTouched(order: IOrder | null): boolean {
  return (
    order &&
    Object.values<IField<unknown>>(order as any)
      .filter((v) => v && v.validatable)
      .some((v) => isFieldValid(v) && isFieldTouched(v))
  );
}

function isOrderTouched(order: IOrder | null): boolean {
  return (
    order &&
    Object.values<IField<unknown>>(order as any)
      .filter((v) => v && v.editable)
      .some((v) => isFieldTouched(v))
  );
}

function isOrderValidating(order: IOrder | null): boolean {
  return (
    order &&
    Object.values<IField<unknown>>(order as any)
      .filter((v) => v && v.validatable)
      .some((v) => v.validating)
  );
}
