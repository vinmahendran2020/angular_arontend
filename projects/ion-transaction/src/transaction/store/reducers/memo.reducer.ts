import produce from 'immer';
import { WritableDraft } from 'immer/dist/internal';

import {
  MemoParticipantIdChange,
  MemoPageLoaded,
  MemoClearPageError,
  MemoPageRefreshed,
  MemoParticipantIdFound,
  MemoParticipantIdError,
  MemoActionChangeForId,
  MemoResetSummary,
  MemoRemoveRowById,
  MemoAddNewRow,
  MemoCusipSearchOpenForId,
  MemoCusipSearchCloseForId,
  MemoCusipChangeForId,
  MemoQuantityChangeForId,
  MemoCusipErrorForId,
  MemoCusipFoundForId,
  MemoSubmitSuccess,
  MemoSubmitError,
  MemoClearPageSuccess,
  MemoSubmitFailure,
  MemoCusipBalanceFoundForId,
  MemoCusipBalanceErrorForId,
  MemoSubmit,
} from '../actions/memo.actions';

import { IMemo, IMemoState } from '../../types';

export function getDefaultMemo(id: number = 1): IMemo {
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
    action: {
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
    totalPositions: null,
    memoSegregation: null,
    totalFreeExcess: null,
  };
}

export const initialState: IMemoState = {
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
    memos: [getDefaultMemo()],
    dialog: {},
  },
  lastUpdated: null,
  initialLoaded: null,
  pageLoaded: null,
  pageError: null,
  pageSuccess: null,
};

export function reducer(
  state: IMemoState = initialState,
  action:
    | MemoPageLoaded
    | MemoPageRefreshed
    | MemoClearPageError
    | MemoClearPageSuccess
    | MemoParticipantIdChange
    | MemoParticipantIdFound
    | MemoParticipantIdError
    | MemoResetSummary
    | MemoAddNewRow
    | MemoRemoveRowById
    | MemoCusipSearchOpenForId
    | MemoCusipSearchCloseForId
    | MemoActionChangeForId
    | MemoCusipChangeForId
    | MemoQuantityChangeForId
    | MemoCusipFoundForId
    | MemoCusipErrorForId
    | MemoSubmit
    | MemoSubmitSuccess
    | MemoSubmitFailure
    | MemoSubmitError
    | MemoCusipBalanceFoundForId
    | MemoCusipBalanceErrorForId
): IMemoState {
  return produce(state, (draft) => {
    function findMemo(id: number): WritableDraft<IMemo> {
      return draft.summary.memos.find((memo) => memo.id.value === id);
    }

    switch (action.type) {
      case MemoPageLoaded.Type:
        draft.pageLoaded = new Date();
        draft.initialLoaded = state.initialLoaded || draft.pageLoaded;
        break;
      case MemoPageRefreshed.Type:
        draft.lastUpdated = new Date();
        break;
      case MemoClearPageError.Type:
        draft.pageError = null;
        break;
      case MemoClearPageSuccess.Type:
        draft.pageSuccess = null;
        break;
      case MemoParticipantIdChange.Type:
        draft.form.participantId.value = action.participantId;
        draft.form.participantId.touched = true;
        draft.form.participantId.error =
          (action.participantId !== null &&
            action.participantId.length !== 8) ||
          isNaN(action.participantId as any)
            ? 'A valid Participant ID is an 8-digit number'
            : null;
        draft.form.participantId.validating = true;
        draft.form.participantId.validated = false;
        break;
      case MemoParticipantIdFound.Type:
        draft.form.participantId.validating = false;
        draft.form.participantId.validated = true;
        draft.form.participantId.error = null;
        break;
        break;
      case MemoParticipantIdError.Type:
        draft.form.participantId.validating = false;
        draft.form.participantId.validated = false;
        draft.form.participantId.error = action.participantIdError;
        break;
      case MemoResetSummary.Type:
        draft.lastUpdated = new Date();
        draft.summary = {
          memos: [getDefaultMemo()],
          dialog: {},
        };
        draft.pageError = null;
        draft.pageSuccess = null;
        draft.form.participantId.value = null;
        break;
      case MemoAddNewRow.Type:
        draft.summary.memos.push({
          ...getDefaultMemo(
            Math.max(...draft.summary.memos.map((memo) => memo.id.value), 0) + 1
          ),
        });
        break;
      case MemoRemoveRowById.Type:
        draft.summary.memos = draft.summary.memos.filter(
          (memo) => memo.id.value !== action.id
        );
        break;
      case MemoCusipSearchOpenForId.Type:
        draft.summary.dialog[action.id] = {
          ...draft.summary.dialog[action.id],
          cusip: true,
        };
        break;
      case MemoCusipSearchCloseForId.Type:
        draft.summary.dialog[action.id] = {
          ...draft.summary.dialog[action.id],
          cusip: false,
        };
        break;
      case MemoActionChangeForId.Type: {
        const memo = findMemo(action.id);
        memo.action.value = action.action;
        memo.action.touched = true;
        memo.action.error = null;
        memo.action.validating = false;
        memo.action.validated = true;
        // const quantity = Number(memo.quantity.value);
        // memo.quantity.error =
        //   isNaN(quantity) ||
        //   ( quantity <= 0 && action.action !== 'OVERLAY' ) || // add/subtract cannot be <= 0
        //   ( quantity < 0 && action.action === 'OVERLAY' ) || // Overlay cannot be < 0
        //   ( quantity == 0 && action.action === 'OVERLAY' && memo.memoSegregation <= 0 ) // Overlay cannot be 0 if memoseg is not > 0
        //   ? 'A valid quantity is a positive, whole number'
        //   : null;
        break;
      }
      case MemoCusipChangeForId.Type: {
        const memo = findMemo(action.id);
        memo.cusip.value = action.cusip;
        memo.cusip.touched = true;
        memo.cusip.validating = !!action.cusip;
        memo.cusip.validated = false;
        memo.cusip.error = !action.cusip ? 'CUSIP is required' : null;
        break;
      }
      case MemoCusipFoundForId.Type: {
        const memo = findMemo(action.id);
        // memo.cusip.validating = false;
        // memo.cusip.validated = true;
        memo.cusip.error = null;
        break;
      }
      case MemoCusipErrorForId.Type: {
        const memo = findMemo(action.id);
        memo.cusip.validating = false;
        memo.cusip.validated = false;
        memo.cusip.error = action.cusipError;
        break;
      }
      case MemoCusipBalanceFoundForId.Type: {
        const memo = findMemo(action.id);
        if (
          memo &&
          draft.form.participantId.value === action.participantId &&
          memo.cusip.value === action.cusipId
        ) {
          memo.cusip.validating = false;
          memo.cusip.validated = true;
          memo.cusipName = action.cusipName;
          memo.memoSegregation = action.memoSegregation;
          memo.totalFreeExcess = action.totalFreeExcess;
          memo.totalPositions = action.totalPositions;
          // const quantity = Number(memo.quantity.value);
          // memo.quantity.error =
          //   isNaN(quantity) ||
          //   (quantity <= 0 && memo.action.value !== 'OVERLAY') || // add/subtract cannot be <= 0
          //   (quantity < 0 && memo.action.value === 'OVERLAY') || // Overlay cannot be < 0
          //   (quantity == 0 &&
          //     memo.action.value === 'OVERLAY' &&
          //     memo.memoSegregation <= 0) ||
          //   !Number.isInteger(quantity) // Overlay cannot be 0 if memoseg is not > 0
          //     ? 'A valid quantity is a positive, whole number'
          //     : null;
        }
        break;
      }
      case MemoCusipBalanceErrorForId.Type: {
        const memo = findMemo(action.id);
        memo.cusip.validating = false;
        memo.cusip.validated = false;
        memo.cusip.error = action.cusipError;
        break;
      }
      case MemoQuantityChangeForId.Type: {
        const memo = findMemo(action.id);
        memo.quantity.value = action.quantity;
        memo.quantity.touched = true;
        const value = Number(action.quantity);
        memo.quantity.error =
          isNaN(value) ||
          (value <= 0 && memo.action.value !== 'OVERLAY') || // add/subtract cannot be <= 0
          (value < 0 && memo.action.value === 'OVERLAY') || // Overlay cannot be < 0
          (value == 0 &&
            memo.action.value === 'OVERLAY' &&
            memo.memoSegregation <= 0) || // Overlay cannot be 0 if memoseg is not > 0
          !Number.isInteger(value)
            ? 'A valid quantity is a positive, whole number'
            : null;
        memo.quantity.validated = true;
        break;
      }
      case MemoSubmit.Type:
        draft.pageError = null;
        draft.pageSuccess = null;
        break;
      case MemoSubmitSuccess.Type:
        draft.lastUpdated = new Date();
        draft.pageSuccess = `The following transaction(s) successfully submitted: ${action.ids
          .map((id) => `#${id}`)
          .join(', ')}`;
        draft.summary.memos = draft.summary.memos.filter(
          (memo) => !action.ids.includes(memo.id.value)
        );
        break;
      case MemoSubmitFailure.Type:
        draft.lastUpdated = new Date();
        draft.pageError = `The following transaction(s) were unsuccessful: ${action.ids
          .map((id) => `#${id}`)
          .join(', ')}

          We are currently trying to fix the problem. In the meantime, you can resubmit the remaining unsuccessful memo-segregation(s) or contact the administrator.`;
        break;
      case MemoSubmitError.Type:
        draft.lastUpdated = new Date();
        draft.pageError =
          'Sorry, there was an unexpected error. We are currently trying to fix the problem. In the meantime, you can refresh the page or contact the administrator.'; // action.error;
        break;
    }
  });
}
