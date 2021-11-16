import { Component } from '@angular/core';
import { CashFacade } from '../../../facade/cash.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-cash-summary',
  templateUrl: './cash-summary.component.html',
  styleUrls: ['./cash-summary.component.css'],
})
export class CashSummaryComponent {
  cashs$ = this.facade.getFilteredCashs();

  constructor(private facade: CashFacade) {}

  columnDefs = [
    {
      colId: '1',
      headerName: 'Participant ID',
      field: 'participantId',
      width: 150,
    },
    {
      colId: '2',
      headerName: 'Transaction ID',
      field: 'transactionId',
      width: 150,
    },
    {
      colId: '3',
      headerName: 'Credit/Debit',
      field: 'action',
      width: 150,
    },
    {
      colId: '4',
      headerName: 'Amount',
      field: 'amount',
      width: 150,
    },
    {
      colId: '5',
      headerName: 'Date',
      field: 'date',
      width: 150,
    },
    {
      colId: '6',
      headerName: 'Time',
      field: 'time',
      width: 150,
    },
    {
      colId: '7',
      headerName: 'Status',
      field: 'status',
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
