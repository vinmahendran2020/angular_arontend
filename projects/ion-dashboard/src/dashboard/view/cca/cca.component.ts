import { Component, OnDestroy, OnInit } from '@angular/core';
import { CCAFacade } from '../../facade/cca.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-cca',
  templateUrl: './cca.component.html',
  styleUrls: ['./cca.component.css']
})
export class CCAComponent implements OnInit, OnDestroy {

  summary$ = this.facade.getSummary();

  constructor(private facade: CCAFacade) {}

  ngOnInit(): void {
    this.facade.loaded();
  }

  ngOnDestroy(): void {
    this.facade.destroyed();
  }
}
