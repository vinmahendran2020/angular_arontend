import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  AdjustmentTransactionIdChange,
  AdjustmentFilterSummary,
  AdjustmentPageDestroyed,
  AdjustmentPageLoaded,
  AdjustmentSettlementDateChange,
  AdjustmentActionChange,
  AdjustmentStatusChange,
  AdjustmentCreationDateChange,
} from '../store/actions/adjustment.actions';
import {
  selectFilteredAdjustments,
  selectAdjustmentTransactionId,
  selectAdjustmentSettlementDate,
  selectAdjustmentAction,
  selectAdjustmentStatus,
  selectAdjustmentCreationDate,
} from '../store/selectors/adjustment.selectors';
import { IAdjustment } from '../types';

@Injectable()
export class AdjustmentFacade {
  constructor(private store: Store) {}

  getFilteredAdjustments(): Observable<IAdjustment[]> {
    return this.store.select(selectFilteredAdjustments);
  }

  loaded(): void {
    this.store.dispatch(new AdjustmentPageLoaded());
  }

  destroyed(): void {
    this.store.dispatch(new AdjustmentPageDestroyed());
  }

  filter(): void {
    this.store.dispatch(new AdjustmentFilterSummary());
  }

  getTransactionId(): Observable<string> {
    return this.store.select(selectAdjustmentTransactionId);
  }

  changeTransactionId(transactionId: string): void {
    this.store.dispatch(new AdjustmentTransactionIdChange(transactionId));
  }

  getSettlementDate(): Observable<string> {
    return this.store.select(selectAdjustmentSettlementDate);
  }

  changeSettlementDate(settlementDate: string): void {
    this.store.dispatch(new AdjustmentSettlementDateChange(settlementDate));
  }

  getAction(): Observable<string> {
    return this.store.select(selectAdjustmentAction);
  }

  changeAction(action: string): void {
    this.store.dispatch(new AdjustmentActionChange(action));
  }

  getStatus(): Observable<string> {
    return this.store.select(selectAdjustmentStatus);
  }

  changeStatus(cusipName: string): void {
    this.store.dispatch(new AdjustmentStatusChange(cusipName));
  }

  getCreationDate(): Observable<string> {
    return this.store.select(selectAdjustmentCreationDate);
  }

  changeCreationDate(creationDate: string): void {
    this.store.dispatch(new AdjustmentCreationDateChange(creationDate));
  }
}
