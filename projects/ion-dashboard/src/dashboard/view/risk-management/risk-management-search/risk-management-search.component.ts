import { Component } from '@angular/core';
import { RiskFacade } from '../../../facade/risk.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-risk-management-search',
  templateUrl: './risk-management-search.component.html',
  styleUrls: ['./risk-management-search.component.css'],
})
export class RiskManagementSearchComponent {
  participantId$ = this.facade.getParticipantId();
  participantIdError$ = this.facade.getParticipantIdError();
  collateralId$ = this.facade.getCollateralId();
  searchDisabled$ = this.facade.disableSearch();

  constructor(private facade: RiskFacade) {}

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
