import { Component, Input } from '@angular/core';
import { IonCurrencyPipe } from 'ion-common';
import { TradeFacade } from '../../../facade/trade.facade';
import { ITradeSummary } from '../../../types';

import moment from 'moment';

type RowData = {
  data: {
    tradeSequenceNumber: string;
    sendingEntity: string;
    senderSubID: string;
    msqSeqNum: string;
    sendingTime: string;
    securityID: number;
    cusip: string;
    ticker: string;
    shrQty: number;
    unitPrice: number;
    market: string;
    tradeDt: string;
    tradeExecutionTime: string;
    buyInd: string;
    buyClearingBroker: string;
    buyEnteringExecutingBroker: string;
    sellClearingBroker: string;
    sellEnteringExecutingBroker: string;
    noOfClearingInstructions: number;
    specialTradeInd: string;
    sellInd: string;
    settlementType: string;
    beginString: string;
    bodyLength: number;
    msgType: string;
    senderCompID: string;
    targetCompID: string;
    numberOfSides: number;
    noPartyIDs: number;
    partyRole: string;
    checkSum: string;
    miscFeeType: string;
    settlementDays: number;
    buyAcctNumber: string;
    sellAcctNumber: string;
    previouslyReported: string;
    ionEligibility: string;
    securityType: string;
    securityIDSource: string;
    principalTradeAmt: number;
    accruedInterestAmt: number;
    currencyCd: string;
  };
};

@Component({
  selector: 'ion-trade-summary',
  templateUrl: './trade-summary.component.html',
  styleUrls: ['./trade-summary.component.css']
})
export class TradeSummaryComponent {

  @Input()
  summary: ITradeSummary;

  constructor(private facade: TradeFacade, private currencyPipe: IonCurrencyPipe) { }

  settlementTypeMap = { "3": "T+0", "2": "T+1", "0": "T+2" };

  columnDefs = [
    {
      colId: '1',
      headerName: 'Trade ID',
      field: 'tradeSequenceNumber',
      width: 150,
    },
    {
      colId: '2',
      headerName: 'Buy Clearing Broker',
      field: 'buyClearingBroker',
      width: 150,
    },
    {
      colId: '3',
      headerName: 'Sell Clearing Broker',
      field: 'sellClearingBroker',
      width: 150,
    },
    {
      colId: '4',
      headerName: 'CUSIP',
      field: 'cusip',
      width: 150,
    },
    {
      colId: '5',
      headerName: 'Ticker',
      field: 'ticker',
      width: 75,
    },
    {
      colId: '6',
      headerName: 'Share Quantity',
      field: 'shrQty',
      headerClass: 'labelRightRPad15',
      cellClass: 'alignRightRPad30',
      width: 150,
    },
    {
      colId: '7',
      headerName: 'Trade Price',
      field: 'unitPrice',
      headerClass: 'labelRightRPad15',
      cellClass: 'alignRightRPad30',
      valueFormatter: this.formatTradePrice.bind(this),
      width: 150,
    },
    {
      colId: '8',
      headerName: 'Trade Amount',
      field: 'principalTradeAmt',
      headerClass: 'labelRightRPad15',
      cellClass: 'alignRightRPad30',
      valueFormatter: this.formatTradeAmount.bind(this),
      width: 150,
    },
    {
      colId: '9',
      headerName: 'Trade Date',
      field: 'tradeDt',
      width: 125,
      valueFormatter: this.formatTradeDate.bind(this)
    },
    {
      colId: '10',
      headerName: 'Settlement Type',
      field: 'settlementType',
      valueFormatter: this.formatSettlementType.bind(this),
      width: 125,
    }
  ];

  backdrop = false;
  defaultGridHeight = '200px';
  isBasicGrid = false;
  showExportButton = true;
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
  };

  submit(): void {
    this.facade.submit();
  }

  formatTradePrice(params: RowData): string {
    return this.currencyPipe.transform(params.data.unitPrice, 2);
  };

  formatTradeAmount(params: RowData): string {
    return this.currencyPipe.transform(params.data.principalTradeAmt, 2);
  }

  formatSettlementType(params: RowData): string {
    return { "3": "T+0", "2": "T+1", "0": "T+2" }[params.data.settlementType];
  }

  formatTradeDate(params: RowData): string {
    return moment(params.data.tradeDt, "YYYYMMDD").format("MM/DD/YYYY");
  }

}
