import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderFacade } from '../../../facade/order.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  constructor(private facade: OrderFacade) {}

  ngOnInit(): void {
    this.facade.loaded();
  }

  ngOnDestroy(): void {
    this.facade.destroyed();
  }
}
