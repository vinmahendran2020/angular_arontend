import { Component, OnDestroy, OnInit } from '@angular/core';
import { ObligationFacade } from '../../facade/obligation.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-netted-obligations',
  templateUrl: './netted-obligations.component.html',
  styleUrls: ['./netted-obligations.component.css'],
})
export class NettedObligationsComponent implements OnInit, OnDestroy {
  summary$ = this.facade.getSummary();

  constructor(private facade: ObligationFacade) {}

  ngOnInit(): void {
    this.facade.loaded();
  }

  ngOnDestroy(): void {
    this.facade.destroyed();
  }
}
