import { Component, OnDestroy, OnInit } from '@angular/core';
import { StartFacade } from '../../facade/start.facade';
import { ISchedule } from '../../types/schedule';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-admin-start-of-day',
  templateUrl: './start-of-day.component.html',
  styleUrls: ['./start-of-day.component.css'],
})
export class StartOfDayComponent implements OnInit, OnDestroy {
  modalOptions = {
    class: 'large-dialog edit-schedule',
  };

  progress$ = this.facade.getProgress();
  inProgressMessage$ = this.facade.getInProgressMessage();
  settlementDate$ = this.facade.getSettlementDate();
  schedule$ = this.facade.getSchedule();
  edit$ = this.facade.getEditing();

  submitMessage$ = this.facade.getSubmitMessage();

  constructor(private facade: StartFacade) {}

  ngOnInit(): void {
    this.facade.loaded();
  }

  ngOnDestroy(): void {
    this.facade.destroyed();
  }

  openEdit(): void {
    this.facade.openEdit();
  }

  closeEdit(): void {
    this.facade.closeEdit();
  }

  submitEdit(schedule: ISchedule): void {
    this.facade.submit(schedule);
  }

  onRun(): void {
    this.facade.run();
  }

  onToggle(checked: boolean): void {
    this.facade.toggle(checked);
  }

  onSettlementDateChange(settlementDate: string): void {
    this.facade.changeSettlementDate(settlementDate);
  }

  onMessageClear(): void {
    this.facade.closeCommitMessage();
  }
}
