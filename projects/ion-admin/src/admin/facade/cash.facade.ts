import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  CashScheduleClearCommitMessage,
  CashScheduleEditClose,
  CashScheduleEditOpen,
  CashSchedulePageDestroyed,
  CashSchedulePageLoaded,
  CashScheduleRun,
  CashScheduleSettlementDateChange,
  CashScheduleSubmit,
  CashScheduleToggle,
} from '../store/actions/cash.actions';
import {
  selectCashSettlementDate,
  selectCashEditing,
  selectCashProgress,
  selectCashInProgressMessage,
  selectCashSubmitMessage,
  selectCashSchedule,
} from '../store/selectors/cash.selectors';

import { ISchedule } from '../types/schedule';

@Injectable()
export class CashFacade {
  constructor(private store: Store) {}

  getSettlementDate(): Observable<string> {
    return this.store.select(selectCashSettlementDate);
  }

  getEditing(): Observable<boolean> {
    return this.store.select(selectCashEditing);
  }

  getProgress(): Observable<boolean> {
    return this.store.select(selectCashProgress);
  }

  getInProgressMessage(): Observable<string> {
    return this.store.select(selectCashInProgressMessage);
  }

  getSubmitMessage(): Observable<string> {
    return this.store.select(selectCashSubmitMessage);
  }

  loaded(): void {
    this.store.dispatch(new CashSchedulePageLoaded());
  }

  destroyed(): void {
    this.store.dispatch(new CashSchedulePageDestroyed());
  }

  getSchedule(): Observable<ISchedule> {
    return this.store.select(selectCashSchedule);
  }

  run(): void {
    this.store.dispatch(new CashScheduleRun());
  }

  toggle(checked: boolean): void {
    this.store.dispatch(new CashScheduleToggle(checked));
  }

  submit(schedule: ISchedule): void {
    this.store.dispatch(new CashScheduleSubmit(schedule));
  }

  changeSettlementDate(settlementDate: string): void {
    this.store.dispatch(new CashScheduleSettlementDateChange(settlementDate));
  }

  openEdit(): void {
    this.store.dispatch(new CashScheduleEditOpen());
  }

  closeEdit(): void {
    this.store.dispatch(new CashScheduleEditClose());
  }

  closeCommitMessage(): void {
    this.store.dispatch(new CashScheduleClearCommitMessage());
  }
}
