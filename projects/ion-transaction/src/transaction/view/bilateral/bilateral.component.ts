import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TransactionFacade } from '../../facade/transaction.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-bilateral',
  templateUrl: './bilateral.component.html',
  styleUrls: ['./bilateral.component.css'],
})
export class BilateralComponent {
  active$ = this.facade.getCurrentTab();

  constructor(private router: Router, private facade: TransactionFacade) {}

  onSelect(id: string): void {
    this.router.navigate([`/transaction/bilateral/${id}`]);
  }
}
