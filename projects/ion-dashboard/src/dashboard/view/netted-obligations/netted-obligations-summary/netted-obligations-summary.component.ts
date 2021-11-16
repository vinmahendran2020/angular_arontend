import { Component } from '@angular/core';
import { IDataProvider } from '@dtcc-uif/shared';
import { IonCurrencyPipe, IonNumberPipe } from 'ion-common';
import { ObligationFacade } from '../../../facade/obligation.facade';
import { INetObligation, ObligationSortBy } from '../../../types';
import { LinkRendererComponent } from '../link-renderer/link-renderer.component';
import { StatusLinkRendererComponent } from '../status-link-renderer/status-link-renderer.component';

type RowData = {
  data: {
    netQuantity: string;
    netTradeAmount: string;
    settlementValue: string;
    closePrice: string;
  };
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-netted-obligations-summary',
  templateUrl: './netted-obligations-summary.component.html',
  styleUrls: ['./netted-obligations-summary.component.css'],
})
export class NettedObligationsSummaryComponent {
  cusip$ = this.facade.getCusip();
  cusipSearch$ = this.facade.getCusipSearch();
  sortBy$ = this.facade.getSortBy();
  summary$ = this.facade.getSummary();
  longs$ = this.facade.getNetLongs();
  shorts$ = this.facade.getNetShorts();
  closed$ = this.facade.getClosed();
  tradesVisible$ = this.facade.isTradesVisible();
  transactionsVisible$ = this.facade.isTransactionsVisible();

  sortOptions: IDataProvider[] = [
    { label: 'Net Quantity Descending', id: '6' },
    { label: 'Net Trade Amount Descending', id: '7' },
    { label: 'Settlement Amount Descending', id: '8' },
  ];

  constructor(
    private facade: ObligationFacade,
    private currencyPipe: IonCurrencyPipe,
    private numberPipe: IonNumberPipe
  ) {}

  modalOptions = {
    class: 'large-dialog',
  };

  searchModalOptions = {
    class: 'medium-dialog',
  };

  height = window.innerHeight - 10 + 'px';

  columnDefs = [
    {
      colId: '1',
      headerName: 'Trade Details',
      cellClass: 'justifyCenter',
      cellRendererFramework: LinkRendererComponent,
      cellRendererParams: {
        onClick: this.onOpenTrades.bind(this),
      },
      sortable: false,
      width: 75,
    },
    {
      colId: '2',
      headerName: 'Net Obligation ID',
      field: 'netObligationId',
      width: 90,
    },
    {
      colId: '3',
      headerName: 'Security Name',
      field: 'securityName',
      width: 125,
    },
    {
      colId: '4',
      headerName: 'CUSIP',
      field: 'cusip',
      width: 100,
    },
    {
      colId: '5',
      headerName: 'Ticker',
      field: 'ticker',
      width: 75,
    },
    /* {
      colId: '6',
      headerName: 'ISIN',
      field: 'isin',
      width: 90,
    }, */
    {
      colId: '6',
      headerName: 'Net Quantity',
      field: 'netQuantity',
      cellClass: 'alignRight',
      headerClass: 'labelRight',
      valueFormatter: this.formatNetQuantity.bind(this),
      width: 75,
    },
    {
      colId: '7',
      headerName: 'Net Trade Amount',
      field: 'netTradeAmount',
      cellClass: 'alignRight',
      headerClass: 'labelRight',
      valueFormatter: this.formatNetTradeAmount.bind(this),
      width: 125,
    },
    {
      colId: '8',
      headerName: 'Settlement Value',
      field: 'settlementValue',
      cellClass: 'alignRight',
      headerClass: 'labelRight',
      valueFormatter: this.formatSettlementValue.bind(this),
      width: 125,
    },
    {
      colId: '9',
      headerName: 'Settlement Date',
      field: 'settlementDate',
      width: 90,
      sort: 'desc',
    },
    {
      colId: '10',
      headerName: 'Close Price',
      field: 'closePrice',
      cellClass: 'alignRight',
      headerClass: 'labelRight',
      valueFormatter: this.formatClosePrice.bind(this),
      width: 90,
    },
    {
      colId: '11',
      headerName: 'Settlement Status',
      field: 'settlementStatus',
      cellRendererFramework: StatusLinkRendererComponent,
      cellRendererParams: {
        onClick: this.onOpenTransactions.bind(this),
      },
      width: 90,
    },
  ];

  backdrop = false;
  defaultGridHeight = '160px';
  isBasicGrid = false;
  netLongColumnApi = null;
  netLongGridOptions = {
    defaultColDef: {
      sortable: true,
      unSortIcon: true,
    },
    onGridReady: (params) => { this.netLongColumnApi = params.columnApi }
  };

  netShortColumnApi = null;
  netShortGridOptions = {
    defaultColDef: {
      sortable: true,
      unSortIcon: true,
    },
    onGridReady: (params) => { this.netShortColumnApi = params.columnApi }
  };

  closedColumnApi = null;
  closedGridOptions = {
    defaultColDef: {
      sortable: true,
      unSortIcon: true,
    },
    onGridReady: (params) => { this.closedColumnApi = params.columnApi }
  };

  gridConfig = {
    // pagination: true,
    suppressRowHoverHighlight: 'false',
    suppressDragLeaveHidesColumns: true,
    // paginationPageSize: 3,
    // maxPageSize: 4
    components: {
      linkRenderer: LinkRendererComponent,
    },
  };

  closeTrades(): void {
    this.facade.closeTrades();
  }

  closeTransactions(): void {
    this.facade.closeTransactions();
  }

  openCusipDialog(): void {
    this.facade.openCusipSearch();
  }

  onCusipChange(cusip: string): void {
    this.facade.changeCusip(cusip);
  }

  sortGrid(state: any): void {
    this.netLongColumnApi.applyColumnState(state);
    this.netShortColumnApi.applyColumnState(state);
    this.closedColumnApi.applyColumnState(state);
  }

  onSortByChange(sortBy: ObligationSortBy): void {
    this.sortGrid({
      state: [{
        colId: sortBy,
        sort: 'desc'
      }],
      defaultState: {
        sort: null
      }
    });
  }

  onCusipSelect(record: any): void {
    this.facade.changeCusip(record.cusip);
    this.facade.closeCusipSearch();
  }

  closeCusipDialog(): void {
    this.facade.closeCusipSearch();
  }

  onOpenTrades(row: INetObligation): void {
    this.facade.openTrades(row.netObligationId, row.ticker);
  }

  onOpenTransactions(row: INetObligation): void {
    this.facade.openTransactions(row.netObligationId);
  }

  formatSettlementValue(params: RowData): string {
    return this.currencyPipe.transform(params.data.settlementValue, 2);
  }

  formatNetTradeAmount(params: RowData): string {
    return this.currencyPipe.transform(params.data.netTradeAmount, 2);
  }

  formatClosePrice(params: RowData): string {
    return this.currencyPipe.transform(params.data.closePrice, 2);
  }

  formatNetQuantity(params: RowData): string {
    return this.numberPipe.transform(params.data.netQuantity);
  }
}
