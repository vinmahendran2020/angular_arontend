import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CoreService } from '../service/core.service';
import { HttpClient } from '@angular/common/http';
import { CoreFacade } from './core.facade';
import {
  Authenticated,
  Authenticating,
  ClearAuthError,
  ErrorAuthentication,
  Logout,
} from '../store/actions/core.actions';
import { Action } from '@ngrx/store';

describe('CoreService', () => {
  let service: CoreService;
  let facade: CoreFacade;
  let store: MockStore;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideMockStore({
          initialState: {
            core: {
              principal: {
                accessKeyId: 'accessKeyId',
                secretKey: 'secretKey',
                idToken: 'idToken',
                sessionToken: 'sessionToken',
                refreshToken: 'refreshToken',
                user: 'user',
              },
              error: 'core error',
              authenticated: true,
              authenticating: false,
            },
          },
        }),
        CoreFacade,
        CoreService,
      ],
    });
    facade = TestBed.inject(CoreFacade);
    service = TestBed.inject(CoreService);
    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(MockStore);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should get core error', (done) => {
    facade.getAuthError().subscribe((error) => {
      expect(error).toBe('core error');
      done();
    });
  });

  it('should get user', (done) => {
    facade.getUser().subscribe((user) => {
      expect(user).toBe('user');
      done();
    });
  });

  it('should get coreticating', (done) => {
    facade.isAuthenticating().subscribe((coreticating) => {
      expect(coreticating).toBe(false);
      done();
    });
  });

  it('should get coreticated', (done) => {
    facade.isAuthenticated().subscribe((coreticated) => {
      expect(coreticated).toBe(true);
      done();
    });
  });

  it('should dispatch logout', () => {
    const sub = store.scannedActions$.subscribe((a: Action) =>
      expect(['@ngrx/store/init', Logout.Type].includes(a.type)).toBeTruthy()
    );
    facade.logout();
    sub.unsubscribe();
  });

  it('should dispatch clear error', () => {
    const sub = store.scannedActions$.subscribe((a: Action) =>
      expect(
        ['@ngrx/store/init', ClearAuthError.Type].includes(a.type)
      ).toBeTruthy()
    );
    facade.closeError();
    sub.unsubscribe();
  });

  it('should dispatch login success', () => {
    const sub = store.scannedActions$.subscribe((a: Action) =>
      expect(
        ['@ngrx/store/init', Authenticating.Type, Authenticated.Type].includes(
          a.type
        )
      ).toBeTruthy()
    );
    facade.login('name', 'password', '');
    const request = httpMock.expectOne('./api/authentication/v1/login');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      authType: 'credentials',
      username: 'name',
      password: 'password',
    });
    expect(request.request.url).toMatch('./api/authentication/v1/login');
    request.flush({
      data: {
        accessKeyId: 'accessKeyId',
        secretKey: 'secretKey',
        idToken: 'idToken',
        sessionToken: 'sessionToken',
        refreshToken: 'refreshToken',
      },
    });
    httpMock.verify();
    sub.unsubscribe();
  });

  it('should dispatch login error', () => {
    const sub = store.scannedActions$.subscribe((a: Action) =>
      expect(
        [
          '@ngrx/store/init',
          Authenticating.Type,
          ErrorAuthentication.Type,
        ].includes(a.type)
      ).toBeTruthy()
    );
    facade.login('name', 'password', '');
    const request = httpMock.expectOne('./api/authentication/v1/login');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      authType: 'credentials',
      username: 'name',
      password: 'password',
    });
    expect(request.request.url).toMatch('./api/authentication/v1/login');
    request.error(
      new ErrorEvent('error', { error: { description: 'error happened' } })
    );
    httpMock.verify();
    sub.unsubscribe();
  });
});
