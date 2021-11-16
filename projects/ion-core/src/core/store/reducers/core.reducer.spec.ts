import { reducer as authReducer } from './core.reducer';
import * as Actions from '../actions/core.actions';

describe('CoreReducer', () => {
  it('testing default state', () => {
    const state = authReducer(undefined, { type: 'init' } as any);
    expect(state).toBeTruthy();
    expect(state.authenticated).toBe(false);
    expect(state.authenticating).toBe(false);
    expect(state.error).toBe('');
    expect(state.principal).toBeNull();
  });

  it('testing authenticating reducer', () => {
    const state = authReducer(undefined, new Actions.Authenticating());
    expect(state).toBeTruthy();
    expect(state.authenticated).toBe(false);
    expect(state.authenticating).toBe(true);
    expect(state.error).toBe('');
    expect(state.principal).toBeNull();
  });

  it('testing authenticating reducer', () => {
    const state = authReducer(
      undefined,
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
        'returnUrl'
      )
    );
    expect(state).toBeTruthy();
    expect(state.authenticated).toBe(true);
    expect(state.authenticating).toBe(false);
    expect(state.error).toBe('');
    expect(state.principal).toEqual({
      accessKeyId: 'accessKeyId',
      secretKey: 'secretKey',
      idToken: 'idToken',
      sessionToken: 'sessionToken',
      refreshToken: 'refreshToken',
      user: 'user',
      accessToken: 'accessToken',
    });
  });

  it('testing error authentication reducer', () => {
    const state = authReducer(
      undefined,
      new Actions.ErrorAuthentication('failed core')
    );
    expect(state).toBeTruthy();
    expect(state.authenticated).toBe(false);
    expect(state.authenticating).toBe(false);
    expect(state.error).toBe('failed core');
    expect(state.principal).toBeNull();
  });

  it('testing clear error authentication reducer', () => {
    let state = authReducer(
      undefined,
      new Actions.ErrorAuthentication('failed core')
    );
    expect(state.error).toBe('failed core');
    state = authReducer(state, new Actions.ClearAuthError());
    expect(state.error).toBe('');
  });

  it('testing logout reducer', () => {
    let state = authReducer(
      undefined,
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
        'returnUrl'
      )
    );
    expect(state.authenticated).toBe(true);
    expect(state.principal).toBeTruthy();
    state = authReducer(state, new Actions.Logout());
    expect(state.authenticated).toBe(false);
    expect(state.authenticating).toBe(false);
    expect(state.error).toBe('');
    expect(state.principal).toBeNull();
  });
});
