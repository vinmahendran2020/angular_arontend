import { createSelector } from '@ngrx/store';

import {
  ITransactionState,
  IDeliveryState,
  IDeliveryForm,
  IDeliverySummary,
  IDelivery,
  IDeliveryFilter,
} from '../../types';

import { selectTransactionState } from './module.selectors';

export const selectDeliveryState = createSelector(
  selectTransactionState,
  (state: ITransactionState) => state.delivery
);

export const selectDeliveryLastUpdated = createSelector(
  selectDeliveryState,
  (state: IDeliveryState) => state.lastUpdated
);

export const selectDeliveryIsFirstLoad = createSelector(
  selectDeliveryState,
  (state: IDeliveryState) => state.pageLoaded === state.initialLoaded
);

export const selectDeliverySummary = createSelector(
  selectDeliveryState,
  (state: IDeliveryState) => state.summary
);

export const selectDeliveryHasSummary = createSelector(
  selectDeliverySummary,
  (state: IDeliverySummary) => state !== null
);

export const selectDeliveryForm = createSelector(
  selectDeliveryState,
  (state: IDeliveryState) => state.form
);

export const selectDeliveryParticipantId = createSelector(
  selectDeliveryForm,
  (state: IDeliveryForm) => state.participantId.value
);

export const selectDeliveryParticipantIdValidating = createSelector(
  selectDeliveryForm,
  (state: IDeliveryForm) => state.participantId.validating
);

export const selectDeliveryParticipantIdError = createSelector(
  selectDeliveryForm,
  (state: IDeliveryForm) => state.participantId.error
);

export const selectDeliveryFormDisabled = createSelector(
  selectDeliveryParticipantId,
  selectDeliveryParticipantIdError,
  (participantId: string, participantIdError: string): boolean =>
    !participantId || !!participantIdError
);

export const selectSummaryDeliveries = createSelector(
  selectDeliverySummary,
  (summary: IDeliverySummary) => [...(summary?.deliveries || [])]
);

export const selectSummaryFilter = createSelector(
  selectDeliverySummary,
  (summary: IDeliverySummary) => summary?.filter
);

export const selectDeliveryFilterKind = createSelector(
  selectSummaryFilter,
  (filter: IDeliveryFilter) => filter?.kind
);

export const selectDeliveryFilterValue = createSelector(
  selectSummaryFilter,
  (filter: IDeliveryFilter) => filter?.value
);

export const selectDeliveryAllowedOperationsForId = createSelector(
  selectDeliveryParticipantId,
  selectSummaryDeliveries,
  (participantId: string, deliveries: IDelivery[], id: string) => {
    const delivery = deliveries.find((d) => d.id === id);
    if (delivery?.receiver === participantId) {
      return ['approve', 'cancel'];
    } else if (delivery?.deliverer === participantId) {
      return ['cancel'];
    }
    return [];
  }
);

export const selectFilteredDeliveries = createSelector(
  selectSummaryDeliveries,
  selectDeliveryFilterKind,
  selectDeliveryFilterValue,
  (deliveries: IDelivery[], filterKind: string, filterValue: string) => {
    if (!filterValue) {
      return deliveries;
    }
    let filter = (delivery: IDelivery): boolean => true;
    if (filterKind === 'deliverer') {
      filter = (delivery: IDelivery): boolean =>
        delivery.deliverer.includes(filterValue);
    } else if (filterKind === 'receiver') {
      filter = (delivery: IDelivery): boolean =>
        delivery.receiver.includes(filterValue);
    } else if (filterKind === 'both') {
      filter = (delivery: IDelivery): boolean =>
        delivery.deliverer.includes(filterValue) ||
        delivery.receiver.includes(filterValue);
    }
    return deliveries.filter(filter);
  }
);

export const selectSummitDeliveries = createSelector(
  selectFilteredDeliveries,
  (deliveries: IDelivery[]) =>
    deliveries.filter(
      (delivery) =>
        delivery.operation === 'approve' || delivery.operation === 'cancel'
    )
);

export const selectFilteredDeliveryIds = createSelector(
  selectFilteredDeliveries,
  (deliveries: IDelivery[]) => deliveries.map((delivery) => delivery.id)
);

export const selectDeliveryOperationForId = createSelector(
  selectSummaryDeliveries,
  (deliveries: IDelivery[], id: string) =>
    deliveries.find((delivery) => delivery.id === id)?.operation
);

export const selectDeliveryDelivererForId = createSelector(
  selectSummaryDeliveries,
  (orders: IDelivery[], id: string) =>
    orders.find((order) => order.id === id)?.deliverer
);

export const selectDeliveryReceiverForId = createSelector(
  selectSummaryDeliveries,
  (orders: IDelivery[], id: string) =>
    orders.find((order) => order.id === id)?.receiver
);

export const selectDeliveryCusipForId = createSelector(
  selectSummaryDeliveries,
  (orders: IDelivery[], id: string) =>
    orders.find((order) => order.id === id)?.cusip
);

export const selectDeliveryQuantityForId = createSelector(
  selectSummaryDeliveries,
  (orders: IDelivery[], id: string) =>
    orders.find((order) => order.id === id)?.quantity
);

export const selectDeliveryAmountForId = createSelector(
  selectSummaryDeliveries,
  (orders: IDelivery[], id: string) =>
    orders.find((order) => order.id === id)?.amount
);

export const selectDeliveryDateForId = createSelector(
  selectSummaryDeliveries,
  (orders: IDelivery[], id: string) =>
    orders.find((order) => order.id === id)?.date
);

export const selectDeliveryCommentForId = createSelector(
  selectSummaryDeliveries,
  (orders: IDelivery[], id: string) =>
    orders.find((order) => order.id === id)?.comment
);

export const selectDeliveryPrefundedForId = createSelector(
  selectSummaryDeliveries,
  (orders: IDelivery[], id: string) =>
    orders.find((order) => order.id === id)?.prefunded
);

export const selectDeliveryValueForId = createSelector(
  selectSummaryDeliveries,
  (orders: IDelivery[], id: string) => {
    const amount = orders.find((order) => order.id === id)?.amount;
    if (amount === null || amount === '') {
      return null;
    }
    const value = parseFloat(amount);
    if (value === 0) {
      return 'Free';
    }
    return 'Valued';
  }
);

export const selectDeliverySubmitDisabled = createSelector(
  selectDeliveryFormDisabled,
  selectFilteredDeliveries,
  (formDisabled: boolean, deliveries: IDelivery[]): boolean =>
    formDisabled ||
    deliveries.length === 0 ||
    deliveries.every(
      (delivery) =>
        delivery.operation !== 'approve' && delivery.operation !== 'cancel'
    )
);
