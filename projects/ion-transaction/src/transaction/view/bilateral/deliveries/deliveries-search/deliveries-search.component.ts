import { Component } from '@angular/core';
import { DeliveryFacade } from '../../../../facade/delivery.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-deliveries-search',
  templateUrl: './deliveries-search.component.html',
  styleUrls: ['./deliveries-search.component.css'],
})
export class DeliveriesSearchComponent {
  participantId$ = this.facade.getParticipantId();
  participantIdError$ = this.facade.getParticipantIdError();
  searchDisabled$ = this.facade.disableSearch();

  modalOptions = {
    class: 'medium-dialog',
  };

  constructor(private facade: DeliveryFacade) {}

  onParticipantIdChange(participantId: string): void {
    this.facade.changeParticipantId(participantId);
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
