import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  ObligationCusipIdChange,
  ObligationCusipNameChange,
  ObligationFilterSummary,
  ObligationPageDestroyed,
  ObligationPageLoaded,
  ObligationDirectionChange,
  ObligationSettlementStatusChange,
} from '../store/actions/obligation.actions';
import {
  selectFilteredObligations,
  selectObligationCusipId,
  selectObligationCusipName,
  selectObligationDirection,
  selectObligationSettlemetStatus,
} from '../store/selectors/obligation.selectors';
import { IObligation } from '../types';

@Injectable()
export class ObligationFacade {
  constructor(private store: Store) {}

  getFilteredObligations(): Observable<IObligation[]> {
    return this.store.select(selectFilteredObligations);
  }

  loaded(): void {
    this.store.dispatch(new ObligationPageLoaded());
  }

  destroyed(): void {
    this.store.dispatch(new ObligationPageDestroyed());
  }

  filter(): void {
    this.store.dispatch(new ObligationFilterSummary());
  }

  getCusipId(): Observable<string> {
    return this.store.select(selectObligationCusipId);
  }

  changeCusipId(cusipId: string): void {
    this.store.dispatch(new ObligationCusipIdChange(cusipId));
  }

  getCusipName(): Observable<string> {
    return this.store.select(selectObligationCusipName);
  }

  changeCusipName(cusipName: string): void {
    this.store.dispatch(new ObligationCusipNameChange(cusipName));
  }

  getDirection(): Observable<string> {
    return this.store.select(selectObligationDirection);
  }

  changeDirection(direction: string): void {
    this.store.dispatch(new ObligationDirectionChange(direction));
  }

  getSettlementStatus(): Observable<string> {
    return this.store.select(selectObligationSettlemetStatus);
  }

  changeSettlementStatus(settlementStatus: string): void {
    this.store.dispatch(new ObligationSettlementStatusChange(settlementStatus));
  }
}
