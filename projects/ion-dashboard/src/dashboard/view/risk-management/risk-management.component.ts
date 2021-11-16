import { Component, OnDestroy, OnInit } from '@angular/core';
import { RiskFacade } from '../../facade/risk.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-risk-management',
  templateUrl: './risk-management.component.html',
  styleUrls: ['./risk-management.component.css'],
})
export class RiskManagementComponent implements OnInit, OnDestroy {
  summary$ = this.facade.getSummary();

  constructor(private facade: RiskFacade) {}

  ngOnInit(): void {
    this.facade.loaded();
  }

  ngOnDestroy(): void {
    this.facade.destroyed();
  }
}
