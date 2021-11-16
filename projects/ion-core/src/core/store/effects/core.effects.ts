import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

import { Authenticated, Logout } from '../actions/core.actions';

@Injectable()
export class CoreEffects {
  authEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<Authenticated>(Authenticated.Type),
      tap((action) => this.router.navigate([action.returnUrl])),
      mergeMap(() => EMPTY as Observable<Action>)
    )
  );

  logoutEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<Logout>(Logout.Type),
      tap((action) => this.router.navigate(['/login'])),
      mergeMap(() => EMPTY as Observable<Action>)
    )
  );

  constructor(private actions$: Actions, private router: Router) {}
}
