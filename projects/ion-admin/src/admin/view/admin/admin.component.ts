import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AdminFacade } from '../../facade/admin.facade';
import { ICurrentTab } from '../../types';
import { last } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  active$ = this.facade.getCurrentTab();

  constructor(private router: Router, private facade: AdminFacade) {}

  onSelect(id: string): void {
    this.router.navigate([`/admin/${id}`]);
    
    let selectedTab: ICurrentTab;
    if(id === "settlement/security") { 
      selectedTab = "security" 
    } else {
      selectedTab = id as ICurrentTab;
    }
    this.facade.tabRefresh(selectedTab);
  }
}
