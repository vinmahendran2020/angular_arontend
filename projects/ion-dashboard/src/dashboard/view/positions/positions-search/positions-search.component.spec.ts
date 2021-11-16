import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { PositionFacade } from '../../../facade/position.facade';

import { PositionsSearchComponent } from './positions-search.component';
import { selectDashboardState } from '../../../store/selectors/module.selectors';
import { Action } from '@ngrx/store';
import {
  PositionCusipChange,
  PositionCusipSearchClose,
  PositionCusipSearchOpen,
  PositionDateChange,
  PositionFormEnterKeyed,
  PositionParticipantIdChange,
  PositionResetForm,
  PositionSummarySearch,
} from '../../../store/actions/position.actions';
import { filter, take, toArray } from 'rxjs/operators';

describe('PositionsSearchComponent', () => {
  let component: PositionsSearchComponent;
  let fixture: ComponentFixture<PositionsSearchComponent>;
  let store: MockStore;
  let httpMock: HttpTestingController;
  let facade: PositionFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [PositionsSearchComponent],
      providers: [provideMockStore(), PositionFacade],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(MockStore);
    facade = TestBed.get(PositionFacade);
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
            value: '3',
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
            value: '12/10/2020',
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
    fixture = TestBed.createComponent(PositionsSearchComponent);
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
        expect(a.type).toBe(PositionParticipantIdChange.Type);
        done();
      });
    component.onParticipantIdChange('00005208');
  });

  it('should call onCusipChange', (done) => {
    store.scannedActions$
      .pipe(
        filter((init) => init.type !== '@ngrx/store/init'),
        take(1)
      )
      .subscribe((a: Action) => {
        expect(a.type).toBe(PositionCusipChange.Type);
        done();
      });
    component.onCusipChange('00005208');
  });

  it('should call onCusipSelect', (done) => {
    store.scannedActions$
      .pipe(
        filter((init) => init.type !== '@ngrx/store/init'),
        take(2),
        toArray()
      )
      .subscribe((as: Action[]) => {
        expect(as[0].type).toBe(PositionCusipChange.Type);
        expect(as[1].type).toBe(PositionCusipSearchClose.Type);
        done();
      });
    component.onCusipSelect({ cusip: '00005208', security: '200' });
  });

  it('should call onDateChange', (done) => {
    store.scannedActions$
      .pipe(
        filter((init) => init.type !== '@ngrx/store/init'),
        take(1)
      )
      .subscribe((a: Action) => {
        expect(a.type).toBe(PositionDateChange.Type);
        done();
      });
    component.onDateChange('12/10/2020');
  });

  it('should call search', (done) => {
    store.scannedActions$
      .pipe(
        filter((init) => init.type !== '@ngrx/store/init'),
        take(1)
      )
      .subscribe((a: Action) => {
        expect(a.type).toBe(PositionSummarySearch.Type);
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
        expect(a.type).toBe(PositionResetForm.Type);
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
        expect(a.type).toBe(PositionFormEnterKeyed.Type);
        done();
      });
    component.enter();
  });

  it('should call openCusipDialog', (done) => {
    store.scannedActions$
      .pipe(
        filter((init) => init.type !== '@ngrx/store/init'),
        take(1)
      )
      .subscribe((a: Action) => {
        expect(a.type).toBe(PositionCusipSearchOpen.Type);
        done();
      });
    component.openCusipDialog();
  });

  it('should call closeCusipDialog', (done) => {
    store.scannedActions$
      .pipe(
        filter((init) => init.type !== '@ngrx/store/init'),
        take(1)
      )
      .subscribe((a: Action) => {
        expect(a.type).toBe(PositionCusipSearchClose.Type);
        done();
      });
    component.closeCusipDialog();
  });
});
