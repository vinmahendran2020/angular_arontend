import { Component, OnDestroy, OnInit } from '@angular/core';
import { MemoFacade } from '../../facade/memo.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-memo-segregations',
  templateUrl: './memo-segregations.component.html',
  styleUrls: ['./memo-segregations.component.css'],
})
export class MemoSegregationsComponent implements OnInit, OnDestroy {
  summary$ = this.facade.getSummary();

  constructor(private facade: MemoFacade) {}

  ngOnInit(): void {
    this.facade.loaded();
  }

  ngOnDestroy(): void {
    this.facade.destroyed();
  }
}


