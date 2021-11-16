import { Component } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-transaction-pending-action',
  templateUrl: './transaction-pending-action.component.html',
  styleUrls: ['./transaction-pending-action.component.css'],
})
export class TransactionPendingActionComponent {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event: any): void {
    $event.preventDefault();
    if (this.params.onClick instanceof Function) {
      this.params.onClick(this.params.node.data);
    }
  }

  get cusip(): string {
    return this.params.node.data.cusip;
  }
}
