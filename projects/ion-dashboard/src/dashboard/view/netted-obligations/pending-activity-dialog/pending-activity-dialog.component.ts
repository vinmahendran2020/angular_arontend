import { Component } from '@angular/core';
import { IonCurrencyPipe, IonNumberPipe } from 'ion-common';
import { ObligationFacade } from '../../../facade/obligation.facade';
import { TransactionPendingActionComponent } from '../transaction-pending-action/transaction-pending-action.component';

type RowData = {
  data: {
    quantity: string;
    tradeAmount: string;
  };
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-pending-activity-dialog',
  templateUrl: './pending-activity-dialog.component.html',
  styleUrls: ['./pending-activity-dialog.component.css'],
})
export class PendingActivityDialogComponent {
  obligation$ = this.facade.getSelectedPending();
  transactions$ = this.facade.getTransactions();

  constructor(
    private facade: ObligationFacade,
    private currencyPipe: IonCurrencyPipe,
    private numberPipe: IonNumberPipe
  ) {}

  columnDefs = [
    {
      colId: '1',
      headerName: '',
      field: 'status',
      width: 50,
      cellRendererFramework: TransactionPendingActionComponent,
      cellRendererParams: {},
    },
    {
      colId: '2',
      headerName: 'Transaction ID',
      field: 'transactionId',
      width: 150,
    },
    {
      colId: '3',
      headerName: 'CUSIP',
      field: 'cusip',
      width: 100,
    },
    {
      colId: '4',
      headerName: 'Contra',
      field: 'contra',
      width: 100,
    },
    {
      colId: '5',
      headerName: 'Deliverer / Receiver',
      field: 'deliverReceiver',
      width: 135,
    },
    {
      colId: '6',
      headerName: 'Quantity',
      field: 'quantity',
      width: 100,
      cellClass: 'alignRight',
      headerClass: 'labelRight',
      valueFormatter: this.formatQuantity.bind(this),
    },
    {
      colId: '7',
      headerName: 'Trade Amount',
      field: 'tradeAmount',
      width: 125,
      cellClass: 'alignRight',
      headerClass: 'labelRight',
      valueFormatter: this.formatTradeAmount.bind(this),
    },
    {
      colId: '8',
      headerName: 'Status',
      field: 'status',
      width: 100,
    },
    {
      colId: '9',
      headerName: 'Activity',
      field: 'activity',
      width: 100,
    },
    {
      colId: '10',
      headerName: 'Source',
      field: 'source',
      width: 100,
    },
    {
      colId: '11',
      headerName: 'Reason',
      field: 'reason',
      width: 80,
    },
  ];

  backdrop = false;
  defaultGridHeight = '130px';
  isBasicGrid = true;
  gridOptions = {
    // domLayout: 'autoHeight'
  };
  gridConfig = {
    // pagination: true,
    suppressRowHoverHighlight: 'false',
    suppressDragLeaveHidesColumns: true,
    // paginationPageSize: 3,
    // maxPageSize: 4
  };

  formatTradeAmount(params: RowData): string {
    return this.currencyPipe.transform(params.data.tradeAmount);
  }

  formatQuantity(params: RowData): string {
    return this.numberPipe.transform(params.data.quantity);
  }
}
