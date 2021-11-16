import { Component, Input } from '@angular/core';
import { IMemoSummary } from '../../../types/memo';
import { MemoFacade } from '../../../facade/memo.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-memo-segregations-summary',
  templateUrl: './memo-segregations-summary.component.html',
  styleUrls: ['./memo-segregations-summary.component.css'],
})
export class MemoSegregationsSummaryComponent {
  @Input()
  summary: IMemoSummary;

  submitDisabled$ = this.facade.disableSubmit();

  memoIds$ = this.facade.getMemoIds();

  constructor(private facade: MemoFacade) {}

  submit(): void {
    this.facade.submit();
  }

  reset(): void {
    this.facade.reset();
  }

  addRow(): void {
    this.facade.addNewMemo();
  }
}
