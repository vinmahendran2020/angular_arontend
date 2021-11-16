import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdjustmentFacade } from '../../facade/adjustment.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-adjustment',
  templateUrl: './adjustment.component.html',
  styleUrls: ['./adjustment.component.css'],
})
export class AdjustmentComponent implements OnInit, OnDestroy {
  constructor(private facade: AdjustmentFacade) {}

  ngOnInit(): void {
    this.facade.loaded();
  }

  ngOnDestroy(): void {
    this.facade.destroyed();
  }
}
