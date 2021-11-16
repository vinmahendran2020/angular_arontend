import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { selectCurrentTab } from '../store/selectors/module.selectors';

import {
  selectLastUpdated,
} from '../store/selectors/admin.selectors';

import { ICurrentTab } from '../types';
import { AdminCurrentTabRefresh } from '../store/actions/admin.actions';

@Injectable()
export class AdminFacade {
  constructor(private store: Store) {}

  getCurrentTab(): Observable<ICurrentTab> {
    return this.store.select(selectCurrentTab);
  }

  tabRefresh(currentTab: ICurrentTab): void {
    this.store.dispatch(new AdminCurrentTabRefresh(currentTab));
  }
}
