import { Component, Input } from '@angular/core';
import { IonCurrencyPipe, IonNumberPipe } from 'ion-common';
import { CCAFacade } from '../../../facade/cca.facade';

type RowData = {
  data: {
    netObligationId: string;
    cusip: string;
    ticker: string;
    ccaAmount: number;
    netBuySell: string;
    netQuantity: number;
    closePrice: number;
    netTradeAmount: number;
    netObligationStatus: string;
  }
};

@Component({
  selector: 'ion-cca-detail',
  templateUrl: './cca-detail.component.html',
  styleUrls: ['./cca-detail.component.css']
})
export class CCADetailComponent {

  adjustment$ = this.facade.getSelectedItem();
  summary$ = this.facade.getSummary();
  cusip$ = this.facade.getCusip();
  ccaDebits$ = this.facade.getCCADebits();
  totalCCADebits$ = this.facade.getTotalCCADebits();
  ccaCredits$ = this.facade.getCCACredits()
  totalCCACredits$ = this.facade.getTotalCCACredits();
  

  constructor(private facade: CCAFacade,
    private currencyPipe: IonCurrencyPipe,
    private numberPipe: IonNumberPipe) { }

  columnDefs = [
    {
      colId: '0',
      width: 10,
    },
    {
      colId: '1',
      headerName: 'Net Obligation ID',
      field: 'netObligationId',
      width: 110,
    },
    {
      colId: '2',
      headerName: 'CUSIP',
      field: 'cusip',
      width: 75,
    },
    {
      colId: '3',
      headerName: 'Ticker',
      field: 'ticker',
      width: 75,
    },
    {
      colId: '4',
      headerName: 'CCA Amount',
      field: 'ccaAmount',
      cellClass: 'alignRight',
      headerClass: 'labelRight',
      valueFormatter: this.formatCCAAmount.bind(this),
      width: 110,
    },
    {
      colId: '5',
      headerName: 'Net Buy / Sell',
      field: 'netBuySell',
      width: 100,
    },
    {
      colId: '6',
      headerName: 'Net Quantity',
      field: 'netQuantity',
      cellClass: 'alignRight',
      headerClass: 'labelRight',
      valueFormatter: this.formatNetQuantity.bind(this),
      width: 100,
    },
    {
      colId: '7',
      headerName: 'Close Price',
      field: 'closePrice',
      cellClass: 'alignRight',
      headerClass: 'labelRight',
      valueFormatter: this.formatClosePrice.bind(this),
      width: 110,
    },
    {
      colId: '8',
      headerName: 'Net Trade Amount',
      field: 'netTradeAmount',
      cellClass: 'alignRight',
      headerClass: 'labelRight',
      valueFormatter: this.formatNetTradeAmount.bind(this),
      width: 110,
    },
    {
      colId: '8',
      headerName: 'Netted Obligation Status',
      field: 'netObligationStatus',
      width: 140,
    },
  ];

  backdrop = false;
  defaultGridHeight = '130px';
  isBasicGrid = true;
  gridOptions = {
    suppressNoRowsOverlay: true,
    // domLayout: 'autoHeight',
    defaultColDef: {
      sortable: true,
      unSortIcon: true
    }
  };
  gridConfig = {
    // pagination: true,
    // suppressRowHoverHighlight: 'false',
    suppressDragLeaveHidesColumns: true,
    // paginationPageSize: 3,
    // maxPageSize: 4
  };

  formatClosePrice(params: RowData): string {
    return this.currencyPipe.transform(params.data.closePrice, 2);
  }

  formatCCAAmount(params: RowData): string {
    return this.currencyPipe.transform(params.data.ccaAmount, 2);
  }

  formatNetTradeAmount(params: RowData): string {
    return this.currencyPipe.transform(params.data.netTradeAmount, 2);
  }

  formatNetQuantity(params: RowData): string {
    return this.numberPipe.transform(params.data.netQuantity);
  }

  onCusipChange(cusip: string): void {
    this.facade.changeCusip(cusip);
  }

}
