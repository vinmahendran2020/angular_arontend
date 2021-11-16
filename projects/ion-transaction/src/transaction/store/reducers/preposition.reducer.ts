import produce from 'immer';
import { WritableDraft } from 'immer/dist/internal';

import {
  PrepositionParticipantIdChange,
  PrepositionPageLoaded,
  PrepositionClearPageError,
  PrepositionPageRefreshed,
  PrepositionParticipantIdFound,
  PrepositionParticipantIdError,
  PrepositionActionChangeForId,
  PrepositionResetSummary,
  PrepositionRemoveRowById,
  PrepositionAddNewRow,
  PrepositionCusipSearchOpenForId,
  PrepositionCusipSearchCloseForId,
  PrepositionCusipChangeForId,
  PrepositionQuantityChangeForId,
  PrepositionCusipErrorForId,
  PrepositionCusipFoundForId,
  PrepositionSubmitSuccess,
  PrepositionSubmitError,
  PrepositionClearPageSuccess,
  PrepositionSubmitFailure,
  PrepositionSubmit,
} from '../actions/preposition.actions';
import { IPreposition, IPrepositionState } from '../../types';

export function getDefaultPreposition(id: number = 1): IPreposition {
  return {
    id: {
      type: 'string',
      value: id,
      editable: false,
      touched: false,
      error: null,
      async: false,
      validatable: false,
      validated: false,
      validating: false,
    },
    action: {
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
    cusipName: null,
  };
}

export const initialState: IPrepositionState = {
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
    prepositions: [getDefaultPreposition()],
    dialog: {},
  },
  lastUpdated: null,
  initialLoaded: null,
  pageLoaded: null,
  pageError: null,
  pageSuccess: null,
};

export function reducer(
  state: IPrepositionState = initialState,
  action:
    | PrepositionPageLoaded
    | PrepositionPageRefreshed
    | PrepositionClearPageError
    | PrepositionClearPageSuccess
    | PrepositionParticipantIdChange
    | PrepositionParticipantIdFound
    | PrepositionParticipantIdError
    | PrepositionResetSummary
    | PrepositionAddNewRow
    | PrepositionRemoveRowById
    | PrepositionCusipSearchOpenForId
    | PrepositionCusipSearchCloseForId
    | PrepositionActionChangeForId
    | PrepositionCusipChangeForId
    | PrepositionQuantityChangeForId
    | PrepositionCusipFoundForId
    | PrepositionCusipErrorForId
    | PrepositionSubmit
    | PrepositionSubmitSuccess
    | PrepositionSubmitFailure
    | PrepositionSubmitError
): IPrepositionState {
  return produce(state, (draft) => {
    function findPreposition(id: number): WritableDraft<IPreposition> {
      return draft.summary.prepositions.find(
        (preposition) => preposition.id.value === id
      );
    }

    switch (action.type) {
      case PrepositionPageLoaded.Type:
        draft.pageLoaded = new Date();
        draft.initialLoaded = state.initialLoaded || draft.pageLoaded;
        break;
      case PrepositionPageRefreshed.Type:
        draft.lastUpdated = new Date();
        break;
      case PrepositionClearPageError.Type:
        draft.pageError = null;
        break;
      case PrepositionClearPageSuccess.Type:
        draft.pageSuccess = null;
        break;
      case PrepositionParticipantIdChange.Type:
        draft.form.participantId.value = action.participantId;
        draft.form.participantId.touched = true;
        draft.form.participantId.error =
          (action.participantId !== null && action.participantId.length !== 8) ||
          isNaN(action.participantId as any)
            ? 'A valid Participant ID is an 8-digit number'
            : null;
        draft.form.participantId.validating = draft.form.participantId.error === null;
        draft.form.participantId.validated = false;
        break;
      case PrepositionParticipantIdFound.Type:
        draft.form.participantId.validating = false;
        draft.form.participantId.validated = true;
        draft.form.participantId.error = null;
        break;
      case PrepositionParticipantIdError.Type:
        draft.form.participantId.validating = false;
        draft.form.participantId.validated = false;
        draft.form.participantId.error = action.participantIdError;
        break;
      case PrepositionResetSummary.Type:
        draft.lastUpdated = new Date();
        draft.summary = {
          prepositions: [getDefaultPreposition()],
          dialog: {},
        };
        draft.pageError = null;
        draft.pageSuccess = null;
        break;
      case PrepositionAddNewRow.Type:
        draft.summary.prepositions.push({
          ...getDefaultPreposition(
            Math.max(
              ...draft.summary.prepositions.map(
                (preposition) => preposition.id.value
              ),
              0
            ) + 1
          ),
        });
        break;
      case PrepositionRemoveRowById.Type:
        draft.summary.prepositions = draft.summary.prepositions.filter(
          (preposition) => preposition.id.value !== action.id
        );
        break;
      case PrepositionCusipSearchOpenForId.Type:
        draft.summary.dialog[action.id] = {
          ...draft.summary.dialog[action.id],
          cusip: true,
        };
        break;
      case PrepositionCusipSearchCloseForId.Type:
        draft.summary.dialog[action.id] = {
          ...draft.summary.dialog[action.id],
          cusip: false,
        };
        break;
      case PrepositionActionChangeForId.Type: {
        const preposition = findPreposition(action.id);
        preposition.action.value = action.action;
        preposition.action.touched = true;
        preposition.action.validating = false;
        preposition.action.validated = true;
        break;
      }
      case PrepositionCusipChangeForId.Type: {
        const preposition = findPreposition(action.id);
        preposition.cusip.value = action.cusip;
        preposition.cusip.touched = true;
        preposition.cusip.validating = !!action.cusip;
        preposition.cusip.validated = false;
        preposition.cusip.error = !action.cusip
          ? 'CUSIP is required'
          : null;
        preposition.cusipName = null;
        break;
      }
      case PrepositionCusipFoundForId.Type: {
        const preposition = findPreposition(action.id);
        preposition.cusip.validating = false;
        preposition.cusip.validated = !!action.cusip;
        preposition.cusip.error = null;
        preposition.cusipName = action.cusip?.name;
        break;
      }
      case PrepositionCusipErrorForId.Type: {
        const preposition = findPreposition(action.id);
        preposition.cusip.validating = false;
        preposition.cusip.validated = false;
        preposition.cusip.error = action.cusipError;
        preposition.cusipName = null;
        break;
      }
      case PrepositionQuantityChangeForId.Type: {
        const preposition = findPreposition(action.id);
        preposition.quantity.value = action.quantity;
        preposition.quantity.touched = true;
        const value = Number(action.quantity);
        preposition.quantity.error =
          isNaN(value) || value <= 0 || !Number.isInteger(value)
            ? 'A valid quantity is a positive, whole number'
            : null;
        preposition.quantity.validated = true;
        break;
      }
      case PrepositionSubmit.Type:
        draft.pageError = null;
        draft.pageSuccess = null;
        break;
      case PrepositionSubmitSuccess.Type:
        draft.lastUpdated = new Date();
        draft.pageSuccess = `The following transaction(s) successfully submitted: ${action.ids
          .map((id) => `#${id}`)
          .join(', ')}`;
        draft.summary.prepositions = draft.summary.prepositions.filter(
          (preposition) => !action.ids.includes(preposition.id.value)
        );
        break;
      case PrepositionSubmitFailure.Type:
        draft.lastUpdated = new Date();
        draft.pageError = `The following transaction(s) were unsuccessful: ${action.ids
          .map((id) => `#${id}`)
          .join(', ')}

          We are currently trying to fix the problem. In the meantime, you can resubmit the remaining unsuccessful pre-position(s) or contact the administrator.`;
        break;
      case PrepositionSubmitError.Type:
        draft.lastUpdated = new Date();
        draft.pageError =
          'Sorry, there was an unexpected error. We are currently trying to fix the problem. In the meantime, you can refresh the page or contact the administrator.'; // action.error;
        break;
    }
  });
}
