import { Component } from '@angular/core';
import { CashFacade } from '../../../facade/cash.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-cash-balance',
  templateUrl: './cash-balance.component.html',
  styleUrls: ['./cash-balance.component.css'],
})
export class CashBalanceComponent {
  balance$ = this.facade.getBalance();

  currency$ = this.facade.getCurrency();

  constructor(private facade: CashFacade) {}
}
