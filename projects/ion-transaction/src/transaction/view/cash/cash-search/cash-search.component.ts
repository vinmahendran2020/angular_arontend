import { Component } from '@angular/core';
import { CashFacade } from '../../../facade/cash.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-cash-search',
  templateUrl: './cash-search.component.html',
  styleUrls: ['./cash-search.component.css'],
})
export class CashSearchComponent {
  participantId$ = this.facade.getParticipantId();
  participantIdError$ = this.facade.getParticipantIdError();

  modalOptions = {
    class: 'medium-dialog',
  };

  constructor(private facade: CashFacade) {}

  onParticipantIdChange(participantId: string): void {
    this.facade.changeParticipantId(participantId);
  }

  enter(): void {
    this.facade.enter();
  }
}
