import { Component, OnDestroy, OnInit } from '@angular/core';
import { PositionFacade } from '../../facade/position.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css'],
})
export class PositionsComponent implements OnInit, OnDestroy {
  summary$ = this.facade.getSummary();

  constructor(private facade: PositionFacade) {}

  ngOnInit(): void {
    this.facade.loaded();
  }

  ngOnDestroy(): void {
    this.facade.destroyed();
  }
}
