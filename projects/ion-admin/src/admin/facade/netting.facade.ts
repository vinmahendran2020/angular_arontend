import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  NettingScheduleClearCommitMessage,
  NettingScheduleEditClose,
  NettingScheduleEditOpen,
  NettingSchedulePageDestroyed,
  NettingSchedulePageLoaded,
  NettingScheduleRun,
  NettingScheduleSubmit,
  NettingScheduleToggle,
} from '../store/actions/netting.actions';
import {
  selectNettingEditing,
  selectNettingProgress,
  selectNettingInProgressMessage,
  selectNettingSubmitMessage,
  selectNettingSchedule,
} from '../store/selectors/netting.selectors';

import { ISchedule } from '../types/schedule';

@Injectable()
export class NettingFacade {
  constructor(private store: Store) {}

  getEditing(): Observable<boolean> {
    return this.store.select(selectNettingEditing);
  }

  getProgress(): Observable<boolean> {
    return this.store.select(selectNettingProgress);
  }

  getInProgressMessage(): Observable<string> {
    return this.store.select(selectNettingInProgressMessage);
  }

  getSubmitMessage(): Observable<string> {
    return this.store.select(selectNettingSubmitMessage);
  }

  loaded(): void {
    this.store.dispatch(new NettingSchedulePageLoaded());
  }

  destroyed(): void {
    this.store.dispatch(new NettingSchedulePageDestroyed());
  }

  getSchedule(): Observable<ISchedule> {
    return this.store.select(selectNettingSchedule);
  }

  run(): void {
    this.store.dispatch(new NettingScheduleRun());
  }

  toggle(checked: boolean): void {
    this.store.dispatch(new NettingScheduleToggle(checked));
  }

  submit(schedule: ISchedule): void {
    this.store.dispatch(new NettingScheduleSubmit(schedule));
  }

  openEdit(): void {
    this.store.dispatch(new NettingScheduleEditOpen());
  }

  closeEdit(): void {
    this.store.dispatch(new NettingScheduleEditClose());
  }

  closeCommitMessage(): void {
    this.store.dispatch(new NettingScheduleClearCommitMessage());
  }
}
