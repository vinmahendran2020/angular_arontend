import { ICoreState } from '../../types';
import * as selectors from './core.selectors';

describe('AuthSelector', () => {
  it('testing auth state selector', () => {
    const state = selectors.selectCoreState({
      core: {
        principal: {
          accessKeyId: 'accessKeyId',
          secretKey: 'secretKey',
          idToken: 'idToken',
          sessionToken: 'sessionToken',
          refreshToken: 'refreshToken',
          user: 'user',
          accessToken: 'accessToken'
        },
        error: '',
        authenticated: true,
        authenticating: false,
      },
    } as { core: ICoreState });
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
      accessToken: 'accessToken'
    });
  });

  it('testing authenticating selector', () => {
    const authenticating = selectors.selectAuthenticating({
      core: {
        principal: null,
        error: '',
        authenticated: false,
        authenticating: true,
      },
    } as { core: ICoreState });
    expect(authenticating).toBe(true);
  });

  it('testing authenticated selector', () => {
    const authenticated = selectors.selectAuthenticated({
      core: {
        principal: null,
        error: '',
        authenticated: false,
        authenticating: true,
      },
    } as { core: ICoreState });
    expect(authenticated).toBe(false);
  });

  it('testing auth error selector', () => {
    const authError = selectors.selectAuthentionError({
      core: {
        principal: null,
        error: 'failed auth',
        authenticated: false,
        authenticating: true,
      },
    } as { core: ICoreState });
    expect(authError).toBe('failed auth');
  });

  it('testing auth user selector', () => {
    const user = selectors.selectUser({
      core: {
        principal: {
          accessKeyId: 'accessKeyId',
          secretKey: 'secretKey',
          idToken: 'idToken',
          sessionToken: 'sessionToken',
          refreshToken: 'refreshToken',
          user: 'user',
          accessToken: 'accessToken'
        },
        error: '',
        authenticated: true,
        authenticating: false,
      },
    } as { core: ICoreState });
    expect(user).toBe('user');
  });

  it('testing auth no user selector', () => {
    const user = selectors.selectUser({
      core: {
        principal: null,
        error: 'failed auth',
        authenticated: false,
        authenticating: true,
      },
    } as { core: ICoreState });
    expect(user).toBeFalsy();
  });
});
