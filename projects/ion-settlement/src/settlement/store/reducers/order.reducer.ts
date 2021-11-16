import produce from 'immer';

import {
  OrderPageLoaded,
  OrderClearPageError,
  OrderFilterSummary,
  OrderDelivererIdChange,
  OrderReceiverIdChange,
  OrderCusipNameChange,
  OrderCusipIdChange,
  OrderPrefundedChange,
  OrderSettlementStatusChange,
  OrderPendingReasonChange,
  OrderClearPageSuccess,
  OrderSummaryError,
  OrderSummaryServerError,
  OrderSummarySearch,
  OrderSummaryFound,
  OrderResetForm,
} from '../actions/order.actions';

import { IOrder, IOrderForm, IOrderState } from '../../types';

export const initialState: IOrderState = {
  form: {
    delivererId: {
      type: 'string',
      editable: true,
      touched: false,
      value: null,
      error: null,
      async: false,
      validatable: true,
      validated: false,
      validating: false,
    },
    receiverId: {
      type: 'string',
      editable: true,
      touched: false,
      value: null,
      error: null,
      async: false,
      validatable: true,
      validated: false,
      validating: false,
    },
    cusipId: {
      type: 'string',
      editable: true,
      touched: false,
      value: null,
      error: null,
      async: false,
      validatable: true,
      validated: false,
      validating: false,
    },
    cusipName: {
      type: 'string',
      editable: true,
      touched: false,
      value: null,
      error: null,
      async: false,
      validatable: true,
      validated: false,
      validating: false,
    },
    prefunded: {
      type: 'string',
      editable: true,
      touched: false,
      value: null,
      error: null,
      async: false,
      validatable: true,
      validated: false,
      validating: false,
    },
    settlementStatus: {
      type: 'string',
      editable: true,
      touched: false,
      value: null,
      error: null,
      async: false,
      validatable: true,
      validated: false,
      validating: false,
    },
    pendingReason: {
      type: 'string',
      editable: true,
      touched: false,
      value: null,
      error: null,
      async: false,
      validatable: true,
      validated: false,
      validating: false,
    },
  },
  summary: {
    orders: [],
    filteredOrders: [],
  },
  lastUpdated: null,
  initialLoaded: null,
  pageLoaded: null,
  pageError: null,
  pageSuccess: null,
};

function toFiltered(orders: IOrder[], form: IOrderForm): IOrder[] {
  const cusipName = form.cusipName.value;
  const cusipId = form.cusipId.value;
  const delivererId = form.delivererId.value;
  const receiverId = form.receiverId.value;
  const prefunded = form.prefunded.value;
  const settlementStatus = form.settlementStatus.value;
  const pendingReason = form.pendingReason.value;
  return orders.filter((order) => {
    if (cusipName) {
      if (!order.cusipName?.includes(cusipName)) {
        return false;
      }
    }
    if (cusipId) {
      if (!order.cusipId?.includes(cusipId)) {
        return false;
      }
    }
    if (delivererId) {
      if (!order.delivererId?.includes(delivererId)) {
        return false;
      }
    }
    if (receiverId) {
      if (!order.receiverId?.includes(receiverId)) {
        return false;
      }
    }
    if (prefunded) {
      if (!order.prefunded?.includes(prefunded)) {
        return false;
      }
    }
    if (settlementStatus) {
      if (!order.settlementStatus?.includes(settlementStatus)) {
        return false;
      }
    }
    if (pendingReason) {
      if (!order.pendingReason?.includes(pendingReason)) {
        return false;
      }
    }
    return true;
  });
}

export function reducer(
  state: IOrderState = initialState,
  action:
    | OrderPageLoaded
    | OrderClearPageError
    | OrderClearPageSuccess
    | OrderDelivererIdChange
    | OrderReceiverIdChange
    | OrderCusipNameChange
    | OrderCusipIdChange
    | OrderPrefundedChange
    | OrderSettlementStatusChange
    | OrderPendingReasonChange
    | OrderFilterSummary
    | OrderSummarySearch
    | OrderSummaryFound
    | OrderSummaryError
    | OrderSummaryServerError
    | OrderResetForm
): IOrderState {
  return produce(state, (draft) => {
    switch (action.type) {
      case OrderPageLoaded.Type:
        draft.pageLoaded = new Date();
        draft.initialLoaded = state.initialLoaded || draft.pageLoaded;
        break;
      case OrderClearPageError.Type:
        draft.pageError = null;
        break;
      case OrderClearPageSuccess.Type:
        draft.pageSuccess = null;
        break;
      case OrderFilterSummary.Type:
        draft.summary.filteredOrders = toFiltered(
          state.summary.orders,
          state.form
        );
        break;
      case OrderDelivererIdChange.Type: {
        draft.form.delivererId.value = action.delivererId;
        draft.form.delivererId.touched = true;
        draft.form.delivererId.error = null;
        draft.form.delivererId.validating = false;
        draft.form.delivererId.validated = true;
        break;
      }
      case OrderReceiverIdChange.Type: {
        draft.form.receiverId.value = action.receiverId;
        draft.form.receiverId.touched = true;
        draft.form.receiverId.error = null;
        draft.form.receiverId.validating = false;
        draft.form.receiverId.validated = true;
        break;
      }
      case OrderCusipIdChange.Type: {
        draft.form.cusipId.value = action.cusipId;
        draft.form.cusipId.touched = true;
        draft.form.cusipId.error = null;
        draft.form.cusipId.validating = false;
        draft.form.cusipId.validated = true;
        break;
      }
      case OrderCusipNameChange.Type: {
        draft.form.cusipName.value = action.cusipName;
        draft.form.cusipName.touched = true;
        draft.form.cusipName.error = null;
        draft.form.cusipName.validating = false;
        draft.form.cusipName.validated = true;
        break;
      }
      case OrderPrefundedChange.Type: {
        draft.form.prefunded.value = action.prefunded;
        draft.form.prefunded.touched = true;
        draft.form.prefunded.error = null;
        draft.form.prefunded.validating = false;
        draft.form.prefunded.validated = true;
        break;
      }
      case OrderSettlementStatusChange.Type: {
        draft.form.settlementStatus.value = action.settlementStatus;
        draft.form.settlementStatus.touched = true;
        draft.form.settlementStatus.error = null;
        draft.form.settlementStatus.validating = false;
        draft.form.settlementStatus.validated = true;
        break;
      }
      case OrderPendingReasonChange.Type: {
        draft.form.pendingReason.value = action.pendingReason;
        draft.form.pendingReason.touched = true;
        draft.form.pendingReason.error = null;
        draft.form.pendingReason.validating = false;
        draft.form.pendingReason.validated = true;
        break;
      }
      case OrderSummarySearch.Type:
        // draft.summary = { orders: [] };
        draft.pageError = null;
        break;
      case OrderSummaryFound.Type:
        draft.lastUpdated = new Date();
        draft.summary.orders = action.orders;
        draft.summary.filteredOrders = toFiltered(action.orders, state.form);
        draft.pageError = null;
        break;
      case OrderSummaryError.Type:
        draft.lastUpdated = new Date();
        draft.summary = { orders: [], filteredOrders: [] };
        draft.pageError = null;
        break;
      case OrderSummaryServerError.Type:
        draft.lastUpdated = new Date();
        draft.summary = { orders: [], filteredOrders: [] };
        draft.pageError =
          'Sorry, there was an unexpected error. We are currently trying to fix the problem. In the meantime, you can refresh the page or contact the administrator.'; // action.error;
        break;
      case OrderResetForm.Type:
        draft.lastUpdated = new Date();
        draft.pageError = null;
        draft.pageSuccess = null;
        draft.form = initialState.form;
        draft.summary = initialState.summary;
        break;
    }
  });
}
