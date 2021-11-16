import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  ScheduleIntervalFetch,
  ShellClearPageError,
  ShellClearPageSuccess,
  ShellCurrentPageRefresh,
  ShellLayoutLoaded,
  ShellParticipantChanged,
} from '../store/actions/shell.actions';
import {
  selectLastUpdated,
  selectPageError,
  selectCashScheduleInterval,
  selectHasCashScheduleInterval,
  selectNettingScheduleInterval,
  selectHasNettingScheduleInterval,
  selectSecurityScheduleInterval,
  selectHasSecurityScheduleInterval,
  selectPageSuccess,
} from '../store/selectors/shell.selectors';

@Injectable()
export class ShellFacade {
  constructor(private store: Store) {}

  getLastUpdated(): Observable<Date | null> {
    return this.store.select(selectLastUpdated);
  }

  getError(): Observable<string> {
    return this.store.select(selectPageError);
  }

  getSuccess(): Observable<string> {
    return this.store.select(selectPageSuccess);
  }

  getCashInterval(): Observable<string | null> {
    return this.store.select(selectCashScheduleInterval);
  }

  getHasCashInterval(): Observable<boolean> {
    return this.store.select(selectHasCashScheduleInterval);
  }

  getNettingInterval(): Observable<string | null> {
    return this.store.select(selectNettingScheduleInterval);
  }

  getHasNettingInterval(): Observable<boolean> {
    return this.store.select(selectHasNettingScheduleInterval);
  }

  getSecurityInterval(): Observable<string | null> {
    return this.store.select(selectSecurityScheduleInterval);
  }

  getHasSecurityInterval(): Observable<boolean> {
    return this.store.select(selectHasSecurityScheduleInterval);
  }

  loaded(): void {
    this.store.dispatch(new ShellLayoutLoaded());
  }

  refresh(): void {
    this.store.dispatch(new ShellCurrentPageRefresh());
  }

  clearError(): void {
    this.store.dispatch(new ShellClearPageError());
  }

  clearSuccess(): void {
    this.store.dispatch(new ShellClearPageSuccess());
  }

  intervals(): void {
    this.store.dispatch(new ScheduleIntervalFetch());
  }

  changeParticipant(participant: string): void {
    this.store.dispatch(new ShellParticipantChanged(participant));
  }
}
