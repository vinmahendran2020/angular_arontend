import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  ObligationParticipantIdChange,
  ObligationResetForm,
  ObligationSummarySearch,
  ObligationTradesClose,
  ObligationTradesOpen,
  ObligationTransactionsClose,
  ObligationTransactionsOpen,
  ObligationCusipChange,
  ObligationSortByChange,
  ObligationCusipSearchOpen,
  ObligationCusipSearchClose,
  ObligationPageLoaded,
  ObligationPageDestroyed,
  ObligationFormEnterKeyed,
} from '../store/actions/obligation.actions';
import {
  selectObligationParticipantId,
  selectObligationParticipantIdError,
  selectObligationSummary,
  selectObligationFormDisabled,
  selectObligationSelectedItem,
  selectObligationSelectedPending,
  selectObligationTrades,
  selectObligationTransactions,
  selectObligationTradesVisible,
  selectObligationTransactionsVisible,
  selectObligationCusipSearch,
  selectObligationCusip,
  selectFilteredObligationLong,
  selectFilteredObligationShort,
  selectFilteredObligationClosed,
  selectObligationSortBy,
} from '../store/selectors/obligation.selectors';
import {
  INetObligation,
  IObligationSummary,
  IObligationTrade,
  IObligationTransaction,
  ObligationSortBy,
} from '../types';

@Injectable()
export class ObligationFacade {
  constructor(private store: Store) {}

  getParticipantId(): Observable<string> {
    return this.store.select(selectObligationParticipantId);
  }

  getParticipantIdError(): Observable<string> {
    return this.store.select(selectObligationParticipantIdError);
  }

  getSummary(): Observable<IObligationSummary | undefined> {
    return this.store.select(selectObligationSummary);
  }

  getNetLongs(): Observable<INetObligation[]> {
    return this.store.select(selectFilteredObligationLong);
  }

  getNetShorts(): Observable<INetObligation[]> {
    return this.store.select(selectFilteredObligationShort);
  }

  getClosed(): Observable<INetObligation[]> {
    return this.store.select(selectFilteredObligationClosed);
  }

  disableSearch(): Observable<boolean> {
    return this.store.select(selectObligationFormDisabled);
  }

  getSelectedItem(): Observable<INetObligation> {
    return this.store.select(selectObligationSelectedItem);
  }

  getTrades(): Observable<IObligationTrade[]> {
    return this.store.select(selectObligationTrades);
  }

  isTradesVisible(): Observable<boolean> {
    return this.store.select(selectObligationTradesVisible);
  }

  getSelectedPending(): Observable<INetObligation> {
    return this.store.select(selectObligationSelectedPending);
  }

  getTransactions(): Observable<IObligationTransaction[]> {
    return this.store.select(selectObligationTransactions);
  }

  isTransactionsVisible(): Observable<boolean> {
    return this.store.select(selectObligationTransactionsVisible);
  }

  loaded(): void {
    this.store.dispatch(new ObligationPageLoaded());
  }

  destroyed(): void {
    this.store.dispatch(new ObligationPageDestroyed());
  }

  changeParticipantId(participantId: string): void {
    this.store.dispatch(
      new ObligationParticipantIdChange(participantId, /* triggerSearch */ false)
    );
  }

  enter(): void {
    this.store.dispatch(new ObligationFormEnterKeyed());
  }

  reset(): void {
    this.store.dispatch(new ObligationResetForm());
  }

  search(): void {
    this.store.dispatch(new ObligationSummarySearch());
  }

  openTrades(obligationId: string, ticker: string): void {
    this.store.dispatch(new ObligationTradesOpen(obligationId, ticker));
  }

  closeTrades(): void {
    this.store.dispatch(new ObligationTradesClose());
  }

  openTransactions(obligationId: string): void {
    this.store.dispatch(new ObligationTransactionsOpen(obligationId));
  }

  closeTransactions(): void {
    this.store.dispatch(new ObligationTransactionsClose());
  }

  getCusip(): Observable<string> {
    return this.store.select(selectObligationCusip);
  }

  getSortBy(): Observable<string> {
    return this.store.select(selectObligationSortBy);
  }

  getCusipSearch(): Observable<boolean> {
    return this.store.select(selectObligationCusipSearch);
  }

  openCusipSearch(): void {
    this.store.dispatch(new ObligationCusipSearchOpen());
  }

  closeCusipSearch(): void {
    this.store.dispatch(new ObligationCusipSearchClose());
  }

  changeCusip(cusip: string): void {
    this.store.dispatch(new ObligationCusipChange(cusip));
  }

  changeSortBy(sortBy: ObligationSortBy): void {
    this.store.dispatch(new ObligationSortByChange(sortBy));
  }
}
