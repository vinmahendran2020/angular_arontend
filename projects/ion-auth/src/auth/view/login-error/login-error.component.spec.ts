import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CoreService, CoreFacade } from 'ion-core';
import { ClearAuthError, selectAuthenticating, selectAuthentionError } from 'ion-core';

import { LoginErrorComponent } from './login-error.component';
import { Action } from '@ngrx/store';

describe('LoginErrorComponent', () => {
  let component: LoginErrorComponent;
  let fixture: ComponentFixture<LoginErrorComponent>;
  let store: MockStore;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [LoginErrorComponent],
      providers: [provideMockStore(), CoreFacade, CoreService],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(MockStore);
    store.overrideSelector(selectAuthenticating, false);
    store.overrideSelector(selectAuthentionError, '');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear error', () => {
    const sub = store.scannedActions$.subscribe((a: Action) =>
      expect(
        [
          '@ngrx/store/init',
          ClearAuthError.Type,
        ].includes(a.type)
      ).toBeTruthy()
    );
    component.close();
    sub.unsubscribe();
  });
});
