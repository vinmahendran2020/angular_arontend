import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  MovementActionChange,
  MovementDateChange,
  MovementFilterSummary,
  MovementPageDestroyed,
  MovementPageLoaded,
} from '../store/actions/movement.actions';
import {
  selectFilteredMovements,
  selectMovementAction,
  selectMovementDate,
} from '../store/selectors/movement.selectors';
import { IMovement } from '../types';

@Injectable()
export class MovementFacade {
  constructor(private store: Store) {}

  getFilteredMovements(): Observable<IMovement[]> {
    return this.store.select(selectFilteredMovements);
  }

  loaded(): void {
    this.store.dispatch(new MovementPageLoaded());
  }

  destroyed(): void {
    this.store.dispatch(new MovementPageDestroyed());
  }

  filter(): void {
    this.store.dispatch(new MovementFilterSummary());
  }

  getDate(): Observable<string> {
    return this.store.select(selectMovementDate);
  }

  changeDate(date: string): void {
    this.store.dispatch(new MovementDateChange(date));
  }

  getAction(): Observable<string> {
    return this.store.select(selectMovementAction);
  }

  changeAction(action: string): void {
    this.store.dispatch(new MovementActionChange(action));
  }
}
