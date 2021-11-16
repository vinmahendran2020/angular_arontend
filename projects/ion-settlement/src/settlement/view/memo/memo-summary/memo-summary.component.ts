import { Component } from '@angular/core';
import { MemoFacade } from '../../../facade/memo.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-memo-summary',
  templateUrl: './memo-summary.component.html',
  styleUrls: ['./memo-summary.component.css'],
})
export class MemoSummaryComponent {
  memos$ = this.facade.getFilteredMemos();

  constructor(private facade: MemoFacade) {}

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
      headerName: 'CUSIP Name',
      field: 'cusipName',
      width: 150,
    },
    {
      colId: '4',
      headerName: 'CUSIP',
      field: 'cusipId',
      width: 150,
    },
    {
      colId: '5',
      headerName: 'Action',
      field: 'action',
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
