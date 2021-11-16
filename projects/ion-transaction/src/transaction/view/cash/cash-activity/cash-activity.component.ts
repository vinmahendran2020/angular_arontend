import { Component } from '@angular/core';
import { CashFacade } from '../../../facade/cash.facade';
import { IDataProvider } from '@dtcc-uif/shared';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-cash-activity',
  templateUrl: './cash-activity.component.html',
  styleUrls: ['./cash-activity.component.css'],
})
export class CashActivityComponent {
  operations: IDataProvider[] = [
    { label: 'Deposit', id: 'DEPOSIT' },
    { label: 'Withdraw', id: 'WITHDRAW' },
  ];

  operation$ = this.facade.getOperation();
  operationError$ = this.facade.getOperationError();

  amount$ = this.facade.getAmount();
  amountError$ = this.facade.getAmountError();

  submitDisabled$ = this.facade.disableActivity();

  constructor(private facade: CashFacade) {}

  onOperationChange(operation: string): void {
    this.facade.changeOperation(operation);
  }

  onAmountChange(amount: string): void {
    this.facade.changeAmount(amount);
  }

  submit(): void {
    this.facade.submit();
  }

  reset(): void {
    this.facade.reset();
  }
}
