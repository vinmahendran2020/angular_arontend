import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { PositionFacade } from '../../../facade/position.facade';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { PositionsSummaryComponent } from './positions-summary.component';

import { selectDashboardState } from '../../../store/selectors/module.selectors';

describe('PositionsSummaryComponent', () => {
  let component: PositionsSummaryComponent;
  let fixture: ComponentFixture<PositionsSummaryComponent>;
  let store: MockStore;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PositionsSummaryComponent],
      providers: [provideMockStore(), PositionFacade],
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
    fixture = TestBed.createComponent(PositionsSummaryComponent);
    component = fixture.componentInstance;
    component.summary = {
      security: '1',
      ticker: '2',
      cusip: '3',
      netAdditions: 100000,
      minimumAmount: 400000,
      memoSegregation: 700000,
      totalFreeExcess: 300000,
      pledged: 8,
      totalPositions: 500000,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
