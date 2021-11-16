import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { DashboardFacade } from '../../facade/dashboard.facade';

import { DashboardComponent } from './dashboard.component';

import { selectUrl } from '../../store/selectors/module.selectors';
import { Action } from '@ngrx/store';
import { DashboardCurrentTabRefresh } from '../../store/actions/dashboard.actions';
import { Router } from '@angular/router';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let store: MockStore;
  let httpMock: HttpTestingController;
  let paths: string[];

  beforeEach(async () => {
    paths = [];
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [DashboardComponent],
      providers: [
        provideMockStore({
          initialState: {
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
                  collateralId: '2',
                  participantIdError: null,
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
              },
              position: {
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
                  ticker: '2',
                  cusip: '3',
                  date: '12/10/2020',
                  security: '4',
                },
                summary: {
                  netAdditions: 100,
                  minimumAmount: 200,
                  memoSegregation: 300,
                  totalFreeExcess: 400,
                  pledged: 500,
                  totalPositions: 600,
                },
                dialog: {
                  cusip: false,
                  ticker: true,
                },
              },
              obligation: {
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
                },
                selection: {
                  itemId: '2',
                  pendingId: '3',
                  transactions: [
                    {
                      transactionId: '1',
                      cusip: '2',
                      contra: 100,
                      deliverReceiver: '3',
                      quantity: 200,
                      tradeAmount: 300,
                      status: '4',
                      activity: '5',
                      source: '6',
                      reason: '7',
                    },
                  ],
                  trades: [
                    {
                      tradeId: '1',
                      ticker: '2',
                      cusip: '3',
                      buySell: '4',
                      quantity: 100,
                      tradePrice: 200,
                      tradeAmount: 300,
                      settlementDate: '12/10/2020',
                      market: 'AAPL',
                    },
                  ],
                },
                summary: {
                  cusip: '100',
                  sortBy: undefined,
                  longs: [
                    {
                      netObligationId: '',
                      securityName: '',
                      cusip: '',
                      ticker: '',
                      isin: '',
                      netQuantity: 100,
                      netTradeAmount: 200,
                      settlementValue: 300,
                      settlementDate: '',
                      closePrice: 400,
                      settlementStatus: '',
                    },
                  ],
                  shorts: [
                    {
                      netObligationId: '',
                      securityName: '',
                      cusip: '',
                      ticker: '',
                      isin: '',
                      netQuantity: 100,
                      netTradeAmount: 200,
                      settlementValue: 300,
                      settlementDate: '',
                      closePrice: 400,
                      settlementStatus: '',
                    },
                  ],
                },
                dialog: {
                  cusip: false,
                },
              },
            },
          },
        }),
        DashboardFacade,
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
    store.overrideSelector(selectUrl, '/dashboard/position');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate onSelect', () => {
    component.onSelect('position');
    expect(paths[0]).toEqual('/dashboard/position');
  });
});
