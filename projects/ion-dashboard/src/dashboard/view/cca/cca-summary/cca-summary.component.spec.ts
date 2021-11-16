import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CCAFacade } from '../../../facade/cca.facade';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Action } from '@ngrx/store';
import { IonCurrencyPipe } from 'ion-common';
import { CCASummaryComponent } from './cca-summary.component';

import { selectDashboardState } from '../../../store/selectors/module.selectors';
import {
  CCADetailClose,
  CCADetailOpen,
} from '../../../store/actions/cca.actions';
import { filter, take } from 'rxjs/operators';

describe('CCASummaryComponent', () => {
  let component: CCASummaryComponent;
  let fixture: ComponentFixture<CCASummaryComponent>;
  let store: MockStore;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CCASummaryComponent],
      providers: [provideMockStore(), CCAFacade, IonCurrencyPipe],
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
        summary: {
          participantId: '111',
          adjustments: [
            {
              ccaId: '123',
              settlementDate: '12/12/2020',
              debitCredit: 'Debit',
              netCCAAmount: 1231.12,
              settlementStatus: 'OPEN',
            },
            {
              ccaId: '234',
              settlementDate: '12/16/2020',
              debitCredit: 'Credit',
              netCCAAmount: 2345.34,
              settlementStatus: 'COMPLETE',
            },
          ],
        },
        detail: {
          ccaId: null,
          cusip: '',
          debits: [],
          credits: [],
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
    fixture = TestBed.createComponent(CCASummaryComponent);
    component = fixture.componentInstance;
    component.summary = {
      participantId: '111',
      adjustments: [
        {
          ccaId: '123',
          settlementDate: '12/12/2020',
          debitCredit: 'Debit',
          netCCAAmount: 1231.12,
          settlementStatus: 'OPEN',
        },
        {
          ccaId: '234',
          settlementDate: '12/16/2020',
          debitCredit: 'Credit',
          netCCAAmount: 2345.34,
          settlementStatus: 'COMPLETE',
        },
      ],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should formatNetTradeAmount', () => {
    const value = component.formatNetCCAAmount({
      data: {
        ccaId: '234',
        settlementDate: '12/16/2020',
        debitCredit: 'Credit',
        netCCAAmount: 2345.34,
        settlementStatus: 'COMPLETE',
      },
    });
    expect(value).toBeTruthy();
  });

  it('should call onOpenDetail', (done) => {
    store.scannedActions$
      .pipe(
        filter((init) => init.type !== '@ngrx/store/init'),
        take(1)
      )
      .subscribe((a: Action) => {
        expect(a.type).toBe(CCADetailOpen.Type);
        done();
      });
    component.onOpenDetail({
      ccaId: '234',
      settlementDate: '12/16/2020',
      debitCredit: 'Credit',
      netCCAAmount: 2345.34,
      settlementStatus: 'COMPLETE',
    });
  });

  it('should call closeDetail', (done) => {
    store.scannedActions$
      .pipe(
        filter((init) => init.type !== '@ngrx/store/init'),
        take(1)
      )
      .subscribe((a: Action) => {
        expect(a.type).toBe(CCADetailClose.Type);
        done();
      });
    component.closeDetail();
  });
});
