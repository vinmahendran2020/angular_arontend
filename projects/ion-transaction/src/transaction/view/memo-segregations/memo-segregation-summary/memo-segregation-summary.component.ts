import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MemoFacade } from '../../../facade/memo.facade';
import { IDataProvider } from '@dtcc-uif/shared';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-memo-segregation-summary',
  templateUrl: './memo-segregation-summary.component.html',
  styleUrls: ['./memo-segregation-summary.component.css'],
})
export class MemoSegregationSummaryComponent implements OnInit {
  @Input()
  id: number;

  action: IDataProvider[] = [
    { label: 'Add', id: 'ADD' },
    { label: 'Subtract', id: 'SUBTRACT' },
    { label: 'Overlay', id: 'OVERLAY' },
  ];

  action$: Observable<string>;
  actionError$: Observable<string>;
  cusip$: Observable<string>;
  cusipError$: Observable<string>;
  amount$: Observable<string>;
  amountError$: Observable<string>;
  quantity$: Observable<string>;
  quantityError$: Observable<string>;
  cusipSearch$: Observable<boolean>;
  cusipName$: Observable<string>;
  totalFreePstn$: Observable<number>;
  memoSegPstn$: Observable<number>;
  freeExcessPstn$: Observable<number>;
  deletable$: Observable<boolean>;

  modalOptions = {
    class: 'medium-dialog',
  };

  constructor(private facade: MemoFacade) {}

  ngOnInit(): void {
    this.action$ = this.facade.getAction(this.id);
    this.actionError$ = this.facade.getActionError(this.id);
    this.cusipSearch$ = this.facade.getCusipSearch(this.id);
    this.cusip$ = this.facade.getCusip(this.id);
    this.cusipError$ = this.facade.getCusipError(this.id);
    this.quantity$ = this.facade.getQuantity(this.id);
    this.quantityError$ = this.facade.getQuantityError(this.id);
    this.cusipName$ = this.facade.getCusipName(this.id);
    this.totalFreePstn$ = this.facade.getTotalFreePstn(this.id);
    this.memoSegPstn$ = this.facade.getMemoSegPstn(this.id);
    this.freeExcessPstn$ = this.facade.getFreeExcessPstn(this.id);
    this.deletable$ = this.facade.getDeletable(this.id);
  }

  remove(): void {
    this.facade.removeMemo(this.id);
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

  onActionChange(action: string): void {
    this.facade.changeAction(this.id, action);
  }

  onQuantityChange(quantity: string): void {
    this.facade.changeQuantity(this.id, quantity);
  }
}
