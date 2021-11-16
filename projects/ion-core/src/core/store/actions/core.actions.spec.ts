import * as Actions from './core.actions';

describe('AuthActions', () => {
  it('testing Authenticating action', () => {
    const authenticating = new Actions.Authenticating();
    expect(authenticating).toBeTruthy();
    expect(authenticating.type).toBe(Actions.Authenticating.Type);
  });

  it('testing Authenticated action', () => {
    const authenticated = new Actions.Authenticated(
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
    );
    expect(authenticated).toBeTruthy();
    expect(authenticated.type).toBe(Actions.Authenticated.Type);
    expect(authenticated.principal.accessKeyId).toBe('accessKeyId');
    expect(authenticated.principal.secretKey).toBe('secretKey');
    expect(authenticated.principal.idToken).toBe('idToken');
    expect(authenticated.principal.sessionToken).toBe('sessionToken');
    expect(authenticated.principal.refreshToken).toBe('refreshToken');
    expect(authenticated.principal.user).toBe('user');
    expect(authenticated.principal.accessToken).toBe('accessToken');
  });

  it('testing ErrorAuthentication action', () => {
    const authError = new Actions.ErrorAuthentication('core error');
    expect(authError).toBeTruthy();
    expect(authError.type).toBe(Actions.ErrorAuthentication.Type);
    expect(authError.error).toBe('core error');
  });

  it('testing ClearAuthError action', () => {
    const authClearError = new Actions.ClearAuthError();
    expect(authClearError).toBeTruthy();
    expect(authClearError.type).toBe(Actions.ClearAuthError.Type);
  });
  it('testing Logout action', () => {
    const authLogout = new Actions.Logout();
    expect(authLogout).toBeTruthy();
    expect(authLogout.type).toBe(Actions.Logout.Type);
  });
});
