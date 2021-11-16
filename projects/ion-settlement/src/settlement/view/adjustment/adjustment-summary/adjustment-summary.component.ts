import { Component } from '@angular/core';
import { AdjustmentFacade } from '../../../facade/adjustment.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-adjustment-summary',
  templateUrl: './adjustment-summary.component.html',
  styleUrls: ['./adjustment-summary.component.css'],
})
export class AdjustmentSummaryComponent {
  adjustments$ = this.facade.getFilteredAdjustments();

  constructor(private facade: AdjustmentFacade) {}

  columnDefs = [
    {
      colId: '1',
      headerName: 'Partcipant ID',
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
      headerName: 'CCA Settlement Date',
      field: 'settlementDate',
      width: 150,
    },
    {
      colId: '4',
      headerName: 'Credit/Debit',
      field: 'action',
      width: 150,
    },
    {
      colId: '5',
      headerName: 'Net CCA Amount',
      field: 'amount',
      width: 150,
    },
    {
      colId: '6',
      headerName: 'CCA Status',
      field: 'status',
      width: 150,
    },
    {
      colId: '7',
      headerName: 'Creation Date',
      field: 'creationDate',
      width: 150,
    },
    {
      colId: '8',
      headerName: 'Creation Time',
      field: 'creationTime',
      width: 150,
    }
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
