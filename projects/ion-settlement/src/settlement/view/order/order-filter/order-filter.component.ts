import { Component } from '@angular/core';
import { IDataProvider } from '@dtcc-uif/shared';
import { OrderFacade } from '../../../facade/order.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-order-filter',
  templateUrl: './order-filter.component.html',
  styleUrls: ['./order-filter.component.css'],
})
export class OrderFilterComponent {
  delivererId$ = this.facade.getDelivererId();
  receiverId$ = this.facade.getReceiverId();
  cusipId$ = this.facade.getCusipId();
  cusipName$ = this.facade.getCusipName();
  prefunded$ = this.facade.getPrefunded();
  settlementStatus$ = this.facade.getSettlementStatus();
  pendingReason$ = this.facade.getPendingReason();

  prefundeds: IDataProvider[] = [
    { label: 'Yes', id: 'Yes' },
    { label: 'No', id: 'No' },
  ];

  settlementStatuses: IDataProvider[] = [
    { label: 'Awaiting RAD Approval', id: 'Awaiting RAD Approval' },
    { label: 'Approved in RAD', id: 'Approved in RAD' },
    { label: 'Cancelled in RAD', id: 'Cancelled in RAD' },
    { label: 'Made', id: 'Made' },
    { label: 'Pending', id: 'Pending' },
    { label: 'Failed', id: 'Failed' },
  ];

  pendingReasons: IDataProvider[] = [
    { label: '1 - Insufficient Shares', id: '1 - Insufficient Shares' },
    {
      label: '2 - Deliver Insufficient Collateral',
      id: '2 - Deliver Insufficient Collateral',
    },
    {
      label: '3 - Receiver Insufficient Collateral',
      id: '3 - Receiver Insufficient Collateral',
    },
    { label: '4 - Debit Cap Check Failed', id: '4 - Debit Cap Check Failed' },
    { label: '5 - Insufficient Ion Cash', id: '5 - Insufficient Ion Cash' },
  ];

  constructor(private facade: OrderFacade) {}

  filter(): void {
    this.facade.filter();
  }

  onDelivererIdChange(delivererId: string): void {
    this.facade.changeDelivererId(delivererId);
  }


  onReceiverIdChange(receiverId: string): void {
    this.facade.changeReceiverId(receiverId);
  }

  onCusipIdChange(cusipId: string): void {
    this.facade.changeCusipId(cusipId);
  }

  onCusipNameChange(cusipName: string): void {
    this.facade.changeCusipName(cusipName);
  }

  onPrefundedChange(prefunded: string): void {
    this.facade.changePrefunded(prefunded);
  }

  onSettlementStatusChange(settlementStatus: string): void {
    this.facade.changeSettlementStatus(settlementStatus);
  }

  onPendingReasonChange(pendingReason: string): void {
    this.facade.changePendingReason(pendingReason);
  }
}
