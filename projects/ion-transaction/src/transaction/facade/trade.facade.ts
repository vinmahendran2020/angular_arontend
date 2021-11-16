import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  TradeCountChange,
  TradeParticipantIdChange,
  TradeCusipChange,
  TradeDirectionChange,
  TradeSettlementTypeChange,
  TradePageLoaded,
  TradePageDestroyed,
  TradeFormEnterKeyed,
  TradeSummarySearch,
  TradeResetForm,
  TradeDetailSubmit,
} from '../store/actions/trade.actions';
import {
  selectTradeCount,
  selectTradeParticipantId,
  selectTradeCusip,
  selectTradeDirection,
  selectTradeSettlementType,
  selectTradeHasSummary,
  selectTradeFormDisabled,
  selectTradeCounts,
  selectParticipants,
  selectSecurities,
  selectDirections,
  selectSettlementTypes,
  selectTradeSummary,
} from '../store/selectors/trade.selectors';
import { ITradeSummary } from '../types';

@Injectable()
export class TradeFacade {
  constructor(private store: Store) {}

  getTradeCount(): Observable<number> {
    return this.store.select(selectTradeCount);
  }

  changeTradeCount(count: number): void {
    this.store.dispatch(new TradeCountChange(count));
  }

  getParticipantId(): Observable<Array<string>> {
    return this.store.select(selectTradeParticipantId);
  }

  changeParticipantId(participantId: Array<string>): void {
    this.store.dispatch(new TradeParticipantIdChange(participantId));
  }

  getCusip(): Observable<Array<string>> {
    return this.store.select(selectTradeCusip);
  }

  changeCusip(cusip: Array<string>): void {
    this.store.dispatch(new TradeCusipChange(cusip));
  }

  getDirection(): Observable<Array<string>> {
    return this.store.select(selectTradeDirection);
  }

  changeDirection(direction: Array<string>): void {
    this.store.dispatch(new TradeDirectionChange(direction));
  }

  getSettlementType(): Observable<Array<string>> {
    return this.store.select(selectTradeSettlementType);
  }

  changeSettlementType(settlementType: Array<string>): void {
    this.store.dispatch(new TradeSettlementTypeChange(settlementType));
  }

  loadTradeCounts(): Observable<Array<string>> {
    return this.store.select(selectTradeCounts);
  }

  loadParticipants(): Observable<Array<string>> {
    return this.store.select(selectParticipants);
  }

  loadSecurities(): Observable<Array<string>> {
    return this.store.select(selectSecurities);
  }

  loadDirections(): Observable<Array<string>> {
    return this.store.select(selectDirections);
  }

  loadSettlementTypes(): Observable<Array<string>> {
    return this.store.select(selectSettlementTypes);
  }

  loaded(): void {
    this.store.dispatch(new TradePageLoaded());
  }

  destroyed(): void {
    this.store.dispatch(new TradePageDestroyed());
  }

  enter(): void {
    this.store.dispatch(new TradeFormEnterKeyed());
  }

  search(): void {
    this.store.dispatch(new TradeSummarySearch());
  }

  submit(): void {
    this.store.dispatch(new TradeDetailSubmit());
  }

  getHasSummary(): Observable<boolean> {
    return this.store.select(selectTradeHasSummary);
  }

  getSummary(): Observable<ITradeSummary> {
    return this.store.select(selectTradeSummary);
  }

  disableSearch(): Observable<boolean> {
    return this.store.select(selectTradeFormDisabled);
  }

  reset(): void {
    this.store.dispatch(new TradeResetForm());
  }
}
