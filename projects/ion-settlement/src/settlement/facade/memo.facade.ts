import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  MemoActionChange,
  MemoCusipIdChange,
  MemoCusipNameChange,
  MemoFilterSummary,
  MemoPageDestroyed,
  MemoPageLoaded,
} from '../store/actions/memo.actions';
import {
  selectFilteredMemos,
  selectMemoAction,
  selectMemoCusipId,
  selectMemoCusipName,
} from '../store/selectors/memo.selectors';
import { IMemo } from '../types';

@Injectable()
export class MemoFacade {
  constructor(private store: Store) {}

  getFilteredMemos(): Observable<IMemo[]> {
    return this.store.select(selectFilteredMemos);
  }

  loaded(): void {
    this.store.dispatch(new MemoPageLoaded());
  }

  destroyed(): void {
    this.store.dispatch(new MemoPageDestroyed());
  }

  filter(): void {
    this.store.dispatch(new MemoFilterSummary());
  }

  getCusipId(): Observable<string> {
    return this.store.select(selectMemoCusipId);
  }

  changeCusipId(cusipId: string): void {
    this.store.dispatch(new MemoCusipIdChange(cusipId));
  }

  getCusipName(): Observable<string> {
    return this.store.select(selectMemoCusipName);
  }

  changeCusipName(cusipName: string): void {
    this.store.dispatch(new MemoCusipNameChange(cusipName));
  }

  getAction(): Observable<string> {
    return this.store.select(selectMemoAction);
  }

  changeAction(action: string): void {
    this.store.dispatch(new MemoActionChange(action));
  }
}
