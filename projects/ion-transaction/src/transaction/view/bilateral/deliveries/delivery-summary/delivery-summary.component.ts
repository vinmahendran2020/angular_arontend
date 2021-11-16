import { Component, Input, OnInit } from '@angular/core';
import { IDataProvider } from '@dtcc-uif/shared';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DeliveryFacade } from '../../../../facade/delivery.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-delivery-summary',
  templateUrl: './delivery-summary.component.html',
  styleUrls: ['./delivery-summary.component.css'],
})
export class DeliverySummaryComponent implements OnInit {
  @Input()
  id: string;

  operations$: Observable<IDataProvider[]>;

  operation$: Observable<string>;
  deliverer$: Observable<string>;
  receiver$: Observable<string>;
  cusip$: Observable<string>;
  amount$: Observable<string>;
  quantity$: Observable<string>;
  comment$: Observable<string>;
  date$: Observable<string>;
  prefunded$: Observable<boolean>;
  value$: Observable<string>;

  constructor(private facade: DeliveryFacade) {}

  ngOnInit(): void {
    const operationLabels = {
      select: 'Please Select',
      approve: 'Approve',
      cancel: 'Cancel',
    };
    this.operations$ = this.facade.getAllowedOperations(this.id).pipe(
      map((operations) => ['select', ...operations]),
      map((operations) =>
        operations.map(
          (operation) =>
            ({
              id: operation,
              label: operationLabels[operation] || '',
            } as IDataProvider)
        )
      )
    );

    this.operation$ = this.facade.getOperation(this.id);
    this.deliverer$ = this.facade.getDeliverer(this.id);
    this.receiver$ = this.facade.getReceiver(this.id);
    this.cusip$ = this.facade.getCusip(this.id);
    this.amount$ = this.facade.getAmount(this.id);
    this.quantity$ = this.facade.getQuantity(this.id);
    this.date$ = this.facade.getDate(this.id);
    this.comment$ = this.facade.getComment(this.id);
    this.prefunded$ = this.facade.getPrefunded(this.id);
    this.value$ = this.facade.getValue(this.id);
  }

  onOperationChange(receiver: string): void {
    this.facade.changeOperation(this.id, receiver);
  }
}
