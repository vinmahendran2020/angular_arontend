import { Component, Input, OnInit } from '@angular/core';
import { ShellFacade } from '../../facade/shell.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-shell-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent implements OnInit {
  @Input()
  titles: string[];

  cash$ = this.facade.getCashInterval();

  hasCash$ = this.facade.getHasCashInterval();

  netting$ = this.facade.getNettingInterval();

  hasNetting$ = this.facade.getHasNettingInterval();

  security$ = this.facade.getSecurityInterval();

  hasSecurity$ = this.facade.getHasSecurityInterval();

  constructor(private facade: ShellFacade) {}

  ngOnInit(): void {
    this.facade.intervals();
  }
}
