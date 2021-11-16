import { Component } from '@angular/core';
import { IDataProvider } from '@dtcc-uif/shared';
import { MemoFacade } from '../../../facade/memo.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-memo-filter',
  templateUrl: './memo-filter.component.html',
  styleUrls: ['./memo-filter.component.css'],
})
export class MemoFilterComponent {
  cusipId$ = this.facade.getCusipId();
  cusipName$ = this.facade.getCusipName();
  action$ = this.facade.getAction();

  actions: IDataProvider[] = [
    { label: 'Add', id: 'Add' },
    { label: 'Subtract', id: 'Subtract' },
    { label: 'Overlay', id: 'Overlay' },
  ];

  constructor(private facade: MemoFacade) {}

  filter(): void {
    this.facade.filter();
  }

  onCusipIdChange(cusipId: string): void {
    this.facade.changeCusipId(cusipId);
  }

  onCusipNameChange(cusipName: string): void {
    this.facade.changeCusipName(cusipName);
  }

  onActionChange(action: string): void {
    this.facade.changeAction(action);
  }
}
