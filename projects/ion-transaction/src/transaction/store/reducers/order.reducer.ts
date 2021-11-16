import produce from 'immer';
import { WritableDraft } from 'immer/dist/internal';

import {
  OrderParticipantIdChange,
  OrderPageLoaded,
  OrderClearPageError,
  OrderPageRefreshed,
  OrderParticipantIdFound,
  OrderParticipantIdError,
  OrderReceiverChangeForId,
  OrderResetSummary,
  OrderRemoveRowById,
  OrderAddNewRow,
  OrderCloneRowById,
  OrderCusipSearchOpenForId,
  OrderCusipSearchCloseForId,
  OrderCusipChangeForId,
  OrderQuantityChangeForId,
  OrderAmountChangeForId,
  OrderCommentChangeForId,
  OrderPrefundedChangeForId,
  OrderDateChangeForId,
  OrderReceiverFoundForId,
  OrderReceiverErrorForId,
  OrderCusipErrorForId,
  OrderCusipFoundForId,
  OrderSubmitSuccess,
  OrderSubmitError,
  OrderClearPageSuccess,
  OrderSubmitFailure,
  OrderSubmit,
} from '../actions/order.actions';

import { IOrder, IOrderState } from '../../types';

export function getDefaultOrder(id: number = 1): IOrder {
  return {
    id: {
      type: 'string',
      editable: false,
      touched: false,
      value: id,
      error: null,
      async: false,
      validatable: false,
      validated: false,
      validating: false,
    },
    cusip: {
      type: 'string',
      editable: true,
      touched: false,
      value: null,
      error: null,
      async: true,
      validatable: true,
      validated: false,
      validating: false,
    },
    receiver: {
      type: 'string',
      editable: true,
      touched: false,
      value: null,
      error: null,
      async: true,
      validatable: true,
      validated: false,
      validating: false,
    },
    amount: {
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
    quantity: {
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
    comment: {
      type: 'string',
      editable: true,
      touched: false,
      value: null,
      error: null,
      async: false,
      validatable: false,
      validated: false,
      validating: false,
    },
    date: {
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
      type: 'boolean',
      editable: true,
      touched: false,
      value: false,
      error: null,
      async: false,
      validatable: false,
      validated: false,
      validating: false,
    },
  };
}

export function cloneOrder(order: IOrder): IOrder {
  return {
    id: {
      ...order.id,
    },
    cusip: {
      ...order.cusip,
    },
    receiver: {
      ...order.receiver,
    },
    amount: {
      ...order.amount,
    },
    quantity: {
      ...order.quantity,
    },
    comment: {
      ...order.comment,
    },
    date: {
      ...order.date,
    },
    prefunded: {
      ...order.prefunded,
    },
  };
}

export const initialState: IOrderState = {
  form: {
    participantId: {
      type: 'string',
      editable: true,
      touched: false,
      value: null,
      error: null,
      async: true,
      validatable: true,
      validated: false,
      validating: false,
    },
  },
  summary: {
    orders: [getDefaultOrder()],
    dialog: {},
  },
  lastUpdated: null,
  initialLoaded: null,
  pageLoaded: null,
  pageError: null,
  pageSuccess: null,
};

export function reducer(
  state: IOrderState = initialState,
  action:
    | OrderPageLoaded
    | OrderPageRefreshed
    | OrderClearPageError
    | OrderClearPageSuccess
    | OrderParticipantIdChange
    | OrderParticipantIdFound
    | OrderParticipantIdError
    | OrderResetSummary
    | OrderAddNewRow
    | OrderRemoveRowById
    | OrderCloneRowById
    | OrderCusipSearchOpenForId
    | OrderCusipSearchCloseForId
    | OrderReceiverChangeForId
    | OrderCusipChangeForId
    | OrderQuantityChangeForId
    | OrderAmountChangeForId
    | OrderCommentChangeForId
    | OrderPrefundedChangeForId
    | OrderDateChangeForId
    | OrderReceiverFoundForId
    | OrderReceiverErrorForId
    | OrderCusipFoundForId
    | OrderCusipErrorForId
    | OrderSubmit
    | OrderSubmitSuccess
    | OrderSubmitFailure
    | OrderSubmitError
): IOrderState {
  return produce(state, (draft) => {
    function findOrder(id: number): WritableDraft<IOrder> {
      return draft.summary.orders.find((order) => order.id.value === id);
    }

    switch (action.type) {
      case OrderPageLoaded.Type:
        draft.pageLoaded = new Date();
        draft.initialLoaded = state.initialLoaded || draft.pageLoaded;
        break;
      case OrderPageRefreshed.Type:
        draft.lastUpdated = new Date();
        break;
      case OrderClearPageError.Type:
        draft.pageError = null;
        break;
      case OrderClearPageSuccess.Type:
        draft.pageSuccess = null;
        break;
      case OrderParticipantIdChange.Type:
        draft.form.participantId.value = action.participantId;
        draft.form.participantId.touched = true;
        draft.form.participantId.error =
          action.participantId !== null &&
          (action.participantId.length !== 8 ||
            isNaN(action.participantId as any))
            ? 'A valid Participant ID is an 8-digit number'
            : null;
        draft.form.participantId.validating = draft.form.participantId.error === null;
        draft.form.participantId.validated = false;
        break;
      case OrderParticipantIdFound.Type:
        draft.form.participantId.validating = false;
        draft.form.participantId.validated = true;
        draft.form.participantId.error = null;
        break;
      case OrderParticipantIdError.Type:
        draft.form.participantId.validating = false;
        draft.form.participantId.validated = false;
        draft.form.participantId.error = action.participantIdError;
        break;
      case OrderResetSummary.Type:
        draft.lastUpdated = new Date();
        draft.summary = {
          orders: [getDefaultOrder()],
          dialog: {},
        };
        draft.pageError = null;
        draft.pageSuccess = null;
        break;
      case OrderAddNewRow.Type:
        draft.summary.orders.push({
          ...getDefaultOrder(
            Math.max(
              ...draft.summary.orders.map((order) => order.id.value),
              0
            ) + 1
          ),
        });
        break;
      case OrderCloneRowById.Type:
        const cloned = cloneOrder(
          draft.summary.orders.find((order) => order.id.value === action.id)
        );
        cloned.id.value =
          Math.max(...draft.summary.orders.map((order) => order.id.value)) + 1;
        draft.summary.orders.push(cloned);
        break;
      case OrderRemoveRowById.Type:
        draft.summary.orders = draft.summary.orders.filter(
          (order) => order.id.value !== action.id
        );
        break;
      case OrderCusipSearchOpenForId.Type:
        draft.summary.dialog[action.id] = {
          ...draft.summary.dialog[action.id],
          cusip: true,
        };
        break;
      case OrderCusipSearchCloseForId.Type:
        draft.summary.dialog[action.id] = {
          ...draft.summary.dialog[action.id],
          cusip: false,
        };
        break;
      case OrderReceiverChangeForId.Type: {
        const order = findOrder(action.id);
        order.receiver.value = action.receiver;
        order.receiver.touched = true;
        order.receiver.error =
          action.receiver !== null &&
          (action.receiver.length !== 8 || isNaN(action.receiver as any))
            ? 'A valid Receiver ID is an 8-digit number'
            : null;
        order.receiver.validating = order.receiver.error === null;
        order.receiver.validated = false;
        break;
      }
      case OrderReceiverFoundForId.Type: {
        const order = findOrder(action.id);
        order.receiver.validating = false;
        order.receiver.validated = true;
        order.receiver.error = null;
        break;
      }
      case OrderReceiverErrorForId.Type: {
        const order = findOrder(action.id);
        order.receiver.validating = false;
        order.receiver.validated = false;
        order.receiver.error = action.receiverError;
        break;
      }
      case OrderCusipChangeForId.Type: {
        const order = findOrder(action.id);
        order.cusip.value = action.cusip;
        order.cusip.touched = true;
        order.cusip.validating = !!action.cusip;
        order.cusip.validated = false;
        order.cusip.error = !action.cusip
          ? 'CUSIP is required'
          : null;
        break;
      }
      case OrderCusipFoundForId.Type: {
        const order = findOrder(action.id);
        order.cusip.validating = false;
        order.cusip.validated = true;
        order.cusip.error = null;
        break;
      }
      case OrderCusipErrorForId.Type: {
        const order = findOrder(action.id);
        order.cusip.validating = false;
        order.cusip.validated = false;
        order.cusip.error = action.cusipError;
        break;
      }
      case OrderQuantityChangeForId.Type: {
        const order = findOrder(action.id);
        order.quantity.value = action.quantity;
        order.quantity.touched = true;
        const value = Number(action.quantity);
        order.quantity.error =
          isNaN(value) || value <= 0 || !Number.isInteger(value)
            ? 'A valid quantity is a positive, whole number'
            : null;
        order.quantity.validated = true;
        break;
      }
      case OrderAmountChangeForId.Type: {
        const order = findOrder(action.id);
        order.amount.value = action.amount;
        order.amount.touched = true;
        const value = Number(action.amount);
        order.amount.error =
          isNaN(value) || value < 0
            ? 'A valid amount is a positive number or 0'
            : null;
        order.amount.validated = true;
        break;
      }
      case OrderCommentChangeForId.Type: {
        const order = findOrder(action.id);
        order.comment.value = action.comment;
        order.comment.touched = true;
        order.comment.error = null;
        order.comment.validated = true;
        break;
      }
      case OrderPrefundedChangeForId.Type: {
        const order = findOrder(action.id);
        order.prefunded.value = action.prefunded;
        order.prefunded.touched = true;
        order.prefunded.error = null;
        order.prefunded.validated = true;
        break;
      }
      case OrderDateChangeForId.Type: {
        const order = findOrder(action.id);
        order.date.value = action.date;
        order.date.touched = true;
        order.date.error = !action.date ? 'Select a Settlement Date' : null;
        order.date.validated = true;
        break;
      }
      case OrderSubmit.Type:
        draft.pageError = null;
        draft.pageSuccess = null;
        break;
      case OrderSubmitSuccess.Type:
        draft.lastUpdated = new Date();
        draft.pageSuccess = `The following transaction(s) successfully submitted: ${action.ids
          .map((id) => `#${id}`)
          .join(', ')}`;
        draft.summary.orders = draft.summary.orders.filter(
          (order) => !action.ids.includes(order.id.value)
        );
        break;
      case OrderSubmitFailure.Type:
        draft.lastUpdated = new Date();
        draft.pageError = `The following transaction(s) were unsuccessful: ${action.ids
          .map((id) => `#${id}`)
          .join(', ')}

          We are currently trying to fix the problem. In the meantime, you can resubmit the remaining unsuccessful order(s) or contact the administrator.`;
        break;
      case OrderSubmitError.Type:
        draft.lastUpdated = new Date();
        draft.pageError =
          'Sorry, there was an unexpected error. We are currently trying to fix the problem. In the meantime, you can refresh the page or contact the administrator.'; // action.error;
        break;
    }
  });
}
