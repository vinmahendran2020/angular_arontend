import { Component } from '@angular/core';
import { ObligationFacade } from '../../../facade/obligation.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-netted-obligations-search',
  templateUrl: './netted-obligations-search.component.html',
  styleUrls: ['./netted-obligations-search.component.css'],
})
export class NettedObligationsSearchComponent {
  participantId$ = this.facade.getParticipantId();
  participantIdError$ = this.facade.getParticipantIdError();
  searchDisabled$ = this.facade.disableSearch();

  constructor(private facade: ObligationFacade) {}

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
