import { Component } from '@angular/core';
import { TradeFacade } from '../../../facade/trade.facade';
import { IDataProvider } from '@dtcc-uif/shared';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'ion-trade-search',
  templateUrl: './trade-search.component.html',
  styleUrls: ['./trade-search.component.css']
})
export class TradeSearchComponent {

  constructor(private facade: TradeFacade) { }
  
  count$ = this.facade.getTradeCount();
  participantId$ = this.facade.getParticipantId();
  cusip$ = this.facade.getCusip();
  direction$ = this.facade.getDirection();
  settlementType$ = this.facade.getSettlementType();
  searchDisabled$ = this.facade.disableSearch();

  countProvider$ = this.facade.loadTradeCounts().pipe(map(counts =>  this.convert(counts)));

  participantsProvider$ = this.facade.loadParticipants().pipe(map(participants =>  {
    let temp = Object.assign([], this.convert(participants));
    temp.unshift({ label: 'Select All', id: 'All' });
    return temp;
  }));

  securitiesProvider$ = this.facade.loadSecurities().pipe(map(securities =>  {
    let temp = Object.assign([], this.convert(securities));
    temp.unshift({ label: 'Select All', id: 'All' });
    return temp;
  }));
  
  directionProvider$ = this.facade.loadDirections().pipe(map(directions =>  {
    let temp = Object.assign([], this.convert(directions, true));
    temp.unshift({ label: 'Select All', id: 'All' });
    return temp;
  }));

  settlementTypeProvider$ = this.facade.loadSettlementTypes().pipe(map(settlementTypes =>  {
    let temp = Object.assign([], this.convert(settlementTypes, true));
    temp.unshift({ label: 'Select All', id: 'All' });
    return temp;
  }));

  convert(list: Array<string>, initCap?: boolean): IDataProvider[]  {
    return list.map((val) => ({ label: (initCap) ? val.charAt(0).toUpperCase() + val.slice(1) : val, id: val}));
  }

  onTradeCountChange(count: number): void {
    this.facade.changeTradeCount(count);
  }

  onParticipantIdChange(participant: Array<string>): void {
    this.facade.changeParticipantId(participant);
  }

  onCusipChange(cusip: Array<string>): void {
    this.facade.changeCusip(cusip);
  }

  onDirectionChange(direction: Array<string>): void {
    this.facade.changeDirection(direction);
  }

  onSettlementTypeChange(settlementType: Array<string>): void {
    this.facade.changeSettlementType(settlementType);
  }

  enter(): void {
    this.facade.enter();
  }

  search(): void {
    this.facade.search();
  }

  reset(): void {
    this.facade.reset();
  }

}
