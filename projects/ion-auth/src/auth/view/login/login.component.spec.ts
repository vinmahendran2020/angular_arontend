import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CoreService, CoreFacade } from 'ion-core';
import { selectAuthenticating, selectAuthentionError } from 'ion-core';

import { LoginComponent } from './login.component';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent,
} from '@angular/router';
import { of, Subject } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore;
  let httpMock: HttpTestingController;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [LoginComponent],
      providers: [
        provideMockStore(),
        CoreFacade,
        CoreService,
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({ title: 'test title' }),
            firstChild: {
              data: of({ title: 'test title' }),
            },
          },
        },
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    store.overrideSelector(selectAuthenticating, false);
    store.overrideSelector(selectAuthentionError, '');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update title', () => {
    const event = new NavigationEnd(42, '/', '/');
    (router.events as Subject<RouterEvent>).next(event);
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.title).toBe('test title');
  });

  it('should update firstChild title', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.title).toBe('test title');
  });
});
