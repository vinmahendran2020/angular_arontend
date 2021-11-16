import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { EndFacade } from '../../facade/end.facade';

import { EndOfDayComponent } from './end-of-day.component';
import { selectAdminState } from '../../store/selectors/module.selectors';
import { Action } from '@ngrx/store';
import {
  EndScheduleEditClose,
  EndScheduleEditOpen,
  EndSchedulePageLoaded,
  EndScheduleRun,
  EndScheduleSettlementDateChange,
  EndScheduleSubmit,
  EndScheduleToggle,
} from '../../store/actions/end.actions';
import { filter, take, toArray } from 'rxjs/operators';

describe('EndComponent', () => {
  let component: EndOfDayComponent;
  let fixture: ComponentFixture<EndOfDayComponent>;
  let store: MockStore;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [EndOfDayComponent],
      providers: [provideMockStore(), EndFacade],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(MockStore);
    store.overrideSelector(selectAdminState, {
      end: {
        progress: true,
        inProgressMessage: 'False',
        settlementDate: null,
        schedule: {
          scheduleType: 'EndOfDay',
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
    fixture = TestBed.createComponent(EndOfDayComponent);
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
        expect(as[0].type).toBe(EndSchedulePageLoaded.Type);
        expect(as[1].type).toBe(EndScheduleEditOpen.Type);
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
        expect(as[0].type).toBe(EndSchedulePageLoaded.Type);
        expect(as[1].type).toBe(EndScheduleEditClose.Type);
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
        expect(as[0].type).toBe(EndSchedulePageLoaded.Type);
        expect(as[1].type).toBe(EndScheduleSubmit.Type);
        done();
      });
    component.submitEdit({
      scheduleType: 'EndOfDay',
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
        expect(as[0].type).toBe(EndSchedulePageLoaded.Type);
        expect(as[1].type).toBe(EndScheduleRun.Type);
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
        expect(as[0].type).toBe(EndSchedulePageLoaded.Type);
        expect(as[1].type).toBe(EndScheduleToggle.Type);
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
        expect(as[0].type).toBe(EndSchedulePageLoaded.Type);
        expect(as[1].type).toBe(EndScheduleSettlementDateChange.Type);
        done();
      });
    component.onSettlementDateChange('2020-12-20');
  });
});
