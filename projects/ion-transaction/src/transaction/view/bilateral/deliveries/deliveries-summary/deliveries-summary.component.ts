import { Component } from '@angular/core';
import { IDataProvider } from '@dtcc-uif/shared';

import { IonDatePipe } from 'ion-common';

import { DeliveryFacade } from '../../../../facade/delivery.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-deliveries-summary',
  templateUrl: './deliveries-summary.component.html',
  styleUrls: ['./deliveries-summary.component.css'],
})
export class DeliveriesSummaryComponent {
  submitDisabled$ = this.facade.disableSubmit();

  deliveryIds$ = this.facade.getFilteredDeliveryIds();

  filterKind$ = this.facade.getFilterKind();

  filterValue$ = this.facade.getFilterValue();

  filters: IDataProvider[] = [
    { label: 'Deliverer ID', id: 'deliverer' },
    { label: 'Receiver ID', id: 'receiver' },
    { label: 'Both ID', id: 'both' },
  ];

  constructor(private facade: DeliveryFacade, private datePipe: IonDatePipe) {}

  onFilterKindChange(kind: string): void {
    this.facade.changeFilterKind(kind);
  }

  onFilterValueChange(value: string): void {
    this.facade.changeFilterValue(value);
  }

  submit(): void {
    this.facade.submit();
  }

  reset(): void {
    this.facade.reset();
  }
}
