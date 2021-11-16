
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { AdminFacade } from '../../facade/admin.facade';

@Component({
   // tslint:disable-next-line:component-selector
   selector: 'ion-admin-daily-process',
   templateUrl: './daily-process.component.html',
   styleUrls: ['./daily-process.component.css'],
})
export class DailyProcessComponent {
  active$ = this.facade.getCurrentTab();

  constructor(private router: Router, private facade: AdminFacade) {}

  onSelect(id: string): void {
    this.router.navigate([`/admin/daily-process/${id}`]);
  }
}

