import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  FormParticipantIdChange,
  FormTransactionTypeChange,
  FormBusinessDateChange,
  FormResetForm,
  FormSummarySearch,
  FormFormEnterKeyed,
  FormPageDestroyed,
  FormPageLoaded,
  FormBeginReset,
} from '../store/actions/form.actions';
import {
  selectCurrentTab,
  selectFormParticipantId,
  selectFormTransactionType,
  selectFormBusinessDate,
  selectFormDisabled,
  selectFormParticipantIdError,
  selectFormTransactionTypeError,
} from '../store/selectors/form.selectors';

import { ICurrentTab } from '../types';

@Injectable()
export class SettlementFacade {
  constructor(private store: Store) {}

  getCurrentTab(): Observable<ICurrentTab> {
    return this.store.select(selectCurrentTab);
  }

  getParticipantId(): Observable<string> {
    return this.store.select(selectFormParticipantId);
  }

  getParticipantIdError(): Observable<string> {
    return this.store.select(selectFormParticipantIdError);
  }

  getTransactionType(): Observable<string> {
    return this.store.select(selectFormTransactionType);
  }

  getTransactionTypeError(): Observable<string> {
    return this.store.select(selectFormTransactionTypeError);
  }

  getBusinessDate(): Observable<string> {
    return this.store.select(selectFormBusinessDate);
  }

  disableSearch(): Observable<boolean> {
    return this.store.select(selectFormDisabled);
  }

  changeParticipantId(participantId: string): void {
    this.store.dispatch(new FormParticipantIdChange(participantId, /* triggerSearch */ false));
  }

  changeTransactionType(cusip: string): void {
    this.store.dispatch(new FormTransactionTypeChange(cusip));
  }

  changeBusinessDate(date: string): void {
    this.store.dispatch(new FormBusinessDateChange(date));
  }

  enter(): void {
    this.store.dispatch(new FormFormEnterKeyed());
  }

  reset(): void {
    this.store.dispatch(new FormBeginReset());
  }

  search(): void {
    this.store.dispatch(new FormSummarySearch('searched'));
  }

  loaded(): void {
    this.store.dispatch(new FormPageLoaded());
  }

  destroyed(): void {
    this.store.dispatch(new FormPageDestroyed());
  }
}
