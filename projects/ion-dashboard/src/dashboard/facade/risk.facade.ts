import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  RiskFormEnterKeyed,
  RiskPageDestroyed,
  RiskPageLoaded,
  RiskParticipantIdChange,
  RiskResetForm,
  RiskSummarySearch,
} from '../store/actions/risk.actions';
import {
  selectRiskParticipantId,
  selectRiskCollateralId,
  selectRiskParticipantIdError,
  selectRiskSummary,
  selectRiskFormDisabled,
} from '../store/selectors/risk.selectors';
import { IRiskSummary } from '../types';

@Injectable()
export class RiskFacade {
  constructor(private store: Store) {}

  getParticipantId(): Observable<string> {
    return this.store.select(selectRiskParticipantId);
  }

  getParticipantIdError(): Observable<string> {
    return this.store.select(selectRiskParticipantIdError);
  }

  getCollateralId(): Observable<string> {
    return this.store.select(selectRiskCollateralId);
  }

  getSummary(): Observable<IRiskSummary | undefined> {
    return this.store.select(selectRiskSummary);
  }

  disableSearch(): Observable<boolean> {
    return this.store.select(selectRiskFormDisabled);
  }

  loaded(): void {
    this.store.dispatch(new RiskPageLoaded());
  }

  destroyed(): void {
    this.store.dispatch(new RiskPageDestroyed());
  }

  changeParticipantId(participantId: string): void {
    this.store.dispatch(new RiskParticipantIdChange(participantId, /* triggerSearch */ false));
  }

  enter(): void {
    this.store.dispatch(new RiskFormEnterKeyed());
  }

  reset(): void {
    this.store.dispatch(new RiskResetForm());
  }

  search(): void {
    this.store.dispatch(new RiskSummarySearch());
  }
}
