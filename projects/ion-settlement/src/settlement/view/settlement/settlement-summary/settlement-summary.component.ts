import { Component } from '@angular/core';
import { SettlementFacade } from '../../../facade/settlement.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-settlement-summary',
  templateUrl: './settlement-summary.component.html',
  styleUrls: ['./settlement-summary.component.css'],
})
export class SettlementSummaryComponent {
  transactionType$ = this.facade.getTransactionType();

  constructor(private facade: SettlementFacade) {}
}
