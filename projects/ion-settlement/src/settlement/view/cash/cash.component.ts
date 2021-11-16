import { Component, OnDestroy, OnInit } from '@angular/core';
import { CashFacade } from '../../facade/cash.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.css'],
})
export class CashComponent implements OnInit, OnDestroy {
  constructor(private facade: CashFacade) {}

  ngOnInit(): void {
    this.facade.loaded();
  }

  ngOnDestroy(): void {
    this.facade.destroyed();
  }
}
