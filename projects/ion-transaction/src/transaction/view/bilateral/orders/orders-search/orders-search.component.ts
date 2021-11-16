import { Component } from '@angular/core';
import { OrderFacade } from '../../../../facade/order.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-orders-search',
  templateUrl: './orders-search.component.html',
  styleUrls: ['./orders-search.component.css'],
})
export class OrdersSearchComponent {
  participantId$ = this.facade.getParticipantId();
  participantIdError$ = this.facade.getParticipantIdError();

  modalOptions = {
    class: 'medium-dialog',
  };

  constructor(private facade: OrderFacade) {}

  onParticipantIdChange(participantId: string): void {
    this.facade.changeParticipantId(participantId);
  }

  enter(): void {
    this.facade.enter();
  }
}
