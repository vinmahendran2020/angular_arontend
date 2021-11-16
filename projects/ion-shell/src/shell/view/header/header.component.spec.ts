import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import {
  IParticipant,
  selectAuthenticating,
  selectAuthentionError,
  selectUser,
  CoreFacade,
  CoreService,
  Logout,
} from 'ion-core';

import { ShellFacade } from '../../facade/shell.facade';
import { ShellParticipantChanged } from '../../store/actions/shell.actions';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: MockStore;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [HeaderComponent],
      providers: [
        provideMockStore(),
        ShellFacade,
        CoreFacade,
        {
          provide: CoreService,
          useValue: {
            logout(): void {
            },
            getParticipants(): Observable<IParticipant[]> {
              return of([
                {
                  partId: '00001116',
                  partName: 'Alpha Financial Group',
                  status: 'ACTIVE',
                  partMSegInd: 'Y',
                  testPartInd: 'Y',
                  collPosInd: 'Y',
                  bypassCollMntrInd: 'Y',
                  bypassDbtCapInd: 'Y',
                  sdfMaNaAccountInd: 'Y',
                  collGrpId: '14532035',
                  createDate: '2021-02-11',
                  lastUpdateDate: '2021-02-11',
                },
                {
                  partId: '00005208',
                  partName: 'Bravo Bank',
                  status: 'ACTIVE',
                  partMSegInd: 'Y',
                  testPartInd: 'Y',
                  collPosInd: 'Y',
                  bypassCollMntrInd: 'Y',
                  bypassDbtCapInd: 'Y',
                  sdfMaNaAccountInd: 'Y',
                  collGrpId: '14532035',
                  createDate: '2021-02-11',
                  lastUpdateDate: '2021-02-11',
                },
              ]);
            },
          },
        },
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(MockStore);
    store.overrideSelector(selectAuthenticating, false);
    store.overrideSelector(selectAuthentionError, '');
    store.overrideSelector(selectUser, '');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout', (done) => {
    store.scannedActions$
      .pipe(
        filter((init) => init.type !== '@ngrx/store/init'),
        take(1)
      )
      .subscribe((a: Action) => {
        expect(a.type).toBe(Logout.Type);
        done();
      });
    component.logout();
  });

  it('should onParticipantChange', (done) => {
    store.scannedActions$
      .pipe(
        filter((init) => init.type !== '@ngrx/store/init'),
        take(1)
      )
      .subscribe((a: Action) => {
        expect(a.type).toBe(ShellParticipantChanged.Type);
        done();
      });
    component.onParticipantChange({ label: 'Brova Bank', value: '00005208' });
  });

  it('should call defaultValueHack', () => {
    component.defaultValueHack();
  });
});
