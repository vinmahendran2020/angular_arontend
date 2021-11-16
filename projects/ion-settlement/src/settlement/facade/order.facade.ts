import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  OrderDelivererIdChange,
  OrderReceiverIdChange,
  OrderCusipIdChange,
  OrderCusipNameChange,
  OrderFilterSummary,
  OrderPageDestroyed,
  OrderPageLoaded,
  OrderPrefundedChange,
  OrderSettlementStatusChange,
  OrderPendingReasonChange,
} from '../store/actions/order.actions';
import {
  selectFilteredOrders,
  selectOrderDelivererId,
  selectOrderReceiverId,
  selectOrderCusipId,
  selectOrderCusipName,
  selectOrderSettlemetStatus,
  selectOrderPendingReason,
  selectOrderPrefunded,
} from '../store/selectors/order.selectors';
import { IOrder } from '../types';

@Injectable()
export class OrderFacade {
  constructor(private store: Store) {}

  getFilteredOrders(): Observable<IOrder[]> {
    return this.store.select(selectFilteredOrders);
  }

  loaded(): void {
    this.store.dispatch(new OrderPageLoaded());
  }

  destroyed(): void {
    this.store.dispatch(new OrderPageDestroyed());
  }

  filter(): void {
    this.store.dispatch(new OrderFilterSummary());
  }

  getDelivererId(): Observable<string> {
    return this.store.select(selectOrderDelivererId);
  }

  changeDelivererId(delivererId: string): void {
    this.store.dispatch(new OrderDelivererIdChange(delivererId));
  }

  getReceiverId(): Observable<string> {
    return this.store.select(selectOrderReceiverId);
  }

  changeReceiverId(receiverId: string): void {
    this.store.dispatch(new OrderReceiverIdChange(receiverId));
  }

  getCusipId(): Observable<string> {
    return this.store.select(selectOrderCusipId);
  }

  changeCusipId(cusipId: string): void {
    this.store.dispatch(new OrderCusipIdChange(cusipId));
  }

  getCusipName(): Observable<string> {
    return this.store.select(selectOrderCusipName);
  }

  changeCusipName(cusipName: string): void {
    this.store.dispatch(new OrderCusipNameChange(cusipName));
  }

  getPrefunded(): Observable<string> {
    return this.store.select(selectOrderPrefunded);
  }

  changePrefunded(prefunded: string): void {
    this.store.dispatch(new OrderPrefundedChange(prefunded));
  }

  getSettlementStatus(): Observable<string> {
    return this.store.select(selectOrderSettlemetStatus);
  }

  changeSettlementStatus(settlementStatus: string): void {
    this.store.dispatch(new OrderSettlementStatusChange(settlementStatus));
  }

  getPendingReason(): Observable<string> {
    return this.store.select(selectOrderPendingReason);
  }

  changePendingReason(pendingReason: string): void {
    this.store.dispatch(new OrderPendingReasonChange(pendingReason));
  }
}
