import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { RiskFacade } from '../../../facade/risk.facade';

import { RiskManagementSearchComponent } from './risk-management-search.component';
import { selectDashboardState } from '../../../store/selectors/module.selectors';
import { Action } from '@ngrx/store';
import {
  RiskFormEnterKeyed,
  RiskParticipantIdChange,
  RiskResetForm,
  RiskSummarySearch,
} from '../../../store/actions/risk.actions';
import { filter, take } from 'rxjs/operators';

describe('RiskManagementSearchComponent', () => {
  let component: RiskManagementSearchComponent;
  let fixture: ComponentFixture<RiskManagementSearchComponent>;
  let store: MockStore;
  let httpMock: HttpTestingController;
  let facade: RiskFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [RiskManagementSearchComponent],
      providers: [provideMockStore(), RiskFacade],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(MockStore);
    facade = TestBed.get(RiskFacade);
    store.overrideSelector(selectDashboardState, {
      risk: {
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
          collateralId: {
            type: 'string',
            editable: false,
            touched: false,
            value: '222',
            error: null,
            async: false,
            validatable: true,
            validated: true,
            validating: false,
          },
        },
        summary: {
          participantId: '111',
          collateralId: '222',
          settlementBalance: 200000,
          netDepitCap: 400000,
          collateralMonitor: 300000,
          sppNetActivity: 600000,
          netDirection: 'D',
          valueAtRisk: 100,
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
    fixture = TestBed.createComponent(RiskManagementSearchComponent);
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
        expect(a.type).toBe(RiskParticipantIdChange.Type);
        done();
      });
    component.onParticipantIdChange('00005208');
  });

  it('should call search', (done) => {
    store.scannedActions$
      .pipe(
        filter((init) => init.type !== '@ngrx/store/init'),
        take(1)
      )
      .subscribe((a: Action) => {
        expect(a.type).toBe(RiskSummarySearch.Type);
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
        expect(a.type).toBe(RiskResetForm.Type);
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
        expect(a.type).toBe(RiskFormEnterKeyed.Type);
        done();
      });
    component.enter();
  });
});
