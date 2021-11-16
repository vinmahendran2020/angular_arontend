import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CCAFacade } from '../../facade/cca.facade';
import { selectDashboardState } from '../../store/selectors/module.selectors';

import { CCAComponent } from './cca.component';

describe('CCAComponent', () => {
  let component: CCAComponent;
  let fixture: ComponentFixture<CCAComponent>;
  let store: MockStore;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [CCAComponent],
      providers: [
        provideMockStore({
          dashboard: {
            cca: {},
          },
        } as any),
        CCAFacade,
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
    fixture = TestBed.createComponent(CCAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
