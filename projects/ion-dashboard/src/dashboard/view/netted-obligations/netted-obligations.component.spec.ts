import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ObligationFacade } from '../../facade/obligation.facade';

import { NettedObligationsComponent } from './netted-obligations.component';
import { selectDashboardState } from '../../store/selectors/module.selectors';

describe('NettedObligationsComponent', () => {
  let component: NettedObligationsComponent;
  let fixture: ComponentFixture<NettedObligationsComponent>;
  let store: MockStore;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [NettedObligationsComponent],
      providers: [
        provideMockStore({
          dashboard: {
            obligation: {},
          },
        } as any),
        ObligationFacade,
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
    fixture = TestBed.createComponent(NettedObligationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
