import { Component, OnInit, OnDestroy } from '@angular/core';
import { PrepositionFacade } from '../../facade/preposition.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-pre-positioning',
  templateUrl: './pre-positioning.component.html',
  styleUrls: ['./pre-positioning.component.css'],
})
export class PrepositioningComponent implements OnInit, OnDestroy {
  summary$ = this.facade.getSummary();

  constructor(private facade: PrepositionFacade) {}

  ngOnInit(): void {
    this.facade.loaded();
  }

  ngOnDestroy(): void {
    this.facade.destroyed();
  }
}
