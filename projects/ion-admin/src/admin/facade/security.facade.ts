import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  SecurityScheduleClearCommitMessage,
  SecurityScheduleEditClose,
  SecurityScheduleEditOpen,
  SecuritySchedulePageDestroyed,
  SecuritySchedulePageLoaded,
  SecurityScheduleRun,
  SecurityScheduleSettlementDateChange,
  SecurityScheduleSubmit,
  SecurityScheduleToggle,
} from '../store/actions/security.actions';
import {
  selectSecuritySettlementDate,
  selectSecurityEditing,
  selectSecurityProgress,
  selectSecurityInProgressMessage,
  selectSecuritySubmitMessage,
  selectSecuritySchedule,
} from '../store/selectors/security.selectors';

import { ISchedule } from '../types/schedule';

@Injectable()
export class SecurityFacade {
  constructor(private store: Store) {}

  getSettlementDate(): Observable<string> {
    return this.store.select(selectSecuritySettlementDate);
  }

  getEditing(): Observable<boolean> {
    return this.store.select(selectSecurityEditing);
  }

  getProgress(): Observable<boolean> {
    return this.store.select(selectSecurityProgress);
  }

  getInProgressMessage(): Observable<string> {
    return this.store.select(selectSecurityInProgressMessage);
  }

  getSubmitMessage(): Observable<string> {
    return this.store.select(selectSecuritySubmitMessage);
  }

  loaded(): void {
    this.store.dispatch(new SecuritySchedulePageLoaded());
  }

  destroyed(): void {
    this.store.dispatch(new SecuritySchedulePageDestroyed());
  }

  getSchedule(): Observable<ISchedule> {
    return this.store.select(selectSecuritySchedule);
  }

  run(): void {
    this.store.dispatch(new SecurityScheduleRun());
  }

  toggle(checked: boolean): void {
    this.store.dispatch(new SecurityScheduleToggle(checked));
  }

  submit(schedule: ISchedule): void {
    this.store.dispatch(new SecurityScheduleSubmit(schedule));
  }

  changeSettlementDate(settlementDate: string): void {
    this.store.dispatch(
      new SecurityScheduleSettlementDateChange(settlementDate)
    );
  }

  openEdit(): void {
    this.store.dispatch(new SecurityScheduleEditOpen());
  }

  closeEdit(): void {
    this.store.dispatch(new SecurityScheduleEditClose());
  }

  closeCommitMessage(): void {
    this.store.dispatch(new SecurityScheduleClearCommitMessage());
  }
}
