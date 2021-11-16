import { Component, OnDestroy, OnInit } from '@angular/core';
import { NettingFacade } from '../../facade/netting.facade';
import { ISchedule } from '../../types/schedule';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-admin-netting',
  templateUrl: './netting.component.html',
  styleUrls: ['./netting.component.css'],
})
export class NettingComponent implements OnInit, OnDestroy {
  modalOptions = {
    class: 'large-dialog edit-schedule',
  };

  progress$ = this.facade.getProgress();
  inProgressMessage$ = this.facade.getInProgressMessage();
  schedule$ = this.facade.getSchedule();
  edit$ = this.facade.getEditing();
  submitMessage$ = this.facade.getSubmitMessage();

  constructor(private facade: NettingFacade) {}

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

  onMessageClear(): void {
    this.facade.closeCommitMessage();
  }
}
