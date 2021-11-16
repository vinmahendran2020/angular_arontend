import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent,
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { of, Subject } from 'rxjs';

import { LayoutComponent } from './layout.component';
import { CoreFacade, CoreService } from 'ion-core';
import { selectAuthenticating, selectAuthentionError } from 'ion-core';
import { ShellFacade } from '../../facade/shell.facade';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let store: MockStore;
  let httpMock: HttpTestingController;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [LayoutComponent],
      providers: [
        provideMockStore(),
        ShellFacade,
        CoreFacade,
        CoreService,
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({ title: 'test title', status: true, breadcrumb: true }),
            firstChild: {
              data: of({ title: 'test title', status: true }),
            },
          },
        },
        {
          provide: Title,
          useValue: {
            setTitle(title: string): void {
              expect(title).toBe('test title');
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
    fixture = TestBed.createComponent(LayoutComponent);
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

  it('should update title blank', () => {
    const event = new NavigationEnd(42, '/', '/');
    activatedRoute.data = of({
      title: 'test title x',
      status: false,
      breadcrumb: false,
    });
    activatedRoute.firstChild.data = of({ title: 'test title', status: false });
    (router.events as Subject<RouterEvent>).next(event);
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.title).toBe('');
  });

  it('should update titles', () => {
    const event = new NavigationEnd(42, '/', '/');
    (router.events as Subject<RouterEvent>).next(event);
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.titles).toEqual(['test title']);
  });

  it('should update firstChild title', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.title).toBe('test title');
  });
});
