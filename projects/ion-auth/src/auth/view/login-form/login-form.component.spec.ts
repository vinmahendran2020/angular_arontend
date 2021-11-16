import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CoreService, CoreFacade } from 'ion-core';
import { Authenticating, selectAuthenticating, selectAuthentionError } from 'ion-core';

import { LoginFormComponent } from './login-form.component';
import { Action } from '@ngrx/store';
import { filter, take } from 'rxjs/operators';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let store: MockStore;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [LoginFormComponent],
      providers: [provideMockStore(), CoreFacade, CoreService],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(MockStore);
    store.overrideSelector(selectAuthenticating, false);
    store.overrideSelector(selectAuthentionError, '');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login', (done) => {
    store.scannedActions$
      .pipe(
        filter((init) => init.type !== '@ngrx/store/init'),
        take(1)
      )
      .subscribe((a: Action) => {
        expect(a.type).toBe(Authenticating.Type);
        done();
      });
    component.onLogin();
  });
});
