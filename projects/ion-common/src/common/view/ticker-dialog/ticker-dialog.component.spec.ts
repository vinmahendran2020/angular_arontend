import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import {
  TickerSecurityNameChange,
  TickerIssuerNameChange,
  TickerCusipChange,
  TickerSearch,
  TickerReset,
  TickerSearchBack,
  TickerErrorClear,
} from '../../store/actions/ticker.actions';

import { TickerFacade } from '../../facade/ticker.facade';

import { TickerDialogComponent } from './ticker-dialog.component';
import { selectCommonState } from '../../store/selectors/common.selectors';
import { IonCurrencyPipe } from '../../pipe/ion-currency.pipe';
import { DebugElement } from '@angular/core';
import { Action } from '@ngrx/store';
import { By } from '@angular/platform-browser';

describe('TickerDialogComponent', () => {
  let component: TickerDialogComponent;
  let fixture: ComponentFixture<TickerDialogComponent>;
  let store: MockStore;
  let divEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [TickerDialogComponent],
      providers: [provideMockStore(), TickerFacade, IonCurrencyPipe],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.overrideSelector(selectCommonState, {
      ticker: {
        error: '',
        form: {
          securityName: '',
          issuerName: '',
          cusip: '',
        },
        result: {
          items: [
            {
              security: '',
              ticker: '',
              issuer: '',
              price: 100,
              selected: true,
            },
          ],
        },
      },
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TickerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch ticker security name change', () => {
    const sub = store.scannedActions$.subscribe((a: Action) =>
      expect(
        ['@ngrx/store/init', TickerSecurityNameChange.Type].includes(a.type)
      ).toBeTruthy()
    );

    divEl = fixture.debugElement.query(By.css('[name=securityName]'));
    fixture.detectChanges();

    divEl.triggerEventHandler('change', { target: { value: '' } });
    sub.unsubscribe();
  });

  it('should dispatch ticker issuer name change', () => {
    const sub = store.scannedActions$.subscribe((a: Action) =>
      expect(
        ['@ngrx/store/init', TickerIssuerNameChange.Type].includes(a.type)
      ).toBeTruthy()
    );

    divEl = fixture.debugElement.query(By.css('[name=issuerName]'));
    fixture.detectChanges();

    divEl.triggerEventHandler('change', { target: { value: '' } });
    sub.unsubscribe();
  });

  it('should dispatch cusip change', () => {
    const sub = store.scannedActions$.subscribe((a: Action) =>
      expect(
        ['@ngrx/store/init', TickerCusipChange.Type].includes(a.type)
      ).toBeTruthy()
    );

    divEl = fixture.debugElement.query(By.css('[name=CUSIP]'));
    fixture.detectChanges();

    divEl.triggerEventHandler('change', { target: { value: '' } });
    sub.unsubscribe();
  });

  it('should dispatch ticker search', () => {
    const sub = store.scannedActions$.subscribe((a: Action) =>
      expect(
        ['@ngrx/store/init', TickerSearch.Type].includes(a.type)
      ).toBeTruthy()
    );

    divEl = fixture.debugElement.query(By.css('button[name=search]'));
    fixture.detectChanges();

    divEl.triggerEventHandler('click', { target: { value: '' } });
    sub.unsubscribe();
  });

  it('should dispatch ticker reset', () => {
    const sub = store.scannedActions$.subscribe((a: Action) =>
      expect(
        ['@ngrx/store/init', TickerReset.Type].includes(a.type)
      ).toBeTruthy()
    );

    divEl = fixture.debugElement.query(By.css('button[name=reset]'));
    fixture.detectChanges();

    divEl.triggerEventHandler('click', { target: { value: '' } });
    sub.unsubscribe();
  });

  it('should dispatch ticker submit', () => {
    const sub = store.scannedActions$.subscribe((a: Action) =>
      expect(
        ['@ngrx/store/init', TickerSearchBack.Type].includes(a.type)
      ).toBeTruthy()
    );

    component.trigger.subscribe((value) => {
      expect(value).toBeTruthy();
    });

    component.submit();
    sub.unsubscribe();
  });

  it('should dispatch ticker error', () => {
    const sub = store.scannedActions$.subscribe((a: Action) =>
      expect(
        ['@ngrx/store/init', TickerErrorClear.Type].includes(a.type)
      ).toBeTruthy()
    );

    component.closeError();
    sub.unsubscribe();
  });
});
