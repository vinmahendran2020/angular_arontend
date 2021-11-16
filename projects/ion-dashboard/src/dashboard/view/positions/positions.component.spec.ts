import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { PositionFacade } from '../../facade/position.facade';

import { PositionsComponent } from './positions.component';
import { selectDashboardState } from '../../store/selectors/module.selectors';

describe('PositionsComponent', () => {
  let component: PositionsComponent;
  let fixture: ComponentFixture<PositionsComponent>;
  let store: MockStore;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [PositionsComponent],
      providers: [
        provideMockStore({
          dashboard: {
            position: {},
          },
        } as any),
        PositionFacade,
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(MockStore);
    store.overrideSelector(selectDashboardState, {
      position: {
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
          cusip: {
            type: 'string',
            editable: true,
            touched: false,
            value: '',
            error: null,
            async: false,
            validatable: true,
            validated: true,
            validating: false,
          },
          date: {
            type: 'string',
            editable: true,
            touched: false,
            value: '',
            error: null,
            async: false,
            validatable: true,
            validated: true,
            validating: false,
          },
        },
        summary: {
          security: '1',
          ticker: '2',
          cusip: '3',
          netAdditions: 100000,
          minimumAmount: 400000,
          memoSegregation: 700000,
          totalFreeExcess: 300000,
          pledged: 80,
          totalPositions: 500000,
        },
        dialog: {
          cusip: false,
          // ticker: false,
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
    fixture = TestBed.createComponent(PositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
