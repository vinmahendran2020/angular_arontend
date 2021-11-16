import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { DashboardFacade } from '../../facade/dashboard.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  active$ = this.facade.getCurrentTab();

  constructor(private router: Router, private facade: DashboardFacade) {}

  onSelect(id: string): void {
    this.router.navigate([`/dashboard/${id}`]);
  }
}
