import produce from 'immer';
import * as moment from 'moment';

import {
  FormParticipantIdChange,
  FormTransactionTypeChange,
  FormBusinessDateChange,
  FormSummarySearch,
  FormResetForm,
  FormParticipantIdFound,
  FormParticipantIdError,
  FormPageLoaded,
} from '../actions/form.actions';

import { ISettlementForm } from '../../types';

export const initialState: ISettlementForm = {
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
  transactionType: {
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
  businessDate: {
    type: 'string',
    editable: true,
    touched: false,
    value: moment().format('L'),
    error: null,
    async: false,
    validatable: true,
    validated: false,
    validating: false,
  },
  lastUpdated: null,
  initialLoaded: null,
  pageLoaded: null,
};

export function reducer(
  state: ISettlementForm = initialState,
  action:
    | FormPageLoaded
    | FormParticipantIdChange
    | FormParticipantIdFound
    | FormParticipantIdError
    | FormTransactionTypeChange
    | FormBusinessDateChange
    | FormSummarySearch
    | FormResetForm
): ISettlementForm {
  return produce(state, (draft) => {
    switch (action.type) {
      case FormPageLoaded.Type:
        draft.pageLoaded = new Date();
        draft.initialLoaded = state.initialLoaded || draft.pageLoaded;
        break;
      case FormParticipantIdChange.Type:
        draft.participantId.value = action.participantId;
        draft.participantId.touched = true;
        draft.participantId.error =
          action.participantId !== null &&
          (action.participantId.length !== 8 ||
            isNaN(action.participantId as any))
            ? 'A valid Participant ID is an 8-digit number'
            : null;
        draft.participantId.validating = true;
        draft.participantId.validated = false;
        break;
      case FormParticipantIdFound.Type:
        draft.participantId.validating = false;
        draft.participantId.validated = true;
        draft.participantId.error = null;
        break;
      case FormParticipantIdError.Type:
        draft.participantId.validating = false;
        draft.participantId.validated = false;
        draft.participantId.error = action.participantIdError;
        break;
      case FormTransactionTypeChange.Type:
        draft.transactionType.value = action.transactionType;
        draft.transactionType.touched = true;
        draft.transactionType.validating = false;
        draft.transactionType.validated = true;
        draft.transactionType.error = null;
        break;
      case FormBusinessDateChange.Type:
        draft.businessDate.value = action.businessDate;
        draft.businessDate.touched = true;
        draft.businessDate.validating = false;
        draft.businessDate.validated = action.businessDate !== null;
        draft.businessDate.error = !action.businessDate
          ? 'Business BusinessDate is required'
          : null;
        break;
      case FormSummarySearch.Type:
        break;
      case FormResetForm.Type:
        draft.participantId = initialState.participantId;
        draft.transactionType = initialState.transactionType;
        draft.businessDate = initialState.businessDate;
        break;
    }
  });
}
