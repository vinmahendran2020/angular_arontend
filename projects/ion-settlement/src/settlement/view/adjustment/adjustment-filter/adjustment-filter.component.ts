import { Component } from '@angular/core';
import { IDataProvider } from '@dtcc-uif/shared';
import { AdjustmentFacade } from '../../../facade/adjustment.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-adjustment-filter',
  templateUrl: './adjustment-filter.component.html',
  styleUrls: ['./adjustment-filter.component.css'],
})
export class AdjustmentFilterComponent {
  transactionId$ = this.facade.getTransactionId();
  settlementDate$ = this.facade.getSettlementDate();
  action$ = this.facade.getAction();
  status$ = this.facade.getStatus();
  creationDate$ = this.facade.getCreationDate();

  actions: IDataProvider[] = [
    { label: 'Credit', id: 'Credit' },
    { label: 'Debit', id: 'Debit' },
  ];

  statuses: IDataProvider[] = [
    { label: 'Open', id: 'Open' },
    { label: 'Made', id: 'Made' },
  ];

  constructor(private facade: AdjustmentFacade) {}

  filter(): void {
    this.facade.filter();
  }

  onTransactionIdChange(transactionId: string): void {
    this.facade.changeTransactionId(transactionId);
  }

  onSettlementDateChange(settlementDate: string): void {
    this.facade.changeSettlementDate(settlementDate);
  }

  onActionChange(action: string): void {
    this.facade.changeAction(action);
  }

  onStatusChange(status: string): void {
    this.facade.changeStatus(status);
  }

  onCreationDateChange(creationDate: string): void {
    this.facade.changeCreationDate(creationDate);
  }
}
