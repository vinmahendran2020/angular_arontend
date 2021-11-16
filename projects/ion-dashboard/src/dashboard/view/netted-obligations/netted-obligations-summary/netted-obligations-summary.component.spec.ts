import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ObligationFacade } from '../../../facade/obligation.facade';

import { NettedObligationsSummaryComponent } from './netted-obligations-summary.component';
import { selectDashboardState } from '../../../store/selectors/module.selectors';
import { IonCurrencyPipe, IonNumberPipe } from 'ion-common';
import { Action } from '@ngrx/store';
import {
  ObligationCusipChange,
  ObligationCusipSearchClose,
  ObligationCusipSearchOpen,
  ObligationTradesClose,
  ObligationTradesOpen,
  ObligationTransactionsClose,
  ObligationTransactionsOpen,
} from '../../../store/actions/obligation.actions';
import { filter, take, toArray } from 'rxjs/operators';

describe('NettedObligationsSummaryComponent', () => {
  let component: NettedObligationsSummaryComponent;
  let fixture: ComponentFixture<NettedObligationsSummaryComponent>;
  let store: MockStore;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [NettedObligationsSummaryComponent],
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
    fixture = TestBed.createComponent(NettedObligationsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should formatQuantity', () => {
    const value = component.formatNetQuantity({
      data: {
        netQuantity: '10',
        netTradeAmount: '00005208',
        settlementValue: '200',
        closePrice: '300',
      },
    });
    expect(value).toBeTruthy();
  });

  it('should formatNetTradeAmount', () => {
    const value = component.formatNetTradeAmount({
      data: {
        netQuantity: '10',
        netTradeAmount: '00005208',
        settlementValue: '200',
        closePrice: '300',
      },
    });
    expect(value).toBeTruthy();
  });

  it('should formatSettlementValue', () => {
    const value = component.formatSettlementValue({
      data: {
        netQuantity: '10',
        netTradeAmount: '00005208',
        settlementValue: '200',
        closePrice: '300',
      },
    });
    expect(value).toBeTruthy();
  });

  it('should formatClosePrice', () => {
    const value = component.formatClosePrice({
      data: {
        netQuantity: '10',
        netTradeAmount: '00005208',
        settlementValue: '200',
        closePrice: '300',
      },
    });
    expect(value).toBeTruthy();
  });

  it('should call openTrades', (done) => {
    store.scannedActions$
      .pipe(
        filter((init) => init.type !== '@ngrx/store/init'),
        take(1)
      )
      .subscribe((a: Action) => {
        expect(a.type).toBe(ObligationTradesOpen.Type);
        done();
      });
    component.onOpenTrades({
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
    });
  });

  it('should call closeTrades', (done) => {
    store.scannedActions$
      .pipe(
        filter((init) => init.type !== '@ngrx/store/init'),
        take(1)
      )
      .subscribe((a: Action) => {
        expect(a.type).toBe(ObligationTradesClose.Type);
        done();
      });
    component.closeTrades();
  });

  it('should call onOpenTransactions', (done) => {
    store.scannedActions$
      .pipe(
        filter((init) => init.type !== '@ngrx/store/init'),
        take(1)
      )
      .subscribe((a: Action) => {
        expect(a.type).toBe(ObligationTransactionsOpen.Type);
        done();
      });
    component.onOpenTransactions({
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
    });
  });

  it('should call closeTransactions', (done) => {
    store.scannedActions$
      .pipe(
        filter((init) => init.type !== '@ngrx/store/init'),
        take(1)
      )
      .subscribe((a: Action) => {
        expect(a.type).toBe(ObligationTransactionsClose.Type);
        done();
      });
    component.closeTransactions();
  });

  it('should call openCusipDialog', (done) => {
    store.scannedActions$
      .pipe(
        filter((init) => init.type !== '@ngrx/store/init'),
        take(1)
      )
      .subscribe((a: Action) => {
        expect(a.type).toBe(ObligationCusipSearchOpen.Type);
        done();
      });
    component.openCusipDialog();
  });

  it('should call closeCusipDialog', (done) => {
    store.scannedActions$
      .pipe(
        filter((init) => init.type !== '@ngrx/store/init'),
        take(1)
      )
      .subscribe((a: Action) => {
        expect(a.type).toBe(ObligationCusipSearchClose.Type);
        done();
      });
    component.closeCusipDialog();
  });

  it('should call onCusipChange', (done) => {
    store.scannedActions$
      .pipe(
        filter((init) => init.type !== '@ngrx/store/init'),
        take(1)
      )
      .subscribe((a: Action) => {
        expect(a.type).toBe(ObligationCusipChange.Type);
        done();
      });
    component.onCusipChange('00005208');
  });

  it('should call onCusipSelect', (done) => {
    store.scannedActions$
      .pipe(
        filter((init) => init.type !== '@ngrx/store/init'),
        take(2),
        toArray()
      )
      .subscribe((as: Action[]) => {
        expect(as[0].type).toBe(ObligationCusipChange.Type);
        expect(as[1].type).toBe(ObligationCusipSearchClose.Type);
        done();
      });
    component.onCusipSelect({ cusip: '00005208' });
  });
});
