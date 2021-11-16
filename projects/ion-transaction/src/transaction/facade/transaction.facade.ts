import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { selectCurrentTab } from '../store/selectors/module.selectors';

import { ICurrentTab } from '../types';

@Injectable()
export class TransactionFacade {
  constructor(private store: Store) {}

  getCurrentTab(): Observable<ICurrentTab> {
    return this.store.select(selectCurrentTab);
  }
}
