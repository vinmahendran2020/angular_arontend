import produce from 'immer';
import { WritableDraft } from 'immer/dist/internal';

import {
  DeliveryPageLoaded,
  DeliveryClearPageError,
  DeliveryPageRefreshed,
  DeliveryParticipantIdChange,
  DeliveryParticipantIdFound,
  DeliveryParticipantIdError,
  DeliverySearch,
  DeliverySearchFound,
  DeliverySearchError,
  DeliverySearchServerError,
  DeliveryOperationChangeForId,
  DeliveryResetSummary,
  DeliverySubmitSuccess,
  DeliverySubmitError,
  DeliveryClearPageSuccess,
  DeliverySubmitFailure,
  DeliveryFilterKindChange,
  DeliveryFilterValueChange,
  DeliverySubmit,
} from '../actions/delivery.actions';

import { IDelivery, IDeliveryState } from '../../types';

export const initialState: IDeliveryState = {
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
    deliveries: [],
    filter: {
      kind: null,
      value: null,
    },
  },
  lastUpdated: null,
  initialLoaded: null,
  pageLoaded: null,
  pageError: null,
  pageSuccess: null,
};

export function reducer(
  state: IDeliveryState = initialState,
  action:
    | DeliveryPageLoaded
    | DeliveryPageRefreshed
    | DeliveryClearPageError
    | DeliveryClearPageSuccess
    | DeliveryParticipantIdChange
    | DeliveryParticipantIdFound
    | DeliveryParticipantIdError
    | DeliverySearch
    | DeliverySearchFound
    | DeliverySearchError
    | DeliverySearchServerError
    | DeliveryResetSummary
    | DeliveryOperationChangeForId
    | DeliverySubmit
    | DeliverySubmitSuccess
    | DeliverySubmitFailure
    | DeliverySubmitError
    | DeliveryFilterKindChange
    | DeliveryFilterValueChange
): IDeliveryState {
  return produce(state, (draft) => {
    function findDelivery(id: string): WritableDraft<IDelivery> {
      return draft.summary.deliveries.find((delivery) => delivery.id === id);
    }

    switch (action.type) {
      case DeliveryPageLoaded.Type:
        draft.pageLoaded = new Date();
        draft.initialLoaded = state.initialLoaded || draft.pageLoaded;
        break;
      case DeliveryPageRefreshed.Type:
        draft.lastUpdated = new Date();
        break;
      case DeliveryClearPageError.Type:
        draft.pageError = null;
        break;
      case DeliveryClearPageSuccess.Type:
        draft.pageSuccess = null;
        break;
      case DeliveryParticipantIdChange.Type:
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
      case DeliveryParticipantIdFound.Type:
        draft.form.participantId.validating = false;
        draft.form.participantId.validated = true;
        draft.form.participantId.error = null;
        break;
      case DeliveryParticipantIdError.Type:
        draft.form.participantId.validating = false;
        draft.form.participantId.validated = false;
        draft.form.participantId.error = action.participantIdError;
        break;
      case DeliverySearch.Type:
        draft.summary = null;
        draft.pageError = null;
        draft.pageSuccess = null;
        break;
      case DeliverySearchFound.Type:
        draft.lastUpdated = new Date();
        draft.summary = {
          deliveries: action.deliveries,
          filter: { kind: null, value: null },
        };
        draft.pageError = null;
        draft.form.participantId.error = null;
        break;
      case DeliverySearchError.Type:
        draft.lastUpdated = new Date();
        draft.summary = null;
        draft.form.participantId.error = action.error;
        break;
      case DeliverySearchServerError.Type:
        draft.lastUpdated = new Date();
        draft.summary = null;
        draft.pageError =
          'Sorry, there was an unexpected error. We are currently trying to fix the problem. In the meantime, you can refresh the page or contact the administrator.'; // action.error;
        break;
      case DeliveryResetSummary.Type:
        draft.summary.deliveries.forEach((delivery) => {
          delivery.operation = 'select';
        });
        draft.summary.filter.kind = null;
        draft.summary.filter.value = null;
        draft.pageError = null;
        draft.pageSuccess = null;
        break;
      case DeliveryOperationChangeForId.Type: {
        const delivery = findDelivery(action.id);
        delivery.operation = action.operation;
        break;
      }
      case DeliveryFilterKindChange.Type:
        draft.summary.filter.kind = action.kind;
        break;
      case DeliveryFilterValueChange.Type:
        draft.summary.filter.value = action.value;
        break;
      case DeliverySubmit.Type:
        draft.pageError = null;
        draft.pageSuccess = null;
        break;
      case DeliverySubmitSuccess.Type:
        draft.lastUpdated = new Date();
        draft.pageSuccess = `The following transaction(s) successfully submitted: ${action.ids
          .map((id) => `#${id}`)
          .join(', ')}`;
        draft.summary.deliveries = draft.summary.deliveries.filter(
          (delivery) => !action.ids.includes(delivery.id)
        );
        break;
      case DeliverySubmitFailure.Type:
        draft.lastUpdated = new Date();
        draft.pageError = `The following transaction(s) were unsuccessful: ${action.ids
          .map((id) => `#${id}`)
          .join(', ')}

          We are currently trying to fix the problem. In the meantime, you can resubmit the remaining unsuccessful order(s) or contact the administrator.`;
        break;
      case DeliverySubmitError.Type:
        draft.lastUpdated = new Date();
        draft.pageError =
          'Sorry, there was an unexpected error. We are currently trying to fix the problem. In the meantime, you can refresh the page or contact the administrator.'; // action.error;
        break;
    }
  });
}
