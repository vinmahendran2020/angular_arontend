import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

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
import {
  selectTickerSecurityName,
  selectTickerIssuerName,
  selectTickerCusip,
  selectTickerResult,
  selectTickerError,
  selectCanSubmitTicker,
  selectChoosenTickerRecord,
} from '../store/selectors/ticker.selectors';
import { ITickerRecord, ITickerResult } from '../types';
import { map } from 'rxjs/operators';

@Injectable()
export class TickerFacade {
  constructor(private store: Store) {}

  getSecurityName(): Observable<string> {
    return this.store.select(selectTickerSecurityName);
  }

  getIssuerName(): Observable<string> {
    return this.store.select(selectTickerIssuerName);
  }

  getCusip(): Observable<string> {
    return this.store.select(selectTickerCusip);
  }

  getCanSubmit(): Observable<boolean> {
    return this.store.select(selectCanSubmitTicker);
  }

  getSelectedRecord(): Observable<ITickerRecord> {
    return this.store.select(selectChoosenTickerRecord);
  }

  getError(): Observable<string> {
    return this.store.select(selectTickerError);
  }

  getHasError(): Observable<boolean> {
    return this.store
      .select(selectTickerError)
      .pipe(map((error) => error && error.length > 0));
  }

  getResult(): Observable<ITickerResult | undefined> {
    return this.store.select(selectTickerResult);
  }

  getNoResult(): Observable<boolean> {
    return this.store
      .select(selectTickerResult)
      .pipe(map((result) => result && result.items.length === 0));
  }

  getHasResult(): Observable<boolean> {
    return this.store
      .select(selectTickerResult)
      .pipe(map((result) => result && result.items.length > 0));
  }

  search(): void {
    this.store.dispatch(new TickerSearch());
  }

  reset(): void {
    this.store.dispatch(new TickerReset());
  }

  searchBack(): void {
    this.store.dispatch(new TickerSearchBack());
  }

  changeSecurityName(securityName: string): void {
    this.store.dispatch(new TickerSecurityNameChange(securityName));
  }

  changeIssuerName(issuerName: string): void {
    this.store.dispatch(new TickerIssuerNameChange(issuerName));
  }

  changeCusip(cusip: string): void {
    this.store.dispatch(new TickerCusipChange(cusip));
  }

  closeError(): void {
    this.store.dispatch(new TickerErrorClear());
  }

  chooseItem(ticker: string): void {
    this.store.dispatch(new TickerSearchSelection(ticker));
  }
}
