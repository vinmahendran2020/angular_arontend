import { Component } from '@angular/core';
import { PrepositionFacade } from '../../../facade/preposition.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-pre-positioning-search',
  templateUrl: './pre-positioning-search.component.html',
  styleUrls: ['./pre-positioning-search.component.css'],
})
export class PrepositioningSearchComponent {
  participantId$ = this.facade.getParticipantId();
  participantIdError$ = this.facade.getParticipantIdError();

  modalOptions = {
    class: 'medium-dialog',
  };

  constructor(private facade: PrepositionFacade) {}

  onParticipantIdChange(participantId: string): void {
    this.facade.changeParticipantId(participantId);
  }

  enter(): void {
    this.facade.enter();
  }
}
