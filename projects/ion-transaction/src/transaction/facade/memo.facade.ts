import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  MemoParticipantIdChange,
  MemoPageLoaded,
  MemoPageDestroyed,
  MemoFormEnterKeyed,
  MemoSubmit,
  MemoResetSummary,
  MemoActionChangeForId,
  MemoCusipChangeForId,
  MemoAddNewRow,
  MemoRemoveRowById,
  MemoCusipSearchOpenForId,
  MemoCusipSearchCloseForId,
  MemoQuantityChangeForId,
} from '../store/actions/memo.actions';
import {
  selectMemoParticipantId,
  selectMemoParticipantIdError,
  selectMemoSummary,
  selectMemoFormDisabled,
  selectSummaryMemos,
  selectMemoSubmitDisabled,
  selectMemoCusipForId,
  selectMemoQuantityForId,
  selectMemoIds,
  selectMemoCusipSearchForId,
  selectMemoCusipErrorForId,
  selectMemoQuantityErrorForId,
  selectMemoActionErrorForId,
  selectMemoActionForId,
  selectMemoCusipNameForId,
  selectMemoTotalFreePstnForId,
  selectMemoFreeExcessPstnForId,
  selectMemoSegPstnForId,
  selectMemoDeletableForId,
} from '../store/selectors/memo.selectors';
import { IMemo, IMemoSummary } from '../types';

@Injectable()
export class MemoFacade {
  constructor(private store: Store) {}

  getParticipantId(): Observable<string> {
    return this.store.select(selectMemoParticipantId);
  }

  changeParticipantId(participantId: string): void {
    this.store.dispatch(new MemoParticipantIdChange(participantId));
  }

  getParticipantIdError(): Observable<string> {
    return this.store.select(selectMemoParticipantIdError);
  }

  getSummary(): Observable<IMemoSummary | undefined> {
    return this.store.select(selectMemoSummary);
  }

  getMemos(): Observable<IMemo[]> {
    return this.store.select(selectSummaryMemos);
  }

  disableSearch(): Observable<boolean> {
    return this.store.select(selectMemoFormDisabled);
  }

  loaded(): void {
    this.store.dispatch(new MemoPageLoaded());
  }

  destroyed(): void {
    this.store.dispatch(new MemoPageDestroyed());
  }

  enter(): void {
    this.store.dispatch(new MemoFormEnterKeyed());
  }

  disableSubmit(): Observable<boolean> {
    return this.store.select(selectMemoSubmitDisabled);
  }

  submit(): void {
    this.store.dispatch(new MemoSubmit());
  }

  reset(): void {
    this.store.dispatch(new MemoResetSummary());
  }

  addNewMemo(): void {
    this.store.dispatch(new MemoAddNewRow());
  }

  removeMemo(id: number): void {
    this.store.dispatch(new MemoRemoveRowById(id));
  }

  getMemoIds(): Observable<number[]> {
    return this.store.select(selectMemoIds);
  }

  getAction(id: number): Observable<string> {
    return this.store.select(selectMemoActionForId, id);
  }

  getActionError(id: number): Observable<string> {
    return this.store.select(selectMemoActionErrorForId, id);
  }

  changeAction(id: number, action: string): void {
    this.store.dispatch(new MemoActionChangeForId(id, action));
  }

  changeQuantity(id: number, quantity: string): void {
    this.store.dispatch(new MemoQuantityChangeForId(id, quantity));
  }

  getCusip(id: number): Observable<string> {
    return this.store.select(selectMemoCusipForId, id);
  }

  getCusipError(id: number): Observable<string> {
    return this.store.select(selectMemoCusipErrorForId, id);
  }

  changeCusip(id: number, cusip: string): void {
    this.store.dispatch(new MemoCusipChangeForId(id, cusip));
  }

  getQuantity(id: number): Observable<string> {
    return this.store.select(selectMemoQuantityForId, id);
  }

  getQuantityError(id: number): Observable<string> {
    return this.store.select(selectMemoQuantityErrorForId, id);
  }

  getCusipName(id: number): Observable<string> {
    return this.store.select(selectMemoCusipNameForId, id);
  }

  getTotalFreePstn(id: number): Observable<number> {
    return this.store.select(selectMemoTotalFreePstnForId, id);
  }

  getMemoSegPstn(id: number): Observable<number> {
    return this.store.select(selectMemoSegPstnForId, id);
  }

  getFreeExcessPstn(id: number): Observable<number> {
    return this.store.select(selectMemoFreeExcessPstnForId, id);
  }

  getDeletable(id: number): Observable<boolean> {
    return this.store.select(selectMemoDeletableForId, id);
  }

  getCusipSearch(id: number): Observable<boolean> {
    return this.store.select(selectMemoCusipSearchForId, id);
  }

  openCusipSearch(id: number): void {
    this.store.dispatch(new MemoCusipSearchOpenForId(id));
  }

  closeCusipSearch(id: number): void {
    this.store.dispatch(new MemoCusipSearchCloseForId(id));
  }
}
