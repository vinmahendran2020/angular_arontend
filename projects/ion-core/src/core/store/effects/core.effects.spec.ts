import { ReplaySubject } from 'rxjs';

import * as Actions from '../actions/core.actions';
import { CoreEffects } from './core.effects';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';

describe('CoreEffects', () => {
  it('should create', () => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const effects = new CoreEffects(actions$, {} as Router);

    expect(effects).toBeTruthy();
    expect(effects.authEffect$).toBeTruthy();
    expect(effects.logoutEffect$).toBeTruthy();
  });

  it('should navigate to dashboard on login', () => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const paths: string[] = [];

    const effects = new CoreEffects(actions$, {
      navigate(segs: string[]): void {
        paths.push(...segs);
      },
    } as Router);

    effects.authEffect$.subscribe();

    (actions$ as ReplaySubject<Action>).next(new Actions.Authenticating());
    expect(paths.length).toBe(0);

    (actions$ as ReplaySubject<Action>).next(
      new Actions.Authenticated(
        {
          accessKeyId: 'accessKeyId',
          secretKey: 'secretKey',
          idToken: 'idToken',
          sessionToken: 'sessionToken',
          refreshToken: 'refreshToken',
          user: 'user',
          accessToken: 'accessToken',
        },
        '/dashboard'
      )
    );
    expect(paths.length).toBe(1);
    expect(paths[0]).toBe('/dashboard');
  });

  it('should navigate to login on logout', () => {
    // create a ReplaySubject
    const actions$ = new ReplaySubject<Action>(1);

    const paths: string[] = [];

    const effects = new CoreEffects(actions$, {
      navigate(segs: string[]): void {
        paths.push(...segs);
      },
    } as Router);

    effects.logoutEffect$.subscribe();

    (actions$ as ReplaySubject<Action>).next(new Actions.Authenticating());
    expect(paths.length).toBe(0);

    (actions$ as ReplaySubject<Action>).next(new Actions.Logout());
    expect(paths.length).toBe(1);
    expect(paths[0]).toBe('/login');
  });
});
