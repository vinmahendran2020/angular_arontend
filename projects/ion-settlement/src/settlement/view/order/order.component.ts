import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderFacade } from '../../facade/order.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit, OnDestroy {
  constructor(private facade: OrderFacade) {}

  ngOnInit(): void {
    this.facade.loaded();
  }

  ngOnDestroy(): void {
    this.facade.destroyed();
  }
}
