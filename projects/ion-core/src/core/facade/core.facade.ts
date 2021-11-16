import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  Authenticating,
  Authenticated,
  ErrorAuthentication,
  ClearAuthError,
  Logout,
} from '../store/actions/core.actions';
import {
  selectAuthentionError,
  selectAuthenticating,
  selectUser,
  selectAuthenticated,
} from '../store/selectors/core.selectors';
import { CoreService } from '../service/core.service';
import { catchError, map } from 'rxjs/operators';
import { IPrincipal, IParticipant } from '../types';

@Injectable()
export class CoreFacade {
  constructor(private store: Store, private service: CoreService) {}

  getAuthError(): Observable<string> {
    return this.store.select(selectAuthentionError);
  }

  getUser(): Observable<string> {
    return this.store.select(selectUser);
  }

  getPrincipal(): Observable<IPrincipal> {
    return of(this.service.getPrincipal());
  }

  getParticipants(): Observable<IParticipant[]> {
    return this.service.getParticipants();
  }

  isAuthenticating(): Observable<boolean> {
    return this.store.select(selectAuthenticating);
  }

  isAuthenticated(): Observable<boolean> {
    return this.store.select(selectAuthenticated);
  }

  login(user: string, password: string, returnUrl: string): void {
    this.store.dispatch(new Authenticating());
    this.service
      .login(user, password)
      .pipe(
        map((principal: IPrincipal) => new Authenticated(principal, returnUrl)),
        catchError((error) => of(new ErrorAuthentication(error.toString())))
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  logout(): void {
    this.service.logout();
    this.store.dispatch(new Logout());
  }

  closeError(): void {
    this.store.dispatch(new ClearAuthError());
  }
}
