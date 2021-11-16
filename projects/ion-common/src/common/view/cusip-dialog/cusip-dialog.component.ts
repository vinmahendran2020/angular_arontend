import { Component, Output, OnDestroy, EventEmitter } from '@angular/core';
import { take } from 'rxjs/operators';
import { CusipFacade } from '../../facade/cusip.facade';
import { IonCurrencyPipe } from '../../pipe/ion-currency.pipe';
import { ICusipRecord } from '../../types';
import { RadioButtonRendererComponent } from '../renderer/radio-button-renderer.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-cusip-dialog',
  templateUrl: './cusip-dialog.component.html',
  styleUrls: ['./cusip-dialog.component.css'],
})
export class CusipDialogComponent implements OnDestroy {
  constructor(
    private facade: CusipFacade,
    private currencyPipe: IonCurrencyPipe
  ) {}

  @Output() trigger = new EventEmitter<ICusipRecord>();

  error$ = this.facade.getError();
  securityName$ = this.facade.getSecurityName();
  issuerName$ = this.facade.getIssuerName();
  ticker$ = this.facade.getTicker();

  hasError$ = this.facade.getHasError();
  result$ = this.facade.getResult();
  hasNoResult$ = this.facade.getNoResult();
  hasResult$ = this.facade.getHasResult();
  canSubmit$ = this.facade.getCanSubmit();

  columnDefs = [
    {
      colId: '1',
      width: 50,
      cellRendererFramework: RadioButtonRendererComponent,
      cellRendererParams: {
        onClick: this.onCusipSelect.bind(this),
      },
    },
    {
      colId: '2',
      headerName: 'CUSIP',
      field: 'cusip',
      width: 150,
    },
    {
      colId: '3',
      headerName: 'Security Name',
      field: 'security',
      width: 150,
    },
    {
      colId: '4',
      headerName: 'Issuer Name',
      field: 'issuer',
      width: 150,
    },
    {
      colId: '5',
      headerName: 'Price',
      field: 'price',
      width: 100,
      cellClass: 'alignRight',
      headerClass: 'labelRight',
      valueFormatter: (params) =>
        this.currencyPipe.transform(params.data.price, 2),
    },
  ];

  backdrop = false;
  defaultGridHeight = '125px';
  isBasicGrid = true;
  gridOptions = {};
  gridConfig = {
    // pagination: true,
    suppressRowHoverHighlight: 'false',
    suppressDragLeaveHidesColumns: true,
    // paginationPageSize: 3,
    // maxPageSize: 4
  };

  onSecurityNameChange(securityName: string): void {
    this.facade.changeSecurityName(securityName);
  }

  onIssuerNameChange(issuerName: string): void {
    this.facade.changeIssuerName(issuerName);
  }

  onTickerChange(ticker: string): void {
    this.facade.changeTicker(ticker);
  }

  onCusipSelect(record: ICusipRecord): void {
    this.facade.chooseItem(record.cusip);
  }

  search(): void {
    this.facade.search();
  }

  reset(): void {
    this.facade.reset();
  }

  submit(): void {
    this.facade
      .getSelectedRecord()
      .pipe(take(1))
      .subscribe((selectedCusip) => {
        this.trigger.emit(selectedCusip);
      });
    // this.facade.searchBack();
  }

  closeError(): void {
    this.facade.closeError();
  }

  ngOnDestroy(): void {
    this.facade.reset();
  }
}
