import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  CashParticipantIdChange,
  CashActivityResetForm,
  CashSummarySearch,
  CashPageLoaded,
  CashPageDestroyed,
  CashFormEnterKeyed,
  CashActivitySubmit,
  CashActivityOperationChange,
  CashActivityAmountChange,
} from '../store/actions/cash.actions';
import {
  selectCashParticipantId,
  selectCashFormDisabled,
  selectCashParticipantIdError,
  selectCashBalance,
  selectCashCurrency,
  selectCashHasSummary,
  selectCashActivityOperation,
  selectCashActivityOperationError,
  selectCashActivityAmount,
  selectCashActivityAmountError,
  selectCashActivityDisabled,
} from '../store/selectors/cash.selectors';

@Injectable()
export class CashFacade {
  constructor(private store: Store) {}

  getParticipantId(): Observable<string> {
    return this.store.select(selectCashParticipantId);
  }

  getParticipantIdError(): Observable<string> {
    return this.store.select(selectCashParticipantIdError);
  }

  changeParticipantId(participantId: string): void {
    this.store.dispatch(
      new CashParticipantIdChange(participantId, /* triggerSearch */ false)
    );
  }

  loaded(): void {
    this.store.dispatch(new CashPageLoaded());
  }

  destroyed(): void {
    this.store.dispatch(new CashPageDestroyed());
  }

  enter(): void {
    this.store.dispatch(new CashFormEnterKeyed());
  }

  search(): void {
    this.store.dispatch(new CashSummarySearch());
  }

  getHasSummary(): Observable<boolean> {
    return this.store.select(selectCashHasSummary);
  }

  getBalance(): Observable<number> {
    return this.store.select(selectCashBalance);
  }

  getCurrency(): Observable<string> {
    return this.store.select(selectCashCurrency);
  }

  disableSearch(): Observable<boolean> {
    return this.store.select(selectCashFormDisabled);
  }

  reset(): void {
    this.store.dispatch(new CashActivityResetForm());
  }

  getOperation(): Observable<string> {
    return this.store.select(selectCashActivityOperation);
  }

  getOperationError(): Observable<string> {
    return this.store.select(selectCashActivityOperationError);
  }

  changeOperation(operation: string): void {
    this.store.dispatch(new CashActivityOperationChange(operation));
  }

  getAmount(): Observable<string> {
    return this.store.select(selectCashActivityAmount);
  }

  getAmountError(): Observable<string> {
    return this.store.select(selectCashActivityAmountError);
  }

  changeAmount(amount: string): void {
    this.store.dispatch(new CashActivityAmountChange(amount));
  }

  disableActivity(): Observable<boolean> {
    return this.store.select(selectCashActivityDisabled);
  }

  submit(): void {
    this.store.dispatch(new CashActivitySubmit());
  }
}
