import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ObligationFacade } from '../../../facade/obligation.facade';

import { PendingActivityDialogComponent } from './pending-activity-dialog.component';
import { selectDashboardState } from '../../../store/selectors/module.selectors';
import { IonCurrencyPipe, IonNumberPipe } from 'ion-common';

describe('PendingActivityDialogComponent', () => {
  let component: PendingActivityDialogComponent;
  let fixture: ComponentFixture<PendingActivityDialogComponent>;
  let store: MockStore;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [PendingActivityDialogComponent],
      providers: [
        provideMockStore({
          dashboard: {
            obligation: {},
          },
        } as any),
        ObligationFacade,
        IonCurrencyPipe,
        IonNumberPipe,
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(MockStore);
    store.overrideSelector(selectDashboardState, {
      obligation: {
        form: {
          participantId: {
            type: 'string',
            editable: true,
            touched: false,
            value: '111',
            error: null,
            async: true,
            validatable: true,
            validated: false,
            validating: false,
          },
        },
        summary: {
          cusip: '',
          sortBy: undefined,
          longs: [],
          shorts: [],
          closed: [],
        },
        selection: {
          itemId: null,
          pendingId: null,
          transactions: [],
          trades: [],
        },
        dialog: {
          cusip: false,
        },
        lastUpdated: null,
        initialLoaded: null,
        pageLoaded: null,
        pageError: null,
        pageSuccess: null,
      },
    });
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(PendingActivityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should formatQuantity', () => {
    const value = component.formatQuantity({
      data: {
        quantity: '10',
        tradeAmount: '100',
      },
    });
    expect(value).toBeTruthy();
  });

  it('should formatTradeAmount', () => {
    const value = component.formatTradeAmount({
      data: {
        quantity: '10',
        tradeAmount: '100',
      },
    });
    expect(value).toBeTruthy();
  });
});
