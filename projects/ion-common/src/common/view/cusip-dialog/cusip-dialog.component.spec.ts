import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import { CusipFacade } from '../../facade/cusip.facade';
import {
  CusipSecurityNameChange,
  CusipIssuerNameChange,
  CusipTickerChange,
  CusipSearch,
  CusipReset,
  CusipSearchBack,
  CusipErrorClear,
} from './../../store/actions/cusip.actions';
import { CusipDialogComponent } from './cusip-dialog.component';
import { selectCommonState } from '../../store/selectors/common.selectors';
import { IonCurrencyPipe } from '../../pipe/ion-currency.pipe';
import { Action } from '@ngrx/store';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CusipDialogComponent', () => {
  let component: CusipDialogComponent;
  let fixture: ComponentFixture<CusipDialogComponent>;
  let store: MockStore;
  let divEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [CusipDialogComponent],
      providers: [provideMockStore(), CusipFacade, IonCurrencyPipe],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.overrideSelector(selectCommonState, {
      cusip: {
        error: '',
        form: {
          securityName: '',
          issuerName: '',
          ticker: '',
        },
        result: {
          items: [
            {
              cusip: '',
              security: '',
              issuer: '',
              price: 100,
              selected: true
            }
          ],
        },
      },
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CusipDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch cusip security name change', () => {
    const sub = store.scannedActions$.subscribe((a: Action) =>
      expect(
        ['@ngrx/store/init', CusipSecurityNameChange.Type].includes(a.type)
      ).toBeTruthy()
    );

    divEl = fixture.debugElement.query(By.css('[name=securityName]'));
    fixture.detectChanges();

    divEl.triggerEventHandler('change', { target: { value: '' } });
    sub.unsubscribe();
  });

  it('should dispatch cusip issuer name change', () => {
    const sub = store.scannedActions$.subscribe((a: Action) =>
      expect(
        ['@ngrx/store/init', CusipIssuerNameChange.Type].includes(a.type)
      ).toBeTruthy()
    );

    divEl = fixture.debugElement.query(By.css('[name=issuerName]'));
    fixture.detectChanges();

    divEl.triggerEventHandler('change', { target: { value: '' } });
    sub.unsubscribe();
  });

  it('should dispatch ticker change', () => {
    const sub = store.scannedActions$.subscribe((a: Action) =>
      expect(
        ['@ngrx/store/init', CusipTickerChange.Type].includes(a.type)
      ).toBeTruthy()
    );

    divEl = fixture.debugElement.query(By.css('[name=ticker]'));
    fixture.detectChanges();

    divEl.triggerEventHandler('change', { target: { value: '' } });
    sub.unsubscribe();
  });

  it('should dispatch cusip search', () => {
    const sub = store.scannedActions$.subscribe((a: Action) =>
      expect(
        ['@ngrx/store/init', CusipSearch.Type].includes(a.type)
      ).toBeTruthy()
    );

    divEl = fixture.debugElement.query(By.css('button[name=search]'));
    fixture.detectChanges();

    divEl.triggerEventHandler('click', { target: { value: '' } });
    sub.unsubscribe();
  });

  it('should dispatch cusip reset', () => {
    const sub = store.scannedActions$.subscribe((a: Action) =>
      expect(
        ['@ngrx/store/init', CusipReset.Type].includes(a.type)
      ).toBeTruthy()
    );

    divEl = fixture.debugElement.query(By.css('button[name=reset]'));
    fixture.detectChanges();

    divEl.triggerEventHandler('click', { target: { value: '' } });
    sub.unsubscribe();
  });

  it('should dispatch cusip submit', () => {
    const sub = store.scannedActions$.subscribe((a: Action) =>
      expect(
        ['@ngrx/store/init', CusipSearchBack.Type].includes(a.type)
      ).toBeTruthy()
    );

    component.trigger.subscribe((value) => {
      expect(value).toBeTruthy();
    });

    component.submit();
    sub.unsubscribe();
  });

  it('should dispatch cusip error', () => {
    const sub = store.scannedActions$.subscribe((a: Action) =>
      expect(
        ['@ngrx/store/init', CusipErrorClear.Type].includes(a.type)
      ).toBeTruthy()
    );

    component.closeError();
    sub.unsubscribe();
  });

  it('should dispatch cusip error', () => {
    const sub = store.scannedActions$.subscribe((a: Action) =>
      expect(
        ['@ngrx/store/init', CusipErrorClear.Type].includes(a.type)
      ).toBeTruthy()
    );

    component.closeError();
    sub.unsubscribe();
  });
});
