import { IPrincipal } from './auth';

export interface ICoreState {
  principal: IPrincipal | null;
  error: string;
  authenticating: boolean;
  authenticated: boolean;
}
