import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  DeliveryParticipantIdChange,
  DeliveryPageLoaded,
  DeliveryPageDestroyed,
  DeliveryFormEnterKeyed,
  DeliverySubmit,
  DeliveryResetSummary,
  DeliveryOperationChangeForId,
  DeliveryFilterKindChange,
  DeliveryFilterValueChange,
  DeliverySearch,
} from '../store/actions/delivery.actions';
import {
  selectDeliveryParticipantId,
  selectDeliveryParticipantIdError,
  selectDeliveryFormDisabled,
  selectSummaryDeliveries,
  selectDeliverySubmitDisabled,
  selectDeliveryOperationForId,
  selectDeliveryFilterKind,
  selectDeliveryFilterValue,
  selectFilteredDeliveries,
  selectDeliveryHasSummary,
  selectFilteredDeliveryIds,
  selectDeliveryDelivererForId,
  selectDeliveryReceiverForId,
  selectDeliveryCusipForId,
  selectDeliveryAmountForId,
  selectDeliveryQuantityForId,
  selectDeliveryDateForId,
  selectDeliveryCommentForId,
  selectDeliveryPrefundedForId,
  selectDeliveryValueForId,
  selectDeliveryAllowedOperationsForId,
} from '../store/selectors/delivery.selectors';
import { IDelivery } from '../types';

@Injectable()
export class DeliveryFacade {
  constructor(private store: Store) {}

  getParticipantId(): Observable<string> {
    return this.store.select(selectDeliveryParticipantId);
  }

  changeParticipantId(participantId: string): void {
    this.store.dispatch(
      new DeliveryParticipantIdChange(participantId, /* triggerSearch */ false)
    );
  }

  getParticipantIdError(): Observable<string> {
    return this.store.select(selectDeliveryParticipantIdError);
  }

  getHasSummary(): Observable<boolean> {
    return this.store.select(selectDeliveryHasSummary);
  }

  getDeliveries(): Observable<IDelivery[]> {
    return this.store.select(selectSummaryDeliveries);
  }

  disableSearch(): Observable<boolean> {
    return this.store.select(selectDeliveryFormDisabled);
  }

  loaded(): void {
    this.store.dispatch(new DeliveryPageLoaded());
  }

  destroyed(): void {
    this.store.dispatch(new DeliveryPageDestroyed());
  }

  enter(): void {
    this.store.dispatch(new DeliveryFormEnterKeyed());
  }

  search(): void {
    this.store.dispatch(new DeliverySearch());
  }

  disableSubmit(): Observable<boolean> {
    return this.store.select(selectDeliverySubmitDisabled);
  }

  submit(): void {
    this.store.dispatch(new DeliverySubmit());
  }

  reset(): void {
    this.store.dispatch(new DeliveryResetSummary());
  }

  getFilteredDeliveries(): Observable<IDelivery[]> {
    return this.store.select(selectFilteredDeliveries);
  }

  getFilteredDeliveryIds(): Observable<string[]> {
    return this.store.select(selectFilteredDeliveryIds);
  }

  getAllowedOperations(id: string): Observable<string[]> {
    return this.store.select(selectDeliveryAllowedOperationsForId, id);
  }

  getOperation(id: string): Observable<string> {
    return this.store.select(selectDeliveryOperationForId, id);
  }

  changeOperation(id: string, operation: string): void {
    this.store.dispatch(new DeliveryOperationChangeForId(id, operation));
  }

  getDeliverer(id: string): Observable<string> {
    return this.store.select(selectDeliveryDelivererForId, id);
  }

  getReceiver(id: string): Observable<string> {
    return this.store.select(selectDeliveryReceiverForId, id);
  }

  getCusip(id: string): Observable<string> {
    return this.store.select(selectDeliveryCusipForId, id);
  }

  getAmount(id: string): Observable<string> {
    return this.store.select(selectDeliveryAmountForId, id);
  }

  getQuantity(id: string): Observable<string> {
    return this.store.select(selectDeliveryQuantityForId, id);
  }

  getDate(id: string): Observable<string> {
    return this.store.select(selectDeliveryDateForId, id);
  }

  getComment(id: string): Observable<string> {
    return this.store.select(selectDeliveryCommentForId, id);
  }

  getPrefunded(id: string): Observable<boolean> {
    return this.store.select(selectDeliveryPrefundedForId, id);
  }

  getValue(id: string): Observable<string> {
    return this.store.select(selectDeliveryValueForId, id);
  }

  getFilterKind(): Observable<string> {
    return this.store.select(selectDeliveryFilterKind);
  }

  changeFilterKind(kind: string): void {
    this.store.dispatch(new DeliveryFilterKindChange(kind));
  }

  getFilterValue(): Observable<string> {
    return this.store.select(selectDeliveryFilterValue);
  }

  changeFilterValue(value: string): void {
    this.store.dispatch(new DeliveryFilterValueChange(value));
  }
}
