import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CCAFacade } from '../../../facade/cca.facade';
import { CCADetailComponent } from './cca-detail.component';
import { selectDashboardState } from '../../../store/selectors/module.selectors';
import { IonCurrencyPipe, IonNumberPipe } from 'ion-common';

import { Action } from '@ngrx/store';
import { CCACusipChange } from '../../../store/actions/cca.actions';
import { filter, take } from 'rxjs/operators';

describe('CCADetailComponent', () => {
  let component: CCADetailComponent;
  let fixture: ComponentFixture<CCADetailComponent>;
  let store: MockStore;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [CCADetailComponent],
      providers: [
        provideMockStore({
          dashboard: {
            cca: {},
          },
        } as any),
        CCAFacade,
        IonCurrencyPipe,
        IonNumberPipe,
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(MockStore);
    store.overrideSelector(selectDashboardState, {
      cca: {
        form: {
          participantId: {
            type: 'string',
            editable: true,
            touched: false,
            value: '1',
            error: null,
            async: true,
            validatable: true,
            validated: false,
            validating: false,
          },
          settlementDate: {
            type: 'string',
            editable: true,
            touched: false,
            value: ['12/12/2020', '12/14/2020'],
            error: null,
            async: true,
            validatable: true,
            validated: false,
            validating: false,
          },
        },
        summary: null,
        detail: {
          ccaId: null,
          cusip: '',
          debits: [
            {
              netObligationId: '48382',
              cusip: '847382',
              ticker: 'TSLA',
              ccaAmount: 302.0,
              netBuySell: 'Buy',
              netQuantity: 150,
              closePrice: 40.21,
              netTradeAmount: 3020.82,
              netObligationStatus: 'Made',
              direction: 'DB',
            },
          ],
          credits: [
            {
              netObligationId: '135',
              cusip: 'U4898Y2',
              ticker: 'AAPL',
              ccaAmount: 283.0,
              netBuySell: 'Buy',
              netQuantity: 100,
              closePrice: 201.32,
              netTradeAmount: 8000.0,
              netObligationStatus: 'Made',
              direction: 'CR',
            },
          ],
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
    fixture = TestBed.createComponent(CCADetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should formatClosePrice', () => {
    const value = component.formatClosePrice({
      data: {
        netObligationId: '135',
        cusip: 'U4898Y2',
        ticker: 'AAPL',
        ccaAmount: 283.0,
        netBuySell: 'Buy',
        netQuantity: 100,
        closePrice: 201.32,
        netTradeAmount: 8000.0,
        netObligationStatus: 'Made',
      },
    });
    expect(value).toBeTruthy();
  });

  it('should formatCCAAmount', () => {
    const value = component.formatCCAAmount({
      data: {
        netObligationId: '135',
        cusip: 'U4898Y2',
        ticker: 'AAPL',
        ccaAmount: 283.0,
        netBuySell: 'Buy',
        netQuantity: 100,
        closePrice: 201.32,
        netTradeAmount: 8000.0,
        netObligationStatus: 'Made',
      },
    });
    expect(value).toBeTruthy();
  });

  it('should formatNetQuantity', () => {
    const value = component.formatNetQuantity({
      data: {
        netObligationId: '135',
        cusip: 'U4898Y2',
        ticker: 'AAPL',
        ccaAmount: 283.0,
        netBuySell: 'Buy',
        netQuantity: 100,
        closePrice: 201.32,
        netTradeAmount: 8000.0,
        netObligationStatus: 'Made',
      },
    });
    expect(value).toBeTruthy();
  });

  it('should formatNetTradeAmount', () => {
    const value = component.formatNetTradeAmount({
      data: {
        netObligationId: '135',
        cusip: 'U4898Y2',
        ticker: 'AAPL',
        ccaAmount: 283.0,
        netBuySell: 'Buy',
        netQuantity: 100,
        closePrice: 201.32,
        netTradeAmount: 8000.0,
        netObligationStatus: 'Made',
      },
    });
    expect(value).toBeTruthy();
  });

  it('should call onCusipChange', (done) => {
    store.scannedActions$
      .pipe(
        filter((init) => init.type !== '@ngrx/store/init'),
        take(1)
      )
      .subscribe((a: Action) => {
        expect(a.type).toBe(CCACusipChange.Type);
        done();
      });
    component.onCusipChange('00005208');
  });
});
