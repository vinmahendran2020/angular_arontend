import { Component, Input } from '@angular/core';
import { IRiskSummary } from '../../../types/risk';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-risk-management-summary',
  templateUrl: './risk-management-summary.component.html',
  styleUrls: ['./risk-management-summary.component.css'],
})
export class RiskManagementSummaryComponent {
  @Input()
  summary: IRiskSummary;
}
