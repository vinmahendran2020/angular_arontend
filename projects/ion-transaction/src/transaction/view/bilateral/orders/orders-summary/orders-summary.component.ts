import { Component } from '@angular/core';
import { OrderFacade } from '../../../../facade/order.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-orders-summary',
  templateUrl: './orders-summary.component.html',
  styleUrls: ['./orders-summary.component.css'],
})
export class OrdersSummaryComponent {
  submitDisabled$ = this.facade.disableSubmit();

  orderIds$ = this.facade.getOrderIds();

  constructor(private facade: OrderFacade) {}

  submit(): void {
    this.facade.submit();
  }

  reset(): void {
    this.facade.reset();
  }

  addRow(): void {
    this.facade.addNewOrder();
  }
}
