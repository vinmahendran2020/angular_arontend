import { Component } from '@angular/core';
import { MovementFacade } from '../../../facade/movement.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-movement-summary',
  templateUrl: './movement-summary.component.html',
  styleUrls: ['./movement-summary.component.css'],
})
export class MovementSummaryComponent {
  movements$ = this.facade.getFilteredMovements();

  constructor(private facade: MovementFacade) {}

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
      headerName: 'Deposit/Withdraw',
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
