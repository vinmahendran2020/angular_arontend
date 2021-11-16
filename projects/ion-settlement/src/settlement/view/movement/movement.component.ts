import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovementFacade } from '../../facade/movement.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.css'],
})
export class MovementComponent implements OnInit, OnDestroy {
  constructor(private facade: MovementFacade) {}

  ngOnInit(): void {
    this.facade.loaded();
  }

  ngOnDestroy(): void {
    this.facade.destroyed();
  }
}
