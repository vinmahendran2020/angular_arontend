import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CusipFacade } from './cusip.facade';
import {
  CusipSecurityNameChange,
  CusipIssuerNameChange,
  CusipTickerChange,
  CusipSearch,
  CusipReset,
  CusipSearchBack,
  CusipErrorClear,
  CusipSearchSelection,
} from '../store/actions/cusip.actions';
import { Action } from '@ngrx/store';

describe('CusipFacade', () => {
  let facade: CusipFacade;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideMockStore({
          initialState: {
            common: {
              cusip: {
                error: 'cusip error',
                form: {
                  securityName: 'string',
                  issuerName: 'string',
                  ticker: 'string',
                },
                result: {
                  items: [
                    {
                      cusip: 'string',
                      security: 'string',
                      issuer: 'string',
                      price: 0,
                    },
                  ],
                },
              },
              ticker: {},
            },
          },
        }),
        CusipFacade,
      ],
    });
    facade = TestBed.inject(CusipFacade);
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
        ['@ngrx/store/init', CusipSearchBack.Type].includes(a.type)
      ).toBeTruthy()
    );
    facade.searchBack();
    sub.unsubscribe();
  });

  it('should dispatch cusip reset', () => {
    const sub = store.scannedActions$.subscribe((a: Action) =>
      expect(
        ['@ngrx/store/init', CusipReset.Type].includes(a.type)
      ).toBeTruthy()
    );
    facade.reset();
    sub.unsubscribe();
  });

  it('should dispatch cusip search', () => {
    const sub = store.scannedActions$.subscribe((a: Action) =>
      expect(
        ['@ngrx/store/init', CusipSearch.Type].includes(a.type)
      ).toBeTruthy()
    );
    facade.search();
    sub.unsubscribe();
  });

  it('should dispatch cusip security name change', () => {
    const sub = store.scannedActions$.subscribe((a: Action) =>
      expect(
        ['@ngrx/store/init', CusipSecurityNameChange.Type].includes(a.type)
      ).toBeTruthy()
    );
    facade.changeSecurityName('');
    sub.unsubscribe();
  });

  it('should dispatch cusip issuer name change', () => {
    const sub = store.scannedActions$.subscribe((a: Action) =>
      expect(
        ['@ngrx/store/init', CusipIssuerNameChange.Type].includes(a.type)
      ).toBeTruthy()
    );
    facade.changeIssuerName('');
    sub.unsubscribe();
  });

  it('should dispatch ticker change', () => {
    const sub = store.scannedActions$.subscribe((a: Action) =>
      expect(
        ['@ngrx/store/init', CusipTickerChange.Type].includes(a.type)
      ).toBeTruthy()
    );
    facade.changeTicker('');
    sub.unsubscribe();
  });

  it('should dispatch close error', () => {
    const sub = store.scannedActions$.subscribe((a: Action) =>
      expect(
        ['@ngrx/store/init', CusipErrorClear.Type].includes(a.type)
      ).toBeTruthy()
    );
    facade.closeError();
    sub.unsubscribe();
  });

  it('should dispatch search selection', () => {
    const sub = store.scannedActions$.subscribe((a: Action) =>
      expect(
        ['@ngrx/store/init', CusipSearchSelection.Type].includes(a.type)
      ).toBeTruthy()
    );
    facade.chooseItem('cusip1');
    sub.unsubscribe();
  });
});
