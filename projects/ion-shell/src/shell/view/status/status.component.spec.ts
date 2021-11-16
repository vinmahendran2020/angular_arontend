import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ShellFacade } from '../../facade/shell.facade';

import { StatusComponent } from './status.component';

import { Action } from '@ngrx/store';
import {
  ShellClearPageError,
  ShellClearPageSuccess,
  ShellCurrentPageRefresh,
} from '../../store/actions/shell.actions';
import { Router } from '@angular/router';
import { selectUrl } from '../../store/selectors/shell.selectors';
import { filter, take, toArray } from 'rxjs/operators';

describe('StatusComponent', () => {
  let component: StatusComponent;
  let fixture: ComponentFixture<StatusComponent>;
  let store: MockStore;
  let httpMock: HttpTestingController;
  let paths: string[];

  beforeEach(async () => {
    paths = [];
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [StatusComponent],
      providers: [
        provideMockStore({
          initialState: {
            router: {
              state: {
                root: {
                  params: {},
                  data: {},
                  url: [],
                  outlet: 'primary',
                  routeConfig: null,
                  queryParams: {},
                  firstChild: null,
                  children: [],
                },
                url: '/dashboard/none',
              },
              navigationId: 6,
            },
            dashboard: {
              risk: {
                form: {
                  participantId: {
                    type: 'string',
                    value: '1',
                    error: null,
                    async: true,
                    validatable: true,
                    validated: false,
                    validating: false,
                  },
                  collateralId: {
                    type: 'string',
                    value: '2',
                    error: null,
                    async: false,
                    validatable: true,
                    validated: true,
                    validating: false,
                  },
                },
                summary: {
                  participantId: '100',
                  collateralId: '200',
                  settlementBalance: 100,
                  netDepitCap: 200,
                  collateralMonitor: 300,
                  sppNetActivity: 400,
                  valueAtRisk: 100,
                },
                lastUpdated: null,
                initialLoaded: null,
                pageLoaded: null,
              },
            },
            shell: {
              loadedAt: new Date('12/10/2020'),
            },
          },
        }),
        ShellFacade,
        {
          provide: Router,
          useValue: {
            navigate(segs: string[]): void {
              paths.push(...segs);
            },
          },
        },
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(MockStore);
    store.overrideSelector(selectUrl, '/admin/cash');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call refresh', (done) => {
    store.scannedActions$
      .pipe(
        filter((init) => init.type !== '@ngrx/store/init'),
        take(1)
      )
      .subscribe((a: Action) => {
        expect(a.type).toBe(ShellCurrentPageRefresh.Type);
        done();
      });
    component.refresh();
  });

  it('should call closeError', (done) => {
    store.scannedActions$
      .pipe(
        filter((init) => init.type !== '@ngrx/store/init'),
        take(1)
      )
      .subscribe((a: Action) => {
        expect(a.type).toBe(ShellClearPageError.Type);
        done();
      });
    component.closeError();
  });

  it('should call closeSuccess', (done) => {
    store.scannedActions$
      .pipe(
        filter((init) => init.type !== '@ngrx/store/init'),
        take(1)
      )
      .subscribe((a: Action) => {
        expect(a.type).toBe(ShellClearPageSuccess.Type);
        done();
      });
    component.closeSuccess();
  });
});
