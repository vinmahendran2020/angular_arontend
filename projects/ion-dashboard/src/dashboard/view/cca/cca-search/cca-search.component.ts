import { Component } from '@angular/core';
import { CCAFacade } from '../../../facade/cca.facade';
import * as moment from 'moment';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-cca-search',
  templateUrl: './cca-search.component.html',
  styleUrls: ['./cca-search.component.css'],
})
export class CCASearchComponent {
  participantId$ = this.facade.getParticipantId();
  participantIdError$ = this.facade.getParticipantIdError();
  settlementDate$ = this.facade.getSettlementDate();
  searchDisabled$ = this.facade.disableSearch();

  constructor(private facade: CCAFacade) {}

  onParticipantIdChange(participantId: string): void {
    this.facade.changeParticipantId(participantId);
  }

  onSettlementDateChange(date: Array<string>): void {
    this.facade.changeSettlementDate([
      moment(date[0]).format('L'),
      moment(date[1]).format('L'),
    ]);
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
