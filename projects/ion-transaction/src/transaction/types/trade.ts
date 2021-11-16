export interface ITradeForm {
  readonly count: number;
  readonly participantId: Array<string>;
  readonly cusip: Array<string>;
  readonly direction: Array<string>;
  readonly settlementType: Array<string>;
}

export interface ITrade {
  readonly tradeSequenceNumber: string;
  readonly sendingEntity: string;
  readonly senderSubID: string;
  readonly msqSeqNum: string;
  readonly sendingTime: string;
  readonly securityID: number;
  readonly cusip: string;
  readonly ticker: string;
  readonly shrQty: number;
  readonly unitPrice: number;
  readonly market: string;
  readonly tradeDt: string;
  readonly tradeExecutionTime: string;
  readonly buyInd: string;
  readonly buyClearingBroker: string;
  readonly buyEnteringExecutingBroker: string;
  readonly sellClearingBroker: string;
  readonly sellEnteringExecutingBroker: string;
  readonly noOfClearingInstructions: number;
  readonly specialTradeInd: string;
  readonly sellInd: string;
  readonly settlementType: string;
  readonly beginString: string;
  readonly bodyLength: number;
  readonly msgType: string;
  readonly senderCompID: string;
  readonly targetCompID: string;
  readonly numberOfSides: number;
  readonly noPartyIDs: number;
  readonly partyRole: string;
  readonly checkSum: string;
  readonly miscFeeType: string;
  readonly settlementDays: number;
  readonly buyAcctNumber: string;
  readonly sellAcctNumber: string;
  readonly previouslyReported: string;
  readonly ionEligibility: string;
  readonly securityType: string;
  readonly securityIDSource: string;
  readonly principalTradeAmt: number;
  readonly accruedInterestAmt: number;
  readonly currencyCd: string;
}

export interface ITradeSummary {
  readonly trades: ITrade[];
}

export interface ITradeState {
  readonly form: ITradeForm;
  readonly summary: ITradeSummary | null;
  readonly tradeCounts: Array<string>;
  readonly participants: Array<string>;
  readonly securities: Array<string>;
  readonly directions: Array<string>;
  readonly settlementTypes: Array<string>;
  readonly lastUpdated: Date | null;
  readonly initialLoaded: Date | null;
  readonly pageLoaded: Date | null;
  readonly pageError: string | null;
  readonly pageSuccess: string | null;
}
