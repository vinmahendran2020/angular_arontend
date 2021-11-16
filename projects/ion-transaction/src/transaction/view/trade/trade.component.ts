import { Component, OnInit } from '@angular/core';
import { TradeFacade } from '../../facade/trade.facade';

@Component({
  selector: 'ion-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {

  constructor(private facade: TradeFacade) {}

  hasSummary$ = this.facade.getHasSummary();

  summary$ = this.facade.getSummary();

  ngOnInit(): void {
    this.facade.loaded();
  }

  ngOnDestroy(): void {
    this.facade.destroyed();
  }
  
}
