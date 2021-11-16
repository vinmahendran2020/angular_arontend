import { Component } from '@angular/core';
import { IDataProvider } from '@dtcc-uif/shared';
import { map } from 'rxjs/operators';
import { CashFacade } from '../../../facade/cash.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-cash-filter',
  templateUrl: './cash-filter.component.html',
  styleUrls: ['./cash-filter.component.css'],
})
export class CashFilterComponent {
  action$ = this.facade.getAction();
  date$ = this.facade.getDate().pipe(map((date) => date && { date }));

  actions: IDataProvider[] = [
    { label: 'Debit', id: 'Debit' },
    { label: 'Credit', id: 'Credit' },
  ];

  constructor(private facade: CashFacade) {}

  filter(): void {
    this.facade.filter();
  }

  onDateChange(date: string): void {
    this.facade.changeDate(date);
  }

  onActionChange(action: string): void {
    this.facade.changeAction(action);
  }
}
