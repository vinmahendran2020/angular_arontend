import { Component, Output, OnDestroy, EventEmitter } from '@angular/core';
import { take } from 'rxjs/operators';
import { TickerFacade } from '../../facade/ticker.facade';
import { IonCurrencyPipe } from '../../pipe/ion-currency.pipe';
import { ITickerRecord } from '../../types';
import { RadioButtonRendererComponent } from '../renderer/radio-button-renderer.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-ticker-dialog',
  templateUrl: './ticker-dialog.component.html',
  styleUrls: ['./ticker-dialog.component.css'],
})
export class TickerDialogComponent implements OnDestroy {
  constructor(
    private facade: TickerFacade,
    private currencyPipe: IonCurrencyPipe
  ) {}

  @Output()
  trigger = new EventEmitter<ITickerRecord>();

  error$ = this.facade.getError();
  securityName$ = this.facade.getSecurityName();
  issuerName$ = this.facade.getIssuerName();
  cusip$ = this.facade.getCusip();

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
        onClick: this.onTickerSelect.bind(this),
      },
    },
    {
      colId: '2',
      headerName: 'Ticker',
      field: 'ticker',
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
  gridOptions = {
    // domLayout: 'autoHeight'
  };
  gridConfig = {
    // pagination: false,
    suppressRowHoverHighlight: 'false',
    suppressDragLeaveHidesColumns: true,
    // paginationPageSize: 3,
    // maxPageSize: 4,
  };

  onSecurityNameChange(securityName: string): void {
    this.facade.changeSecurityName(securityName);
  }

  onIssuerNameChange(issuerName: string): void {
    this.facade.changeIssuerName(issuerName);
  }

  onCusipChange(cusip: string): void {
    this.facade.changeCusip(cusip);
  }

  onTickerSelect(record: ITickerRecord): void {
    this.facade.chooseItem(record.ticker);
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
      .subscribe((selectedTicker) => {
        this.trigger.emit(selectedTicker);
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
