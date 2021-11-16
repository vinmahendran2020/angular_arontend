import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { AdminFacade } from '../../facade/admin.facade';
import { ICurrentTab } from '../../types';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-settlement',
  templateUrl: './settlement.component.html',
  styleUrls: ['./settlement.component.css'],
})
export class SettlementComponent {
  active$ = this.facade.getCurrentTab();

  constructor(private router: Router, private facade: AdminFacade) {}

  onSelect(id: string): void {
    this.router.navigate([`/admin/settlement/${id}`]);

    let selectedTab: ICurrentTab = id as ICurrentTab;
    this.facade.tabRefresh(selectedTab);
  }
}
