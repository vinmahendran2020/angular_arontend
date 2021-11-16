import { Component } from '@angular/core';
import { IDataProvider } from '@dtcc-uif/shared';
import { map } from 'rxjs/operators';
import { SettlementFacade } from '../../../facade/settlement.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-settlement-search',
  templateUrl: './settlement-search.component.html',
  styleUrls: ['./settlement-search.component.css'],
})
export class SettlementSearchComponent {
  participantId$ = this.facade.getParticipantId();
  participantIdError$ = this.facade.getParticipantIdError();
  transactionType$ = this.facade.getTransactionType();
  transactionTypeError$ = this.facade.getTransactionTypeError();
  businessDate$ = this.facade
    .getBusinessDate()
    .pipe(map((date) => date && { date }));
  searchDisabled$ = this.facade.disableSearch();

  modalOptions = {
    class: 'medium-dialog',
  };

  transactionTypes: IDataProvider[] = [
    { label: 'Netted Obligations', id: 'obligation' },
    { label: 'Bilateral Deliver Orders', id: 'order' },
    { label: 'Pre-Positioning', id: 'preposition' },
    { label: 'Memo Segregation', id: 'memo' },
    { label: 'Clearing Cash Adjustments', id: 'adjustment' },
    { label: 'Prefunded Ion Cash Movement', id: 'movement' },
    { label: 'Cash Settlement', id: 'cash' },
  ];

  constructor(private facade: SettlementFacade) {}

  onParticipantIdChange(participantId: string): void {
    this.facade.changeParticipantId(participantId);
  }

  onTransactionTypeChange(transactionType: string): void {
    this.facade.changeTransactionType(transactionType);
  }

  onBusinessDateChange(businessDate: string): void {
    this.facade.changeBusinessDate(businessDate);
  }

  search(): void {
    this.facade.search();
  }

  reset(): void {
    this.facade.reset();
  }

  enter(): void {
    this.facade.enter();
  }
}
