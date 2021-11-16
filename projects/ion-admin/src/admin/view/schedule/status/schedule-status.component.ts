import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-schedule-status',
  templateUrl: './schedule-status.component.html',
  styleUrls: ['./schedule-status.component.css'],
})
export class ScheduleStatusComponent {
  @Input() type = '';
  @Input() title = '';
  @Input() description = '';
  @Input() message = '';
  @Input() settlementDate = '';
  @Input() progress = false;

  get showDate(): boolean {
    return this.type === 'security';
  }

  get isDisabled(): boolean {
    return this.showDate
      ? !this.settlementDate || this.progress
      : this.progress;
  }

  get alignRun(): string {
    return this.showDate && this.settlementDateTouched && !this.settlementDate
      ? 'center'
      : 'flex-end';
  }

  settlementDateTouched = false;

  @Output() run = new EventEmitter<{ settlementDate?: string }>();
  @Output() settlementDateChange = new EventEmitter<string>();

  onDateChange(date: string): void {
    this.settlementDateTouched = true;
    this.settlementDateChange.emit(date);
  }

  onRun(): void {
    this.run.emit({ settlementDate: this.settlementDate });
  }
}
