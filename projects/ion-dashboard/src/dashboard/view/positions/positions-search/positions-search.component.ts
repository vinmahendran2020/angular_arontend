import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { PositionFacade } from '../../../facade/position.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-positions-search',
  templateUrl: './positions-search.component.html',
  styleUrls: ['./positions-search.component.css'],
})
export class PositionsSearchComponent {
  participantId$ = this.facade.getParticipantId();
  participantIdError$ = this.facade.getParticipantIdError();
  cusip$ = this.facade.getCusip();
  cusipError$ = this.facade.getCusipError();
  date$ = this.facade.getDate().pipe(map((date) => date && { date }));
  searchDisabled$ = this.facade.disableSearch();
  cusipSearch$ = this.facade.getCusipSearch();

  modalOptions = {
    class: 'medium-dialog',
  };

  constructor(private facade: PositionFacade) {}

  onParticipantIdChange(participantId: string): void {
    this.facade.changeParticipantId(participantId);
  }

  onCusipChange(cusip: string): void {
    this.facade.changeCusip(cusip);
  }

  onCusipSelect(record: any): void {
    this.facade.changeCusip(record.cusip);
    this.facade.closeCusipSearch();
  }

  onDateChange(date: string): void {
    this.facade.changeDate(date);
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

  openCusipDialog(): void {
    this.facade.openCusipSearch();
  }

  closeCusipDialog(): void {
    this.facade.closeCusipSearch();
  }
}
