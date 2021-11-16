import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  OrderParticipantIdChange,
  OrderPageLoaded,
  OrderPageDestroyed,
  OrderFormEnterKeyed,
  OrderSubmit,
  OrderResetSummary,
  OrderReceiverChangeForId,
  OrderCusipChangeForId,
  OrderAmountChangeForId,
  OrderQuantityChangeForId,
  OrderDateChangeForId,
  OrderCommentChangeForId,
  OrderAddNewRow,
  OrderCloneRowById,
  OrderRemoveRowById,
  OrderCusipSearchOpenForId,
  OrderCusipSearchCloseForId,
  OrderPrefundedChangeForId,
} from '../store/actions/order.actions';
import {
  selectOrderParticipantId,
  selectOrderParticipantIdError,
  selectOrderFormDisabled,
  selectSummaryOrders,
  selectOrderSubmitDisabled,
  selectOrderReceiverForId,
  selectOrderCusipForId,
  selectOrderAmountForId,
  selectOrderQuantityForId,
  selectOrderDateForId,
  selectOrderCommentForId,
  selectOrderIds,
  selectOrderCusipSearchForId,
  selectOrderPrefundedForId,
  selectOrderValueForId,
  selectOrderReceiverErrorForId,
  selectOrderCusipErrorForId,
  selectOrderAmountErrorForId,
  selectOrderQuantityErrorForId,
  selectOrderDateErrorForId,
  selectOrderHasSummary,
  selectOrderClonableForId,
  selectOrderDeletableForId,
} from '../store/selectors/order.selectors';
import { IOrder } from '../types';

@Injectable()
export class OrderFacade {
  constructor(private store: Store) {}

  getParticipantId(): Observable<string> {
    return this.store.select(selectOrderParticipantId);
  }

  changeParticipantId(participantId: string): void {
    this.store.dispatch(new OrderParticipantIdChange(participantId));
  }

  getParticipantIdError(): Observable<string> {
    return this.store.select(selectOrderParticipantIdError);
  }

  getHasSummary(): Observable<boolean> {
    return this.store.select(selectOrderHasSummary);
  }

  getOrders(): Observable<IOrder[]> {
    return this.store.select(selectSummaryOrders);
  }

  disableSearch(): Observable<boolean> {
    return this.store.select(selectOrderFormDisabled);
  }

  loaded(): void {
    this.store.dispatch(new OrderPageLoaded());
  }

  destroyed(): void {
    this.store.dispatch(new OrderPageDestroyed());
  }

  enter(): void {
    this.store.dispatch(new OrderFormEnterKeyed());
  }

  disableSubmit(): Observable<boolean> {
    return this.store.select(selectOrderSubmitDisabled);
  }

  submit(): void {
    this.store.dispatch(new OrderSubmit());
  }

  reset(): void {
    this.store.dispatch(new OrderResetSummary());
  }

  addNewOrder(): void {
    this.store.dispatch(new OrderAddNewRow());
  }

  cloneOrder(id: number): void {
    this.store.dispatch(new OrderCloneRowById(id));
  }

  removeOrder(id: number): void {
    this.store.dispatch(new OrderRemoveRowById(id));
  }

  getOrderIds(): Observable<number[]> {
    return this.store.select(selectOrderIds);
  }

  getReceiver(id: number): Observable<string> {
    return this.store.select(selectOrderReceiverForId, id);
  }

  getReceiverError(id: number): Observable<string> {
    return this.store.select(selectOrderReceiverErrorForId, id);
  }

  changeReceiver(id: number, receiver: string): void {
    this.store.dispatch(new OrderReceiverChangeForId(id, receiver));
  }

  getCusip(id: number): Observable<string> {
    return this.store.select(selectOrderCusipForId, id);
  }

  getCusipError(id: number): Observable<string> {
    return this.store.select(selectOrderCusipErrorForId, id);
  }

  changeCusip(id: number, cusip: string): void {
    this.store.dispatch(new OrderCusipChangeForId(id, cusip));
  }

  getAmount(id: number): Observable<string> {
    return this.store.select(selectOrderAmountForId, id);
  }

  getAmountError(id: number): Observable<string> {
    return this.store.select(selectOrderAmountErrorForId, id);
  }

  changeAmount(id: number, amount: string): void {
    this.store.dispatch(new OrderAmountChangeForId(id, amount));
  }

  getQuantity(id: number): Observable<string> {
    return this.store.select(selectOrderQuantityForId, id);
  }

  getQuantityError(id: number): Observable<string> {
    return this.store.select(selectOrderQuantityErrorForId, id);
  }

  changeQuantity(id: number, quantity: string): void {
    this.store.dispatch(new OrderQuantityChangeForId(id, quantity));
  }

  getDate(id: number): Observable<string> {
    return this.store.select(selectOrderDateForId, id);
  }

  getDateError(id: number): Observable<string> {
    return this.store.select(selectOrderDateErrorForId, id);
  }

  changeDate(id: number, date: string): void {
    this.store.dispatch(new OrderDateChangeForId(id, date));
  }

  getComment(id: number): Observable<string> {
    return this.store.select(selectOrderCommentForId, id);
  }

  changeComment(id: number, comment: string): void {
    this.store.dispatch(new OrderCommentChangeForId(id, comment));
  }

  getPrefunded(id: number): Observable<boolean> {
    return this.store.select(selectOrderPrefundedForId, id);
  }

  changePrefunded(id: number, prefunded: boolean): void {
    this.store.dispatch(new OrderPrefundedChangeForId(id, prefunded));
  }

  getValue(id: number): Observable<string> {
    return this.store.select(selectOrderValueForId, id);
  }

  getClonable(id: number): Observable<boolean> {
    return this.store.select(selectOrderClonableForId, id);
  }

  getDeletable(id: number): Observable<boolean> {
    return this.store.select(selectOrderDeletableForId, id);
  }

  getCusipSearch(id: number): Observable<boolean> {
    return this.store.select(selectOrderCusipSearchForId, id);
  }

  openCusipSearch(id: number): void {
    this.store.dispatch(new OrderCusipSearchOpenForId(id));
  }

  closeCusipSearch(id: number): void {
    this.store.dispatch(new OrderCusipSearchCloseForId(id));
  }
}
