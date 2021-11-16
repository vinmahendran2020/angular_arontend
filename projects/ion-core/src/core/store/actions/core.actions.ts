import { Action } from '@ngrx/store';

import { IPrincipal } from '../../types';

export class Authenticating implements Action {
  static Type = 'Core/Authenticating' as const;
  readonly type = Authenticating.Type;
}

export class Authenticated implements Action {
  static Type = 'Core/Authenticated' as const;
  readonly type = Authenticated.Type;
  constructor(public principal: IPrincipal, public returnUrl: string) {}
}

export class ErrorAuthentication implements Action {
  static Type = 'Core/Failed' as const;
  readonly type = ErrorAuthentication.Type;
  constructor(public error: string) {}
}

export class ClearAuthError implements Action {
  static Type = 'Core/ClearError' as const;
  readonly type = ClearAuthError.Type;
}

export class Logout implements Action {
  static Type = 'Core/Logout' as const;
  readonly type = Logout.Type;
}
