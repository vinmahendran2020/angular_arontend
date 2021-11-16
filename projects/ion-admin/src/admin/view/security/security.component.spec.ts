import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { SecurityFacade } from '../../facade/security.facade';

import { SecurityComponent } from './security.component';
import { selectAdminState } from '../../store/selectors/module.selectors';
import { Action } from '@ngrx/store';
import {
  SecurityScheduleEditClose,
  SecurityScheduleEditOpen,
  SecuritySchedulePageLoaded,
  SecurityScheduleRun,
  SecurityScheduleSettlementDateChange,
  SecurityScheduleSubmit,
  SecurityScheduleToggle,
} from '../../store/actions/security.actions';
import { filter, take, toArray } from 'rxjs/operators';

describe('SecurityComponent', () => {
  let component: SecurityComponent;
  let fixture: ComponentFixture<SecurityComponent>;
  let store: MockStore;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [SecurityComponent],
      providers: [provideMockStore(), SecurityFacade],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(MockStore);
    store.overrideSelector(selectAdminState, {
      security: {
        progress: true,
        inProgressMessage: null,
        settlementDate: null,
        schedule: {
          scheduleType: 'SecuritiesSettlement',
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
    fixture = TestBed.createComponent(SecurityComponent);
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
        expect(as[0].type).toBe(SecuritySchedulePageLoaded.Type);
        expect(as[1].type).toBe(SecurityScheduleEditOpen.Type);
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
        expect(as[0].type).toBe(SecuritySchedulePageLoaded.Type);
        expect(as[1].type).toBe(SecurityScheduleEditClose.Type);
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
        expect(as[0].type).toBe(SecuritySchedulePageLoaded.Type);
        expect(as[1].type).toBe(SecurityScheduleSubmit.Type);
        done();
      });
    component.submitEdit({
      scheduleType: 'SecuritiesSettlement',
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
        expect(as[0].type).toBe(SecuritySchedulePageLoaded.Type);
        expect(as[1].type).toBe(SecurityScheduleRun.Type);
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
        expect(as[0].type).toBe(SecuritySchedulePageLoaded.Type);
        expect(as[1].type).toBe(SecurityScheduleToggle.Type);
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
        expect(as[0].type).toBe(SecuritySchedulePageLoaded.Type);
        expect(as[1].type).toBe(SecurityScheduleSettlementDateChange.Type);
        done();
      });
    component.onSettlementDateChange('2020-12-20');
  });
});
