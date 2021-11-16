import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ShellFacade } from '../../facade/shell.facade';

import { ScheduleComponent } from './schedule.component';
import { selectShellState } from '../../store/selectors/shell.selectors';

describe('ScheduleComponent', () => {
  let component: ScheduleComponent;
  let fixture: ComponentFixture<ScheduleComponent>;
  let store: MockStore;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ScheduleComponent],
      providers: [provideMockStore(), ShellFacade],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(MockStore);
    store.overrideSelector(selectShellState, {
      loadedAt: null,
      participant: null,
      schedule: {
        netting: null,
        cash: null,
        security: null,
        start: null,
        end: null,
        error: null,
      },
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update titles', () => {
    component.titles = ['parent title', 'child title'];
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.titles).toEqual(['parent title', 'child title']);
  });
});
