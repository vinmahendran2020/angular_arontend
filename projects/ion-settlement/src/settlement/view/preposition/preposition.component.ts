import { Component, OnDestroy, OnInit } from '@angular/core';
import { PrepositionFacade } from '../../facade/preposition.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-preposition',
  templateUrl: './preposition.component.html',
  styleUrls: ['./preposition.component.css'],
})
export class PrepositionComponent implements OnInit, OnDestroy {
  constructor(private facade: PrepositionFacade) {}

  ngOnInit(): void {
    this.facade.loaded();
  }

  ngOnDestroy(): void {
    this.facade.destroyed();
  }
}
