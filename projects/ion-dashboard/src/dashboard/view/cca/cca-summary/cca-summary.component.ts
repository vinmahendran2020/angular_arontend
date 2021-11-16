import { Component, Input } from '@angular/core';
import { IonCurrencyPipe } from 'ion-common';
import { CCAFacade } from '../../../facade/cca.facade';
import { ICCASummary, IClearingCashAdjustment } from '../../../types';
import { LinkRendererComponent } from '../link-renderer/link-renderer.component';

type RowData = {
  data: {
    ccaId: string;
    settlementDate: string;
    debitCredit: string;
    netCCAAmount: number;
    settlementStatus: string;
  };
};

@Component({
  selector: 'ion-cca-summary',
  templateUrl: './cca-summary.component.html',
  styleUrls: ['./cca-summary.component.css']
})
export class CCASummaryComponent {

  @Input()
  summary: ICCASummary;
  detailVisible$ = this.facade.isDetailVisible();

  constructor(
    private facade: CCAFacade,
    private currencyPipe: IonCurrencyPipe
  ) {}

  columnDefs = [
    {
      colId: '1',
      headerName: 'CCA Netted Obligations Details',
      headerClass: 'labelCenter',
      cellClass: 'justifyCenter',
      cellRendererFramework: LinkRendererComponent,
      cellRendererParams: {
        onClick: this.onOpenDetail.bind(this),
      },
      sortable: false,
    },
    {
      colId: '2',
      headerName: 'CCA ID',
      field: 'ccaId',
    },
    {
      colId: '3',
      headerName: 'Settlement Date',
      field: 'settlementDate',
    },
    {
      colId: '4',
      headerName: 'Debit / Credit',
      field: 'debitCredit',
      width: 70,
    },
    {
      colId: '5',
      headerName: 'Net CCA Amount',
      field: 'netCCAAmount',
      headerClass: 'labelRightRPad20',
      cellClass: 'alignRightRPad30',
      valueFormatter: this.formatNetCCAAmount.bind(this),
    },
    {
      colId: '6',
      headerName: 'Settlement Status',
      field: 'settlementStatus',
      headerClass: 'lPadHeader20',
      cellClass: 'lPadCell30'
    }
  ];

  backdrop = false;
  defaultGridHeight = '160px';
  isBasicGrid = false;
  gridOptions = {
    defaultColDef: {
      sortable: true,
      unSortIcon: true
    }
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

  formatNetCCAAmount(params: RowData): string {
    return this.currencyPipe.transform(params.data.netCCAAmount, 2);
  }

  onOpenDetail(row: IClearingCashAdjustment): void {
    this.facade.openDetail(row.ccaId);
  }

  closeDetail(): void {
    this.facade.closeDetail();
  }

}
