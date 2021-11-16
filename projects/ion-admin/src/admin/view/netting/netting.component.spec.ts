import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { NettingFacade } from '../../facade/netting.facade';

import { NettingComponent } from './netting.component';
import { selectAdminState } from '../../store/selectors/module.selectors';
import { Action } from '@ngrx/store';
import {
  NettingScheduleEditClose,
  NettingScheduleEditOpen,
  NettingSchedulePageLoaded,
  NettingScheduleRun,
  NettingScheduleSubmit,
  NettingScheduleToggle,
} from '../../store/actions/netting.actions';
import { filter, take, toArray } from 'rxjs/operators';

describe('NettingComponent', () => {
  let component: NettingComponent;
  let fixture: ComponentFixture<NettingComponent>;
  let store: MockStore;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [NettingComponent],
      providers: [provideMockStore(), NettingFacade],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(MockStore);
    store.overrideSelector(selectAdminState, {
      netting: {
        progress: true,
        inProgressMessage: null,
        schedule: {
          scheduleType: 'Netting',
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
    fixture = TestBed.createComponent(NettingComponent);
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
        expect(as[0].type).toBe(NettingSchedulePageLoaded.Type);
        expect(as[1].type).toBe(NettingScheduleEditOpen.Type);
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
        expect(as[0].type).toBe(NettingSchedulePageLoaded.Type);
        expect(as[1].type).toBe(NettingScheduleEditClose.Type);
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
        expect(as[0].type).toBe(NettingSchedulePageLoaded.Type);
        expect(as[1].type).toBe(NettingScheduleSubmit.Type);
        done();
      });
    component.submitEdit({
      scheduleType: 'Netting',
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
        expect(as[0].type).toBe(NettingSchedulePageLoaded.Type);
        expect(as[1].type).toBe(NettingScheduleRun.Type);
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
        expect(as[0].type).toBe(NettingSchedulePageLoaded.Type);
        expect(as[1].type).toBe(NettingScheduleToggle.Type);
        done();
      });
    component.onToggle(true);
  });
});
