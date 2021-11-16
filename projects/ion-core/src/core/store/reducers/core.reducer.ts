import produce from 'immer';

import {
  Authenticated,
  Authenticating,
  ErrorAuthentication,
  ClearAuthError,
  Logout,
} from '../actions/core.actions';

import { ICoreState } from '../../types';

export const initialState: ICoreState = {
  authenticated: false,
  authenticating: false,
  error: '',
  principal: null,
};

export function reducer(
  state: ICoreState = initialState,
  action:
    | Authenticating
    | Authenticated
    | ErrorAuthentication
    | ClearAuthError
    | Logout
): ICoreState {
  return produce(state, (draft) => {
    switch (action.type) {
      case Authenticating.Type:
        draft.error = '';
        draft.authenticated = false;
        draft.authenticating = true;
        break;
      case Authenticated.Type:
        draft.error = '';
        draft.authenticated = true;
        draft.authenticating = false;
        draft.principal = { ...action.principal };
        break;
      case ErrorAuthentication.Type:
        draft.authenticated = false;
        draft.authenticating = false;
        draft.error = action.error;
        draft.principal = null;
        break;
      case ClearAuthError.Type:
        draft.error = '';
        break;
      case Logout.Type:
        draft.error = '';
        draft.authenticated = false;
        draft.authenticating = false;
        draft.principal = null;
        break;
    }
  });
}
