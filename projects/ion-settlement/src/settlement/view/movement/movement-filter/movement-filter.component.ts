import { Component } from '@angular/core';
import { IDataProvider } from '@dtcc-uif/shared';
import { map } from 'rxjs/operators';
import { MovementFacade } from '../../../facade/movement.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-movement-filter',
  templateUrl: './movement-filter.component.html',
  styleUrls: ['./movement-filter.component.css'],
})
export class MovementFilterComponent {
  action$ = this.facade.getAction();
  date$ = this.facade.getDate().pipe(map((date) => date && { date }));

  actions: IDataProvider[] = [
    { label: 'Deposit', id: 'Deposit' },
    { label: 'Withdraw', id: 'Withdraw' },
  ];

  constructor(private facade: MovementFacade) {}

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
