import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeliveryFacade } from '../../../facade/delivery.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.css'],
})
export class DeliveriesComponent implements OnInit, OnDestroy {
  constructor(private facade: DeliveryFacade) {}

  ngOnInit(): void {
    this.facade.loaded();
  }

  ngOnDestroy(): void {
    this.facade.destroyed();
  }
}
