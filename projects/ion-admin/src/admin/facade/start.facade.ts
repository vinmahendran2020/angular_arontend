import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  StartScheduleClearCommitMessage,
  StartScheduleEditClose,
  StartScheduleEditOpen,
  StartSchedulePageDestroyed,
  StartSchedulePageLoaded,
  StartScheduleRun,
  StartScheduleSettlementDateChange,
  StartScheduleSubmit,
  StartScheduleToggle,
} from '../store/actions/start.actions';
import {
  selectStartSettlementDate,
  selectStartEditing,
  selectStartProgress,
  selectStartSubmitMessage,
  selectStartSchedule,
  selectStartInProgressMessage
} from '../store/selectors/start.selectors';

import { ISchedule } from '../types/schedule';

@Injectable()
export class StartFacade {
  constructor(private store: Store) {}

  getSettlementDate(): Observable<string> {
    return this.store.select(selectStartSettlementDate);
  }

  getEditing(): Observable<boolean> {
    return this.store.select(selectStartEditing);
  }

  getProgress(): Observable<boolean> {
    return this.store.select(selectStartProgress);
  }

  getInProgressMessage(): Observable<string> {
    return this.store.select(selectStartInProgressMessage);
    }

  getSubmitMessage(): Observable<string> {
    return this.store.select(selectStartSubmitMessage);
  }

  loaded(): void {
    this.store.dispatch(new StartSchedulePageLoaded());
  }

  destroyed(): void {
    this.store.dispatch(new StartSchedulePageDestroyed());
  }

  getSchedule(): Observable<ISchedule> {
    return this.store.select(selectStartSchedule);
  }

  run(): void {
    this.store.dispatch(new StartScheduleRun());
  }

  toggle(checked: boolean): void {
    this.store.dispatch(new StartScheduleToggle(checked));
  }

  submit(schedule: ISchedule): void {
    this.store.dispatch(new StartScheduleSubmit(schedule));
  }

  changeSettlementDate(settlementDate: string): void {
    this.store.dispatch(new StartScheduleSettlementDateChange(settlementDate));
  }

  openEdit(): void {
    this.store.dispatch(new StartScheduleEditOpen());
  }

  closeEdit(): void {
    this.store.dispatch(new StartScheduleEditClose());
  }

  closeCommitMessage(): void {
    this.store.dispatch(new StartScheduleClearCommitMessage());
  }
}
