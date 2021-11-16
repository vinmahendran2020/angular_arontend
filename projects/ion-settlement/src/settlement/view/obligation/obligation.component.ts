import { Component, OnDestroy, OnInit } from '@angular/core';
import { ObligationFacade } from '../../facade/obligation.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-obligation',
  templateUrl: './obligation.component.html',
  styleUrls: ['./obligation.component.css'],
})
export class ObligationComponent implements OnInit, OnDestroy {
  constructor(private facade: ObligationFacade) {}

  ngOnInit(): void {
    this.facade.loaded();
  }

  ngOnDestroy(): void {
    this.facade.destroyed();
  }
}
