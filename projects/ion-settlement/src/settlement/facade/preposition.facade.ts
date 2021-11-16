import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  PrepositionCusipIdChange,
  PrepositionCusipNameChange,
  PrepositionFilterSummary,
  PrepositionPageDestroyed,
  PrepositionPageLoaded,
  PrepositionActionChange,
} from '../store/actions/preposition.actions';
import {
  selectFilteredPrepositions,
  selectPrepositionAction,
  selectPrepositionCusipId,
  selectPrepositionCusipName,
} from '../store/selectors/preposition.selectors';
import { IPreposition } from '../types';

@Injectable()
export class PrepositionFacade {
  constructor(private store: Store) {}

  getFilteredPrepositions(): Observable<IPreposition[]> {
    return this.store.select(selectFilteredPrepositions);
  }

  loaded(): void {
    this.store.dispatch(new PrepositionPageLoaded());
  }

  destroyed(): void {
    this.store.dispatch(new PrepositionPageDestroyed());
  }

  filter(): void {
    this.store.dispatch(new PrepositionFilterSummary());
  }

  getCusipId(): Observable<string> {
    return this.store.select(selectPrepositionCusipId);
  }

  changeCusipId(cusip: string): void {
    this.store.dispatch(new PrepositionCusipIdChange(cusip));
  }

  getCusipName(): Observable<string> {
    return this.store.select(selectPrepositionCusipName);
  }

  changeCusipName(cusipName: string): void {
    this.store.dispatch(new PrepositionCusipNameChange(cusipName));
  }

  getAction(): Observable<string> {
    return this.store.select(selectPrepositionAction);
  }

  changeAction(action: string): void {
    this.store.dispatch(new PrepositionActionChange(action));
  }
}
