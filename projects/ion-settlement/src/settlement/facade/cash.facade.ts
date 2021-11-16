import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  CashActionChange,
  CashDateChange,
  CashFilterSummary,
  CashPageDestroyed,
  CashPageLoaded,
} from '../store/actions/cash.actions';
import {
  selectFilteredCashs,
  selectCashAction,
  selectCashDate,
} from '../store/selectors/cash.selectors';
import { ICash } from '../types';

@Injectable()
export class CashFacade {
  constructor(private store: Store) {}

  getFilteredCashs(): Observable<ICash[]> {
    return this.store.select(selectFilteredCashs);
  }

  loaded(): void {
    this.store.dispatch(new CashPageLoaded());
  }

  destroyed(): void {
    this.store.dispatch(new CashPageDestroyed());
  }

  filter(): void {
    this.store.dispatch(new CashFilterSummary());
  }

  getDate(): Observable<string> {
    return this.store.select(selectCashDate);
  }

  changeDate(date: string): void {
    this.store.dispatch(new CashDateChange(date));
  }

  getAction(): Observable<string> {
    return this.store.select(selectCashAction);
  }

  changeAction(action: string): void {
    this.store.dispatch(new CashActionChange(action));
  }
}
