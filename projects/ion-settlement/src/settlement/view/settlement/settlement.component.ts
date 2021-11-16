import { Component, OnDestroy, OnInit } from '@angular/core';
import { SettlementFacade } from '../../facade/settlement.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-settlement',
  templateUrl: './settlement.component.html',
  styleUrls: ['./settlement.component.css'],
})
export class SettlementComponent implements OnInit, OnDestroy {
  constructor(private facade: SettlementFacade) {}

  ngOnInit(): void {
    this.facade.loaded();
  }

  ngOnDestroy(): void {
    this.facade.destroyed();
  }
}
