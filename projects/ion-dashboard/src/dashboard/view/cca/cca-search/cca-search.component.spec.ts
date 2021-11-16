import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CCAFacade } from '../../../facade/cca.facade';

import { CCASearchComponent } from './cca-search.component';
import { selectDashboardState } from '../../../store/selectors/module.selectors';
import { Action } from '@ngrx/store';
import {
  CCAParticipantIdChange,
  CCASettlementDateChange,
  CCAFormEnterKeyed,
  CCAResetForm,
  CCASummarySearch,
} from '../../../store/actions/cca.actions';
import { filter, take } from 'rxjs/operators';

describe('CCASearchComponent', () => {
  let component: CCASearchComponent;
  let fixture: ComponentFixture<CCASearchComponent>;
  let store: MockStore;
  let httpMock: HttpTestingController;
  let facade: CCAFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [CCASearchComponent],
      providers: [provideMockStore(), CCAFacade],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(MockStore);
    facade = TestBed.get(CCAFacade);

    store.overrideSelector(selectDashboardState, {
      cca: {
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
    fixture = TestBed.createComponent(CCASearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onParticipantIdChange', (done) => {
    store.scannedActions$
      .pipe(
        filter((init) => init.type !== '@ngrx/store/init'),
        take(1)
      )
      .subscribe((a: Action) => {
        expect(a.type).toBe(CCAParticipantIdChange.Type);
        done();
      });
    component.onParticipantIdChange('00005208');
  });

  it('should call onSettlementDateChange', (done) => {
    store.scannedActions$
      .pipe(
        filter((init) => init.type !== '@ngrx/store/init'),
        take(1)
      )
      .subscribe((a: Action) => {
        expect(a.type).toBe(CCASettlementDateChange.Type);
        done();
      });
    component.onSettlementDateChange(['12/10/2020', '12/25/2020']);
  });

  it('should call search', (done) => {
    store.scannedActions$
      .pipe(
        filter((init) => init.type !== '@ngrx/store/init'),
        take(1)
      )
      .subscribe((a: Action) => {
        expect(a.type).toBe(CCASummarySearch.Type);
        done();
      });
    component.search();
  });

  it('should call reset', (done) => {
    store.scannedActions$
      .pipe(
        filter((init) => init.type !== '@ngrx/store/init'),
        take(1)
      )
      .subscribe((a: Action) => {
        expect(a.type).toBe(CCAResetForm.Type);
        done();
      });
    component.reset();
  });

  it('should call enter', (done) => {
    store.scannedActions$
      .pipe(
        filter((init) => init.type !== '@ngrx/store/init'),
        take(1)
      )
      .subscribe((a: Action) => {
        expect(a.type).toBe(CCAFormEnterKeyed.Type);
        done();
      });
    component.enter();
  });
});
