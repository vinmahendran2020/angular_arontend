import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  EndScheduleClearCommitMessage,
  EndScheduleEditClose,
  EndScheduleEditOpen,
  EndSchedulePageDestroyed,
  EndSchedulePageLoaded,
  EndScheduleRun,
  EndScheduleSettlementDateChange,
  EndScheduleSubmit,
  EndScheduleToggle,
} from '../store/actions/end.actions';
import {
  selectEndSettlementDate,
  selectEndEditing,
  selectEndProgress,
  selectEndSubmitMessage,
  selectEndSchedule,
  selectEndInProgressMessage
} from '../store/selectors/end.selectors';

import { ISchedule } from '../types/schedule';

@Injectable()
export class EndFacade {
  constructor(private store: Store) {}

  getSettlementDate(): Observable<string> {
    return this.store.select(selectEndSettlementDate);
  }

  getEditing(): Observable<boolean> {
    return this.store.select(selectEndEditing);
  }

  getProgress(): Observable<boolean> {
    return this.store.select(selectEndProgress);
  }

  getInProgressMessage(): Observable<string> {
    return this.store.select(selectEndInProgressMessage);
    }

  getSubmitMessage(): Observable<string> {
    return this.store.select(selectEndSubmitMessage);
  }

  loaded(): void {
    this.store.dispatch(new EndSchedulePageLoaded());
  }

  destroyed(): void {
    this.store.dispatch(new EndSchedulePageDestroyed());
  }

  getSchedule(): Observable<ISchedule> {
    return this.store.select(selectEndSchedule);
  }

  run(): void {
    this.store.dispatch(new EndScheduleRun());
  }

  toggle(checked: boolean): void {
    this.store.dispatch(new EndScheduleToggle(checked));
  }

  submit(schedule: ISchedule): void {
    this.store.dispatch(new EndScheduleSubmit(schedule));
  }

  changeSettlementDate(settlementDate: string): void {
    this.store.dispatch(new EndScheduleSettlementDateChange(settlementDate));
  }

  openEdit(): void {
    this.store.dispatch(new EndScheduleEditOpen());
  }

  closeEdit(): void {
    this.store.dispatch(new EndScheduleEditClose());
  }

  closeCommitMessage(): void {
    this.store.dispatch(new EndScheduleClearCommitMessage());
  }
}
