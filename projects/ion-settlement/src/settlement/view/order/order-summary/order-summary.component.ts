import { Component } from '@angular/core';
import { OrderFacade } from '../../../facade/order.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css'],
})
export class OrderSummaryComponent {
  orders$ = this.facade.getFilteredOrders();

  constructor(private facade: OrderFacade) {}

  columnDefs = [
    {
      colId: '1',
      headerName: 'Transaction ID',
      field: 'transactionId',
      width: 150,
    },
    {
      colId: '2',
      headerName: 'Deliverer ID',
      field: 'delivererId',
      width: 150,
    },
    {
      colId: '3',
      headerName: 'Receiver ID',
      field: 'receiverId',
      width: 150,
    },
    {
      colId: '4',
      headerName: 'CUSIP Name',
      field: 'cusipName',
      width: 150,
    },
    {
      colId: '5',
      headerName: 'CUSIP',
      field: 'cusipId',
      width: 150,
    },
    {
      colId: '6',
      headerName: 'Quantity',
      field: 'quantity',
      width: 150,
    },
    {
      colId: '7',
      headerName: 'Amount',
      field: 'amount',
      width: 150,
    },
    {
      colId: '8',
      headerName: 'Prefunded',
      field: 'prefunded',
      width: 150,
    },
    {
      colId: '9',
      headerName: 'Settlement Date',
      field: 'settlementDate',
      width: 150,
    },
    {
      colId: '10',
      headerName: 'Settlement Status',
      field: 'settlementStatus',
      width: 150,
    },
    {
      colId: '11',
      headerName: 'Pending Reason',
      field: 'pendingReason',
      width: 150,
    },
  ];

  backdrop = false;
  defaultGridHeight = '100%';
  isBasicGrid = true;
  gridOptions = {};
  gridConfig = {
    // pagination: true,
    suppressRowHoverHighlight: 'false',
    suppressDragLeaveHidesColumns: true,
    // paginationPageSize: 3,
    // maxPageSize: 4
  };
}
