import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  CCAParticipantIdChange,
  CCASettlementDateChange,
  CCAResetForm,
  CCASummarySearch,
  CCADetailClose,
  CCADetailOpen,
  CCACusipChange,
  CCAPageLoaded,
  CCAPageDestroyed,
  CCAFormEnterKeyed,
} from '../store/actions/cca.actions';
import {
  selectCCAParticipantId,
  selectCCAParticipantIdError,
  selectCCASettlementDate,
  selectCCASummary,
  selectClearingCashAdjustments,
  selectCCAFormDisabled,
  selectCCASelectedItem,
  selectCCADetailVisible,
  selectCCATransactionDetail,
  selectCCACusip,
  selectFilteredCCADebits,
  selectFilteredTotalCCADebits,
  selectFilteredCCACredits,
  selectFilteredTotalCCACredits,
} from '../store/selectors/cca.selectors';
import {
  IClearingCashAdjustment,
  ICCASummary,
  ICCATransactionDetail,
  ICCATransaction,
} from '../types';

@Injectable()
export class CCAFacade {
  constructor(private store: Store) {}

  getParticipantId(): Observable<string> {
    return this.store.select(selectCCAParticipantId);
  }

  getParticipantIdError(): Observable<string> {
    return this.store.select(selectCCAParticipantIdError);
  }

  getSettlementDate(): Observable<Array<string>> {
    return this.store.select(selectCCASettlementDate);
  }

  getSummary(): Observable<ICCASummary | undefined> {
    return this.store.select(selectCCASummary);
  }

  getAdjustments(): Observable<IClearingCashAdjustment[]> {
    return this.store.select(selectClearingCashAdjustments);
  }

  disableSearch(): Observable<boolean> {
    return this.store.select(selectCCAFormDisabled);
  }

  getSelectedItem(): Observable<IClearingCashAdjustment> {
    return this.store.select(selectCCASelectedItem);
  }

  getTransactionDetail(): Observable<ICCATransactionDetail> {
    return this.store.select(selectCCATransactionDetail);
  }

  getCCADebits(): Observable<ICCATransaction[]> {
    return this.store.select(selectFilteredCCADebits);
  }

  getTotalCCADebits(): Observable<number> {
    return this.store.select(selectFilteredTotalCCADebits);
  }

  getCCACredits(): Observable<ICCATransaction[]> {
    return this.store.select(selectFilteredCCACredits);
  }

  getTotalCCACredits(): Observable<number> {
    return this.store.select(selectFilteredTotalCCACredits);
  }

  getCusip(): Observable<string> {
    return this.store.select(selectCCACusip);
  }

  isDetailVisible(): Observable<boolean> {
    return this.store.select(selectCCADetailVisible);
  }

  loaded(): void {
    this.store.dispatch(new CCAPageLoaded());
  }

  destroyed(): void {
    this.store.dispatch(new CCAPageDestroyed());
  }

  changeParticipantId(participantId: string): void {
    this.store.dispatch(
      new CCAParticipantIdChange(participantId, /* triggerSearch */ false)
    );
  }

  changeSettlementDate(settlementDate: Array<string>): void {
    this.store.dispatch(new CCASettlementDateChange(settlementDate));
  }

  enter(): void {
    this.store.dispatch(new CCAFormEnterKeyed());
  }

  reset(): void {
    this.store.dispatch(new CCAResetForm());
  }

  search(): void {
    this.store.dispatch(new CCASummarySearch());
  }

  openDetail(ccaId: string): void {
    this.store.dispatch(new CCADetailOpen(ccaId));
  }

  closeDetail(): void {
    this.store.dispatch(new CCADetailClose());
  }

  changeCusip(cusip: string): void {
    this.store.dispatch(new CCACusipChange(cusip));
  }
}
