import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { RiskFacade } from '../../facade/risk.facade';

import { RiskManagementComponent } from './risk-management.component';
import { selectDashboardState } from '../../store/selectors/module.selectors';

describe('RiskManagementComponent', () => {
  let component: RiskManagementComponent;
  let fixture: ComponentFixture<RiskManagementComponent>;
  let store: MockStore;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [RiskManagementComponent],
      providers: [
        provideMockStore({
          dashboard: {
            risk: {},
          },
        } as any),
        RiskFacade,
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(MockStore);
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
    fixture = TestBed.createComponent(RiskManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
