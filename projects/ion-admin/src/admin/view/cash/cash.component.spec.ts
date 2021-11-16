import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CashFacade } from '../../facade/cash.facade';

import { CashComponent } from './cash.component';
import { selectAdminState } from '../../store/selectors/module.selectors';
import { Action } from '@ngrx/store';
import {
  CashScheduleEditClose,
  CashScheduleEditOpen,
  CashSchedulePageLoaded,
  CashScheduleRun,
  CashScheduleSettlementDateChange,
  CashScheduleSubmit,
  CashScheduleToggle,
} from '../../store/actions/cash.actions';
import { filter, take, toArray } from 'rxjs/operators';

describe('CashComponent', () => {
  let component: CashComponent;
  let fixture: ComponentFixture<CashComponent>;
  let store: MockStore;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [CashComponent],
      providers: [provideMockStore(), CashFacade],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(MockStore);
    store.overrideSelector(selectAdminState, {
      cash: {
        progress: true,
        inProgressMessage: null,
        settlementDate: null,
        schedule: {
          scheduleType: 'Cash',
          startTime: '5:00AM',
          endTime: '9:00PM',
          timezone: 'US/Hawaii',
          hours: 2,
          minutes: 40,
          status: 'ACTIVE',
        },
        lastUpdated: new Date('2020-12-30T12:09:40.592Z'),
        initialLoaded: null,
        pageLoaded: null,
        editing: false,
        commitMessage: '',
        commitError: '',
        pageError: null,
        pageSuccess: null,
      },
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call openEdit', (done) => {
    store.scannedActions$
      .pipe(
        filter((init) => init.type !== '@ngrx/store/init'),
        take(2),
        toArray()
      )
      .subscribe((as: Action[]) => {
        expect(as[0].type).toBe(CashSchedulePageLoaded.Type);
        expect(as[1].type).toBe(CashScheduleEditOpen.Type);
        done();
      });
    component.openEdit();
  });

  it('should call closeEdit', (done) => {
    store.scannedActions$
      .pipe(
        filter((init) => init.type !== '@ngrx/store/init'),
        take(2),
        toArray()
      )
      .subscribe((as: Action[]) => {
        expect(as[0].type).toBe(CashSchedulePageLoaded.Type);
        expect(as[1].type).toBe(CashScheduleEditClose.Type);
        done();
      });
    component.closeEdit();
  });

  it('should call submitEdit', (done) => {
    store.scannedActions$
      .pipe(
        filter((init) => init.type !== '@ngrx/store/init'),
        take(2),
        toArray()
      )
      .subscribe((as: Action[]) => {
        expect(as[0].type).toBe(CashSchedulePageLoaded.Type);
        expect(as[1].type).toBe(CashScheduleSubmit.Type);
        done();
      });
    component.submitEdit({
      scheduleType: 'Cash',
      startTime: '5:00AM',
      endTime: '9:00PM',
      timezone: 'US/Hawaii',
      hours: 2,
      minutes: 40,
      status: 'ACTIVE',
    });
  });

  it('should call onRun', (done) => {
    store.scannedActions$
      .pipe(
        filter((init) => init.type !== '@ngrx/store/init'),
        take(2),
        toArray()
      )
      .subscribe((as: Action[]) => {
        expect(as[0].type).toBe(CashSchedulePageLoaded.Type);
        expect(as[1].type).toBe(CashScheduleRun.Type);
        done();
      });
    component.onRun();
  });

  it('should call onToggle', (done) => {
    store.scannedActions$
      .pipe(
        filter((init) => init.type !== '@ngrx/store/init'),
        take(2),
        toArray()
      )
      .subscribe((as: Action[]) => {
        expect(as[0].type).toBe(CashSchedulePageLoaded.Type);
        expect(as[1].type).toBe(CashScheduleToggle.Type);
        done();
      });
    component.onToggle(true);
  });

  it('should call onSettlementDateChange', (done) => {
    store.scannedActions$
      .pipe(
        filter((init) => init.type !== '@ngrx/store/init'),
        take(2),
        toArray()
      )
      .subscribe((as: Action[]) => {
        expect(as[0].type).toBe(CashSchedulePageLoaded.Type);
        expect(as[1].type).toBe(CashScheduleSettlementDateChange.Type);
        done();
      });
    component.onSettlementDateChange('2020-12-20');
  });
});
