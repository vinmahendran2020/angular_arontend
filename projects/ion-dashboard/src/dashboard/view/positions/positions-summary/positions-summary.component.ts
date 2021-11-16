import { Component, Input } from '@angular/core';
import { IPositionSummary } from '../../../types/position';
import { PositionFacade } from '../../../facade/position.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-positions-summary',
  templateUrl: './positions-summary.component.html',
  styleUrls: ['./positions-summary.component.css'],
})
export class PositionsSummaryComponent {
  @Input()
  summary: IPositionSummary;
  
  constructor(private facade: PositionFacade) {}
}
