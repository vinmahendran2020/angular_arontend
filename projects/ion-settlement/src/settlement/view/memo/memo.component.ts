import { Component, OnDestroy, OnInit } from '@angular/core';
import { MemoFacade } from '../../facade/memo.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-memo',
  templateUrl: './memo.component.html',
  styleUrls: ['./memo.component.css'],
})
export class MemoComponent implements OnInit, OnDestroy {
  constructor(private facade: MemoFacade) {}

  ngOnInit(): void {
    this.facade.loaded();
  }

  ngOnDestroy(): void {
    this.facade.destroyed();
  }
}
