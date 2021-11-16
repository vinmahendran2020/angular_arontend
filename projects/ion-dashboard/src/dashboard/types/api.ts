export interface IParticipant {
  partId: string;
  partName: string;
  status: string;
  partMSegInd: string;
  testPartInd: string;
  createDate: string;
  lastUpdateDate: string;
  collGrpId: string;
}

export interface ISettlement {
  settlement: {
    broker: string;
    creditBalance: number;
    debitBalance: number;
    netBalance: number;
    dtccBroker: string;
    netDirection: string;
    participantAccountId: string;
  },
  risk: {
    collGrpId: string;
    debitCapAmt: number;
    collMntrAmt: number;
    valueAtRisk: number;
  }
}

export interface IPosition {
  securityName: string;
  cusip: string;
  ticker: string;
  position: {
    partId: string;
    naQty: number;
    maQty: number;
    msegQty: number;
    pledgeQty: number;
    createTimeStamp: string;
    updateTimeStamp: string;
  };
}

export interface IObligationResponse {
  netObligationId: string;
  securityName: string;
  cusip: string;
  ticker: string;
  isin: null;
  participantAccountId: string;
  netQuantity: number;
  netTradeAmount: number;
  settlementValue: number;
  settlementDate: string;
  closePrice: number;
  tradeDirectionInd: string;
  settlementStatus: string;
}

export interface INetCCAResponse {
  ccaId: string;
  ccaSettlementDate: string;
  ccaDirection: string;
  netCCAAmount: number;
  ccaStatus: string;
}

export interface ICCAResponse {
  nettedObligationId: string;
  cusip: string;
  ticker: string;
  ccaAmount: number;
  netBuyOrSell: string;
  netQuantity: number;
  closePrice: number;
  netTradeAmount: number;
  nettedObligationStatus: string;
  ccaDirection: string;
}

export interface IObligationTradeResponse {
  tradeId: string;
  buyer: string;
  nettedObligationId: string;
  novatedStatus: string;
  participantAccountId: string;
  participants: string[];
  principalTradeAmount: number;
  quantity: number;
  securityId: string;
  seller: string;
  settlementDate: string;
  tradePrice: number;
  type: string;
  market: string;
  tradeDate: string;
}
