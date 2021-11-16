import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AdminFacade } from '../../facade/admin.facade';

import { AdminComponent } from './admin.component';

import { selectUrl } from '../../store/selectors/module.selectors';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { AdminCurrentTabRefresh } from '../../store/actions/admin.actions';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let store: MockStore;
  let paths: string[];
  let facade: AdminFacade;

  beforeEach(async () => {
    paths = [];
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [AdminComponent],
      providers: [
        provideMockStore({
          initialState: {
            admin: {
              netting: {
                progress: false,
                schedule: {
                  id: 1,
                  startDate: '2020-10-10T00:00:00.000+00:00',
                  startTime: '7:00AM',
                  endTime: '11:00AM',
                  timezone: 'US/Hawaii',
                  hours: 4,
                  minutes: 30,
                  status: 'ACTIVE',
                },
                lastUpdated: '2020-12-30T12:09:48.887Z',
                editing: false,
                commitMessage: '',
                commitError: '',
                pageError: null,
              },
              security: {
                progress: true,
                settlementDate: null,
                schedule: {
                  id: 2,
                  startDate: '2020-10-10T00:00:00.000+00:00',
                  startTime: '7:00PM',
                  endTime: '10:00PM',
                  timezone: 'IST',
                  hours: 0,
                  minutes: 0,
                  status: 'ACTIVE',
                },
                lastUpdated: '2020-12-30T12:10:18.628Z',
                editing: false,
                commitMessage: '',
                commitError: '',
                pageError: null,
              },
              cash: {
                progress: true,
                settlementDate: null,
                schedule: {
                  id: 3,
                  startDate: '2020-10-10T00:00:00.000+00:00',
                  startTime: '5:00AM',
                  endTime: '9:00PM',
                  timezone: 'US/Hawaii',
                  hours: 2,
                  minutes: 40,
                  status: 'ACTIVE',
                },
                lastUpdated: '2020-12-30T12:09:40.592Z',
                editing: false,
                commitMessage: '',
                commitError: '',
                pageError: null,
              },
            },
          },
        }),
        AdminFacade,
        {
          provide: Router,
          useValue: {
            navigate(segs: string[]): void {
              paths.push(...segs);
            },
          },
        },
      ],
    }).compileComponents();

    facade = TestBed.inject(AdminFacade);
    store = TestBed.inject(MockStore);
    store.overrideSelector(selectUrl, '/admin/cash');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate onSelect', () => {
    component.onSelect('netting');
    expect(paths[0]).toEqual('/admin/netting');
  });

  it('should get current tab', () => {
    facade.getCurrentTab().subscribe(res => {
      expect(res).toBe('cash');
    }).unsubscribe();
  });

  it('should refresh current tab', () => {
    const sub = store.scannedActions$.subscribe((a: Action) =>
      expect(
        ['@ngrx/store/init', AdminCurrentTabRefresh.Type].includes(a.type)
      ).toBeTruthy()
    );
    facade.tabRefresh('netting');
    sub.unsubscribe();
  });

  it('should refresh current tab to security', () => {
    const sub = store.scannedActions$.subscribe((a: Action) =>
      expect(
        ['@ngrx/store/init', AdminCurrentTabRefresh.Type].includes(a.type)
      ).toBeTruthy()
    );
    component.onSelect('settlement/security');
    sub.unsubscribe();
  });

  it('should refresh current tab to netting', () => {
    const sub = store.scannedActions$.subscribe((a: Action) =>
      expect(
        ['@ngrx/store/init', AdminCurrentTabRefresh.Type].includes(a.type)
      ).toBeTruthy()
    );
    component.onSelect('netting');
    sub.unsubscribe();
  });
});
