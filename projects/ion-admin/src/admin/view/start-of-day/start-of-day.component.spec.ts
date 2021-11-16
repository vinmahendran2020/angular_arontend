import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { StartFacade } from '../../facade/start.facade';

import { StartOfDayComponent } from './start-of-day.component';
import { selectAdminState } from '../../store/selectors/module.selectors';
import { Action } from '@ngrx/store';
import {
  StartScheduleEditClose,
  StartScheduleEditOpen,
  StartSchedulePageLoaded,
  StartScheduleRun,
  StartScheduleSettlementDateChange,
  StartScheduleSubmit,
  StartScheduleToggle,
} from '../../store/actions/start.actions';
import { filter, take, toArray } from 'rxjs/operators';

describe('StartComponent', () => {
  let component: StartOfDayComponent;
  let fixture: ComponentFixture<StartOfDayComponent>;
  let store: MockStore;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [StartOfDayComponent],
      providers: [provideMockStore(), StartFacade],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(MockStore);
    store.overrideSelector(selectAdminState, {
      
      start: {
        progress: true,
        inProgressMessage: null,
        settlementDate: null,
        schedule: {
          scheduleType: 'StartOfDay',
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
    fixture = TestBed.createComponent(StartOfDayComponent);
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
        expect(as[0].type).toBe(StartSchedulePageLoaded.Type);
        expect(as[1].type).toBe(StartScheduleEditOpen.Type);
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
        expect(as[0].type).toBe(StartSchedulePageLoaded.Type);
        expect(as[1].type).toBe(StartScheduleEditClose.Type);
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
        expect(as[0].type).toBe(StartSchedulePageLoaded.Type);
        expect(as[1].type).toBe(StartScheduleSubmit.Type);
        done();
      });
    component.submitEdit({
      scheduleType: 'StartOfDay',
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
        expect(as[0].type).toBe(StartSchedulePageLoaded.Type);
        expect(as[1].type).toBe(StartScheduleRun.Type);
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
        expect(as[0].type).toBe(StartSchedulePageLoaded.Type);
        expect(as[1].type).toBe(StartScheduleToggle.Type);
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
        expect(as[0].type).toBe(StartSchedulePageLoaded.Type);
        expect(as[1].type).toBe(StartScheduleSettlementDateChange.Type);
        done();
      });
    component.onSettlementDateChange('2020-12-20');
  });
});
