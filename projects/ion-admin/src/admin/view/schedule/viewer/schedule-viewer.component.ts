import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ISchedule } from '../../../types';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-schedule-viewer',
  templateUrl: './schedule-viewer.component.html',
  styleUrls: ['./schedule-viewer.component.css'],
})
export class ScheduleViewerComponent {
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
    }
    const { hours, minutes } = this.schedule;
    if (hours === 0 && minutes === 0) {
      return 'Trigger once at the start of day.';
    }
    return `Trigger every ${hours} hours and ${minutes} minutes.`;
  }

  get timezone(): string {
    return this.timezones[this.schedule?.timezone] || ""; 
  }
}
