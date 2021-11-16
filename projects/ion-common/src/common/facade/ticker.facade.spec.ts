import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import {
  TickerSecurityNameChange,
  TickerIssuerNameChange,
  TickerCusipChange,
  TickerSearch,
  TickerReset,
  TickerSearchBack,
  TickerErrorClear,
  TickerSearchSelection,
} from '../store/actions/ticker.actions';
import { Action } from '@ngrx/store';
import { TickerFacade } from './ticker.facade';

describe('TickerFacade', () => {
  let facade: TickerFacade;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideMockStore({
          initialState: {
            common: {
              ticker: {
                error: 'ticker error',
                form: {
                  securityName: 'string',
                  issuerName: 'string',
                  ticker: 'string',
                },
                result: {
                  items: [
                    {
                      ticker: 'string',
                      security: 'string',
                      issuer: 'string',
                      price: 0,
                    },
                  ],
                },
              },
            },
          },
        }),
        TickerFacade,
      ],
    });
    facade = TestBed.inject(TickerFacade);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should get no results', (done) => {
    facade.getNoResult().subscribe((res) => {
      expect(res).toBeFalse();
      done();
    });
  });

  it('should get results', (done) => {
    facade.getResult().subscribe((res) => {
      expect(res).toBeTruthy();
      done();
    });
  });

  it('should get has errors', (done) => {
    facade.getHasError().subscribe((res) => {
      expect(res).toBeTruthy();
      done();
    });
  });

  it('should dispatch search back', () => {
    const sub = store.scannedActions$.subscribe((a: Action) =>
      expect(
        ['@ngrx/store/init', TickerSearchBack.Type].includes(a.type)
      ).toBeTruthy()
    );
    facade.searchBack();
    sub.unsubscribe();
  });

  it('should dispatch cusip reset', () => {
    const sub = store.scannedActions$.subscribe((a: Action) =>
      expect(
        ['@ngrx/store/init', TickerReset.Type].includes(a.type)
      ).toBeTruthy()
    );
    facade.reset();
    sub.unsubscribe();
  });

  it('should dispatch cusip search', () => {
    const sub = store.scannedActions$.subscribe((a: Action) =>
      expect(
        ['@ngrx/store/init', TickerSearch.Type].includes(a.type)
      ).toBeTruthy()
    );
    facade.search();
    sub.unsubscribe();
  });

  it('should dispatch cusip security name change', () => {
    const sub = store.scannedActions$.subscribe((a: Action) =>
      expect(
        ['@ngrx/store/init', TickerSecurityNameChange.Type].includes(a.type)
      ).toBeTruthy()
    );
    facade.changeSecurityName('');
    sub.unsubscribe();
  });

  it('should dispatch cusip issuer name change', () => {
    const sub = store.scannedActions$.subscribe((a: Action) =>
      expect(
        ['@ngrx/store/init', TickerIssuerNameChange.Type].includes(a.type)
      ).toBeTruthy()
    );
    facade.changeIssuerName('');
    sub.unsubscribe();
  });

  it('should dispatch ticker change', () => {
    const sub = store.scannedActions$.subscribe((a: Action) =>
      expect(
        ['@ngrx/store/init', TickerCusipChange.Type].includes(a.type)
      ).toBeTruthy()
    );
    facade.changeCusip('');
    sub.unsubscribe();
  });

  it('should dispatch close error', () => {
    const sub = store.scannedActions$.subscribe((a: Action) =>
      expect(
        ['@ngrx/store/init', TickerErrorClear.Type].includes(a.type)
      ).toBeTruthy()
    );
    facade.closeError();
    sub.unsubscribe();
  });

  it('should dispatch search selection', () => {
    const sub = store.scannedActions$.subscribe((a: Action) =>
      expect(
        ['@ngrx/store/init', TickerSearchSelection.Type].includes(a.type)
      ).toBeTruthy()
    );
    facade.chooseItem('ticker1');
    sub.unsubscribe();
  });
});
