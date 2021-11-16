import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  PositionParticipantIdChange,
  PositionCusipChange,
  PositionDateChange,
  PositionResetForm,
  PositionSummarySearch,
  PositionCusipSearchOpen,
  PositionCusipSearchClose,
  PositionPageLoaded,
  PositionPageDestroyed,
  PositionFormEnterKeyed,
} from '../store/actions/position.actions';
import {
  selectPositionParticipantId,
  selectPositionCusip,
  selectPositionDate,
  selectPositionSummary,
  selectPositionFormDisabled,
  selectPositionCusipSearch,
  selectPositionParticipantIdError,
  selectPositionCusipError,
} from '../store/selectors/position.selectors';
import { IPositionSummary } from '../types';

@Injectable()
export class PositionFacade {
  constructor(private store: Store) {}

  getParticipantId(): Observable<string> {
    return this.store.select(selectPositionParticipantId);
  }

  getParticipantIdError(): Observable<string> {
    return this.store.select(selectPositionParticipantIdError);
  }

  getCusip(): Observable<string> {
    return this.store.select(selectPositionCusip);
  }

  getCusipError(): Observable<string> {
    return this.store.select(selectPositionCusipError);
  }

  getDate(): Observable<string> {
    return this.store.select(selectPositionDate);
  }

  getSummary(): Observable<IPositionSummary | undefined> {
    return this.store.select(selectPositionSummary);
  }

  getCusipSearch(): Observable<boolean> {
    return this.store.select(selectPositionCusipSearch);
  }

  disableSearch(): Observable<boolean> {
    return this.store.select(selectPositionFormDisabled);
  }

  loaded(): void {
    this.store.dispatch(new PositionPageLoaded());
  }

  destroyed(): void {
    this.store.dispatch(new PositionPageDestroyed());
  }

  changeParticipantId(participantId: string): void {
    this.store.dispatch(new PositionParticipantIdChange(participantId, /* triggerSearch */ false));
  }

  changeCusip(cusip: string): void {
    this.store.dispatch(new PositionCusipChange(cusip));
  }

  changeDate(date: string): void {
    this.store.dispatch(new PositionDateChange(date));
  }

  enter(): void {
    this.store.dispatch(new PositionFormEnterKeyed());
  }

  reset(): void {
    this.store.dispatch(new PositionResetForm());
  }

  search(): void {
    this.store.dispatch(new PositionSummarySearch());
  }

  openCusipSearch(): void {
    this.store.dispatch(new PositionCusipSearchOpen());
  }

  closeCusipSearch(): void {
    this.store.dispatch(new PositionCusipSearchClose());
  }
}
