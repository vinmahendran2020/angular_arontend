import { Component } from '@angular/core';
import { MemoFacade } from '../../../facade/memo.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-memo-segregations-search',
  templateUrl: './memo-segregations-search.component.html',
  styleUrls: ['./memo-segregations-search.component.css'],
})
export class MemoSegregationsSearchComponent {
  participantId$ = this.facade.getParticipantId();
  participantIdError$ = this.facade.getParticipantIdError();

  modalOptions = {
    class: 'medium-dialog',
  };

  constructor(private facade: MemoFacade) {}

  onParticipantIdChange(participantId: string): void {
    this.facade.changeParticipantId(participantId);
  }

  enter(): void {
    this.facade.enter();
  }
}
