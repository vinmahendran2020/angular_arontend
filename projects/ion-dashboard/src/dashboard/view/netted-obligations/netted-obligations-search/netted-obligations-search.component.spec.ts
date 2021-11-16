import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ObligationFacade } from '../../../facade/obligation.facade';

import { NettedObligationsSearchComponent } from './netted-obligations-search.component';
import { selectDashboardState } from '../../../store/selectors/module.selectors';
import { Action } from '@ngrx/store';
import {
  ObligationFormEnterKeyed,
  ObligationParticipantIdChange,
  ObligationResetForm,
  ObligationSummarySearch,
} from '../../../store/actions/obligation.actions';
import { filter, take } from 'rxjs/operators';

describe('NettedObligationsSearchComponent', () => {
  let component: NettedObligationsSearchComponent;
  let fixture: ComponentFixture<NettedObligationsSearchComponent>;
  let store: MockStore;
  let httpMock: HttpTestingController;
  let facade: ObligationFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [NettedObligationsSearchComponent],
      providers: [provideMockStore(), ObligationFacade],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(MockStore);
    facade = TestBed.get(ObligationFacade);
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
    fixture = TestBed.createComponent(NettedObligationsSearchComponent);
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
        expect(a.type).toBe(ObligationParticipantIdChange.Type);
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
        expect(a.type).toBe(ObligationSummarySearch.Type);
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
        expect(a.type).toBe(ObligationResetForm.Type);
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
        expect(a.type).toBe(ObligationFormEnterKeyed.Type);
        done();
      });
    component.enter();
  });
});
