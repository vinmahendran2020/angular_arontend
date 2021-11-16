import { Component } from '@angular/core';
import { IonCurrencyPipe, IonNumberPipe } from 'ion-common';
import { ObligationFacade } from '../../../facade/obligation.facade';

type RowData = {
  data: {
    quantity: string;
    tradePrice: string;
    tradeAmount: string;
  };
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-trade-details-dialog',
  templateUrl: './trade-details-dialog.component.html',
  styleUrls: ['./trade-details-dialog.component.css'],
})
export class TradeDetailsDialogComponent {
  obligation$ = this.facade.getSelectedItem();
  trades$ = this.facade.getTrades();

  constructor(
    private facade: ObligationFacade,
    private currencyPipe: IonCurrencyPipe,
    private numberPipe: IonNumberPipe
  ) {}

  columnDefs = [
    {
      colId: '0',
      width: 30,
    },
    {
      colId: '1',
      headerName: 'Trade ID',
      field: 'tradeId',
      width: 120,
    },
    {
      colId: '2',
      headerName: 'CUSIP',
      field: 'cusip',
      width: 80,
    },
    {
      colId: '3',
      headerName: 'Ticker',
      field: 'ticker',
      width: 75,
    },
    {
      colId: '4',
      headerName: 'Buy / Sell',
      field: 'buySell',
      width: 75,
    },
    {
      colId: '5',
      headerName: 'Quantity',
      field: 'quantity',
      cellClass: 'alignRight',
      headerClass: 'labelRight',
      valueFormatter: this.formatQuantity.bind(this),
      width: 75,
    },
    {
      colId: '6',
      headerName: 'Trade Price',
      field: 'tradePrice',
      cellClass: 'alignRight',
      headerClass: 'labelRight',
      valueFormatter: this.formatTradePrice.bind(this),
      width: 100,
    },
    {
      colId: '7',
      headerName: 'Trade Amount',
      field: 'tradeAmount',
      cellClass: 'alignRight',
      headerClass: 'labelRight',
      valueFormatter: this.formatTradeAmount.bind(this),
      width: 125,
    },
    {
      colId: '8',
      headerName: 'Trade Date',
      field: 'tradeDate',
      width: 100,
    },
    {
      colId: '9',
      headerName: 'Settlement Date',
      field: 'settlementDate',
      width: 125,
    },
    {
      colId: '10',
      headerName: 'Market',
      field: 'market',
      width: 75,
    },
  ];

  backdrop = false;
  // defaultGridHeight = '130px';
  isBasicGrid = true;
  gridOptions = {
    suppressNoRowsOverlay: true,
    domLayout: 'autoHeight',
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

  formatTradePrice(params: RowData): string {
    return this.currencyPipe.transform(params.data.tradePrice, 2);
  }

  formatTradeAmount(params: RowData): string {
    return this.currencyPipe.transform(params.data.tradeAmount, 2);
  }

  formatQuantity(params: RowData): string {
    return this.numberPipe.transform(params.data.quantity);
  }
}
