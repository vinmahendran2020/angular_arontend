import { Component } from '@angular/core';
import { ObligationFacade } from '../../../facade/obligation.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-obligation-summary',
  templateUrl: './obligation-summary.component.html',
  styleUrls: ['./obligation-summary.component.css'],
})
export class ObligationSummaryComponent {
  obligations$ = this.facade.getFilteredObligations();

  constructor(private facade: ObligationFacade) {}

  columnDefs = [
    {
      colId: '1',
      headerName: 'Transaction ID',
      field: 'transactionId',
      width: 150,
    },
    {
      colId: '2',
      headerName: 'Parent ID',
      field: 'parentId',
      width: 150,
    },
    {
      colId: '3',
      headerName: 'Participant ID',
      field: 'participantId',
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
      headerName: 'Direction',
      field: 'direction',
      width: 150,
    },
    {
      colId: '7',
      headerName: 'Net Quantity',
      field: 'quantity',
      width: 150,
    },
    {
      colId: '8',
      headerName: 'Net Trade Amount',
      field: 'amount',
      width: 150,
    },
    {
      colId: '9',
      headerName: 'Net Settlement Value',
      field: 'settlementValue',
      width: 150,
    },
    {
      colId: '10',
      headerName: 'Settlement Date',
      field: 'settlementDate',
      width: 150,
    },
    {
      colId: '11',
      headerName: 'Close Price',
      field: 'closePrice',
      width: 150,
    },
    {
      colId: '12',
      headerName: 'Settlement Status',
      field: 'settlementStatus',
      width: 150,
    },
    {
      colId: '13',
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
