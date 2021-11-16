import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PrepositionFacade } from '../../../facade/preposition.facade';
import { IDataProvider } from '@dtcc-uif/shared';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-pre-positioning-entry',
  templateUrl: './pre-positioning-entry.component.html',
  styleUrls: ['./pre-positioning-entry.component.css'],
})
export class PrepositioningEntryComponent implements OnInit {
  @Input()
  id: number;

  action$: Observable<string>;
  cusip$: Observable<string>;
  cusipError$: Observable<string>;
  quantity$: Observable<string>;
  quantityError$: Observable<string>;
  cusipName$: Observable<string>;
  cusipSearch$: Observable<boolean>;
  deletable$: Observable<boolean>;

  modalOptions = {
    class: 'medium-dialog',
  };

  actions: IDataProvider[] = [
    { label: 'Pledge', id: 'PLEDGE' },
    { label: 'Release', id: 'RELEASE_PLEDGE' },
  ];

  constructor(private facade: PrepositionFacade) {}

  ngOnInit(): void {
    this.action$ = this.facade.getAction(this.id);
    this.cusipSearch$ = this.facade.getCusipSearch(this.id);
    this.cusip$ = this.facade.getCusip(this.id);
    this.cusipError$ = this.facade.getCusipError(this.id);
    this.quantity$ = this.facade.getQuantity(this.id);
    this.quantityError$ = this.facade.getQuantityError(this.id);
    this.cusipName$ = this.facade.getCusipName(this.id);
    this.deletable$ = this.facade.getDeletable(this.id);
  }

  remove(): void {
    this.facade.removePreposition(this.id);
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
