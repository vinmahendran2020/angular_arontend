import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ISchedule } from '../../../../types';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-daily-schedule-viewer',
  templateUrl: './daily-schedule-viewer.component.html',
  styleUrls: ['./daily-schedule-viewer.component.css'],
})
export class DailyScheduleViewerComponent {
  @Input() type = '';
  @Input() title = '';
  @Input() message = '';
  @Input() schedule: ISchedule;

  @Output() edit = new EventEmitter<boolean>();

  @Output() toggle = new EventEmitter<boolean>();

  @Output() clear = new EventEmitter<void>();

  timezones = {
    'America/New_York': 'EST',
    'Pacific/Honolulu': 'US/Hawaii',
    'Asia/Kolkata': 'IST',
    'UTC': 'UTC'
  }

  get checked(): boolean {
    return this.schedule?.status === 'ACTIVE';
  }

  get disabled(): boolean {
    return !this.checked;
  }

  get recurrenceText(): string {
    if (!this.schedule) {
      return '';
    } else {
      return 'Trigger once at the start time.';
    }
  }

  get timezone(): string {
    return this.timezones[this.schedule?.timezone] || ""; 
  }
}
