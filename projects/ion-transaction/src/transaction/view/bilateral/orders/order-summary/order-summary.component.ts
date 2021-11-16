import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderFacade } from '../../../../facade/order.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css'],
})
export class OrderSummaryComponent implements OnInit {
  @Input()
  id: number;

  receiver$: Observable<string>;
  receiverError$: Observable<string>;
  cusip$: Observable<string>;
  cusipError$: Observable<string>;
  amount$: Observable<string>;
  amountError$: Observable<string>;
  quantity$: Observable<string>;
  quantityError$: Observable<string>;
  comment$: Observable<string>;
  date$: Observable<{ date: string }>;
  dateError$: Observable<string>;
  prefunded$: Observable<boolean>;
  value$: Observable<string>;
  cusipSearch$: Observable<boolean>;
  clonable$: Observable<boolean>;
  deletable$: Observable<boolean>;

  modalOptions = {
    class: 'medium-dialog',
  };

  constructor(private facade: OrderFacade) {}

  ngOnInit(): void {
    this.cusipSearch$ = this.facade.getCusipSearch(this.id);
    this.cusip$ = this.facade.getCusip(this.id);
    this.cusipError$ = this.facade.getCusipError(this.id);
    this.receiver$ = this.facade.getReceiver(this.id);
    this.receiverError$ = this.facade.getReceiverError(this.id);
    this.amount$ = this.facade.getAmount(this.id);
    this.amountError$ = this.facade.getAmountError(this.id);
    this.quantity$ = this.facade.getQuantity(this.id);
    this.quantityError$ = this.facade.getQuantityError(this.id);
    this.date$ = this.facade
      .getDate(this.id)
      .pipe(map((date) => date && { date }));
    this.dateError$ = this.facade.getDateError(this.id);
    this.comment$ = this.facade.getComment(this.id);
    this.prefunded$ = this.facade.getPrefunded(this.id);
    this.value$ = this.facade.getValue(this.id);
    this.clonable$ = this.facade.getClonable(this.id);
    this.deletable$ = this.facade.getDeletable(this.id);
  }

  clone(): void {
    this.facade.cloneOrder(this.id);
  }

  remove(): void {
    this.facade.removeOrder(this.id);
  }

  openCusipDialog(): void {
    this.facade.openCusipSearch(this.id);
  }

  closeCusipDialog(): void {
    this.facade.closeCusipSearch(this.id);
  }

  onCusipSelect(record: any): void {
    this.facade.changeCusip(this.id, record.cusip);
    this.facade.closeCusipSearch(this.id);
  }

  onCusipChange(cusip: string): void {
    this.facade.changeCusip(this.id, cusip);
  }

  onReceiverChange(receiver: string): void {
    this.facade.changeReceiver(this.id, receiver);
  }

  onAmountChange(amount: string): void {
    this.facade.changeAmount(this.id, amount);
  }

  onQuantityChange(quantity: string): void {
    this.facade.changeQuantity(this.id, quantity);
  }

  onCommentChange(comment: string): void {
    this.facade.changeComment(this.id, comment);
  }

  onDateChange(comment: string): void {
    this.facade.changeDate(this.id, comment);
  }

  onPrefundedChange(prefunded: boolean[]): void {
    this.facade.changePrefunded(this.id, prefunded.length > 1); // [false, [false]]
  }
}
