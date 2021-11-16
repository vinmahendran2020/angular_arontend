import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

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
import {
  selectCusipSecurityName,
  selectCusipIssuerName,
  selectCusipTicker,
  selectCusipResult,
  selectCusipError,
  selectCanSubmitCusip,
  selectChoosenCusipRecord,
} from '../store/selectors/cusip.selectors';
import { ICusipRecord, ICusipResult } from '../types';
import { map } from 'rxjs/operators';

@Injectable()
export class CusipFacade {
  constructor(private store: Store) {}

  getSecurityName(): Observable<string> {
    return this.store.select(selectCusipSecurityName);
  }

  getIssuerName(): Observable<string> {
    return this.store.select(selectCusipIssuerName);
  }

  getTicker(): Observable<string> {
    return this.store.select(selectCusipTicker);
  }

  getCanSubmit(): Observable<boolean> {
    return this.store.select(selectCanSubmitCusip);
  }

  getSelectedRecord(): Observable<ICusipRecord> {
    return this.store.select(selectChoosenCusipRecord);
  }

  getError(): Observable<string> {
    return this.store.select(selectCusipError);
  }

  getHasError(): Observable<boolean> {
    return this.store
      .select(selectCusipError)
      .pipe(map((error) => error && error.length > 0));
  }

  getResult(): Observable<ICusipResult | undefined> {
    return this.store.select(selectCusipResult);
  }

  getNoResult(): Observable<boolean> {
    return this.store
      .select(selectCusipResult)
      .pipe(map((result) => result && result.items.length === 0));
  }

  getHasResult(): Observable<boolean> {
    return this.store
      .select(selectCusipResult)
      .pipe(map((result) => result && result.items.length > 0));
  }

  search(): void {
    this.store.dispatch(new CusipSearch());
  }

  reset(): void {
    this.store.dispatch(new CusipReset());
  }

  searchBack(): void {
    this.store.dispatch(new CusipSearchBack());
  }

  changeSecurityName(securityName: string): void {
    this.store.dispatch(new CusipSecurityNameChange(securityName));
  }

  changeIssuerName(issuerName: string): void {
    this.store.dispatch(new CusipIssuerNameChange(issuerName));
  }

  changeTicker(ticker: string): void {
    this.store.dispatch(new CusipTickerChange(ticker));
  }

  closeError(): void {
    this.store.dispatch(new CusipErrorClear());
  }

  chooseItem(cusip: string): void {
    this.store.dispatch(new CusipSearchSelection(cusip));
  }
}
