import { Component } from '@angular/core';
import { IDataProvider } from '@dtcc-uif/shared';
import { ObligationFacade } from '../../../facade/obligation.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-obligation-filter',
  templateUrl: './obligation-filter.component.html',
  styleUrls: ['./obligation-filter.component.css'],
})
export class ObligationFilterComponent {
  cusipId$ = this.facade.getCusipId();
  cusipName$ = this.facade.getCusipName();
  direction$ = this.facade.getDirection();
  settlementStatus$ = this.facade.getSettlementStatus();

  directions: IDataProvider[] = [
    { label: 'Short', id: 'Short' },
    { label: 'Long', id: 'Long' },
  ];

  settlementStatuses: IDataProvider[] = [
    { label: 'Awaiting RAD Approval', id: 'Awaiting RAD Approval' },
    { label: 'Approved in RAD', id: 'Approved in RAD' },
    { label: 'Cancelled in RAD', id: 'Cancelled in RAD' },
    { label: 'Made', id: 'Made' },
    { label: 'Pending', id: 'Pending' },
    { label: 'Failed', id: 'Failed' },
  ];

  constructor(private facade: ObligationFacade) {}

  filter(): void {
    this.facade.filter();
  }

  onCusipIdChange(cusipId: string): void {
    this.facade.changeCusipId(cusipId);
  }

  onCusipNameChange(cusipName: string): void {
    this.facade.changeCusipName(cusipName);
  }

  onDirectionChange(direction: string): void {
    this.facade.changeDirection(direction);
  }

  onSettlementStatusChange(settlementStatus: string): void {
    this.facade.changeSettlementStatus(settlementStatus);
  }
}
