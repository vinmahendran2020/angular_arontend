import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  PrepositionParticipantIdChange,
  PrepositionPageLoaded,
  PrepositionPageDestroyed,
  PrepositionFormEnterKeyed,
  PrepositionSubmit,
  PrepositionResetSummary,
  PrepositionCusipChangeForId,
  PrepositionQuantityChangeForId,
  PrepositionAddNewRow,
  PrepositionRemoveRowById,
  PrepositionCusipSearchOpenForId,
  PrepositionCusipSearchCloseForId,
  PrepositionActionChangeForId,
  PrepositionCusipNameChangeForId,
} from '../store/actions/preposition.actions';
import {
  selectPrepositionParticipantId,
  selectPrepositionParticipantIdError,
  selectPrepositionSummary,
  selectPrepositionFormDisabled,
  selectSummaryPrepositions,
  selectPrepositionSubmitDisabled,
  selectPrepositionCusipForId,
  selectPrepositionQuantityForId,
  selectPrepositionIds,
  selectPrepositionCusipSearchForId,
  selectPrepositionCusipErrorForId,
  selectPrepositionQuantityErrorForId,
  selectPrepositionActionForId,
  selectPrepositionCusipNameForId,
  selectPrepositionDeletableForId,
} from '../store/selectors/preposition.selectors';
import { IPreposition, IPrepositionSummary } from '../types/preposition';

@Injectable()
export class PrepositionFacade {
  constructor(private store: Store) {}

  getParticipantId(): Observable<string> {
    return this.store.select(selectPrepositionParticipantId);
  }

  changeParticipantId(participantId: string): void {
    this.store.dispatch(new PrepositionParticipantIdChange(participantId));
  }

  getParticipantIdError(): Observable<string> {
    return this.store.select(selectPrepositionParticipantIdError);
  }

  getSummary(): Observable<IPrepositionSummary | undefined> {
    return this.store.select(selectPrepositionSummary);
  }

  getPrepositions(): Observable<IPreposition[]> {
    return this.store.select(selectSummaryPrepositions);
  }

  disableSearch(): Observable<boolean> {
    return this.store.select(selectPrepositionFormDisabled);
  }

  loaded(): void {
    this.store.dispatch(new PrepositionPageLoaded());
  }

  destroyed(): void {
    this.store.dispatch(new PrepositionPageDestroyed());
  }

  enter(): void {
    this.store.dispatch(new PrepositionFormEnterKeyed());
  }

  disableSubmit(): Observable<boolean> {
    return this.store.select(selectPrepositionSubmitDisabled);
  }

  submit(): void {
    this.store.dispatch(new PrepositionSubmit());
  }

  reset(): void {
    this.store.dispatch(new PrepositionResetSummary());
  }

  addNewPreposition(): void {
    this.store.dispatch(new PrepositionAddNewRow());
  }

  removePreposition(id: number): void {
    this.store.dispatch(new PrepositionRemoveRowById(id));
  }

  getPrepositionIds(): Observable<number[]> {
    return this.store.select(selectPrepositionIds);
  }

  getAction(id: number): Observable<string> {
    return this.store.select(selectPrepositionActionForId, id);
  }

  changeAction(id: number, action: string): void {
    this.store.dispatch(new PrepositionActionChangeForId(id, action));
  }

  getCusip(id: number): Observable<string> {
    return this.store.select(selectPrepositionCusipForId, id);
  }

  getCusipError(id: number): Observable<string> {
    return this.store.select(selectPrepositionCusipErrorForId, id);
  }

  changeCusip(id: number, cusip: string): void {
    this.store.dispatch(new PrepositionCusipChangeForId(id, cusip));
  }

  getQuantity(id: number): Observable<string> {
    return this.store.select(selectPrepositionQuantityForId, id);
  }

  getQuantityError(id: number): Observable<string> {
    return this.store.select(selectPrepositionQuantityErrorForId, id);
  }

  changeQuantity(id: number, quantity: string): void {
    this.store.dispatch(new PrepositionQuantityChangeForId(id, quantity));
  }

  getCusipName(id: number): Observable<string> {
    return this.store.select(selectPrepositionCusipNameForId, id);
  }

  changeCusipName(id: number, cusipName: string): void {
    this.store.dispatch(new PrepositionCusipNameChangeForId(id, cusipName));
  }

  getDeletable(id: number): Observable<boolean> {
    return this.store.select(selectPrepositionDeletableForId, id);
  }

  getCusipSearch(id: number): Observable<boolean> {
    return this.store.select(selectPrepositionCusipSearchForId, id);
  }

  openCusipSearch(id: number): void {
    this.store.dispatch(new PrepositionCusipSearchOpenForId(id));
  }

  closeCusipSearch(id: number): void {
    this.store.dispatch(new PrepositionCusipSearchCloseForId(id));
  }
}
