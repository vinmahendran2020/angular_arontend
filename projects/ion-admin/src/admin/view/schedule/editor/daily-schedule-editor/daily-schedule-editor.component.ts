import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDataProvider } from '@dtcc-uif/shared';
import { ISchedule } from '../../../../types/schedule';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-daily-schedule-editor',
  templateUrl: './daily-schedule-editor.component.html',
  styleUrls: ['./daily-schedule-editor.component.css'],
})
export class DailyScheduleEditorComponent implements OnInit {
  timeslots: IDataProvider[] = [
    '12:00AM',
    ...Array.from({ length: 11 }, (_, index) => `${index + 1}:00AM`),
    '12:00PM',
    ...Array.from({ length: 11 }, (_, index) => `${index + 1}:00PM`),
  ].map((time) => ({
    label: time,
    id: time,
  }));

  timezones: IDataProvider[] = [
    { label: 'EST', id: 'America/New_York' },
    { label: 'US/Hawaii', id: 'Pacific/Honolulu' },
    { label: 'IST', id: 'Asia/Kolkata' },
    { label: 'UTC', id: 'UTC' },
  ];

  triggers: IDataProvider[] = [
    { label: 'Trigger once at the start time.', id: 'hh:mm' },
  ];

  @Input() schedule: ISchedule;

  startTime = '';
  endTime = '';
  timezone = '';
  recurrence = '';

  hours = '';
  minutes = '';

  // tslint:disable-next-line:no-output-native
  @Output() submit = new EventEmitter<ISchedule>();

  ngOnInit(): void {
    if (this.schedule) {
      this.startTime = this.schedule.startTime;
      this.endTime = this.schedule.startTime;
      this.timezone = this.schedule.timezone;
    }
    const { hours, minutes } = this.schedule || { hours: 0, minutes: 0 };
    if (hours === 0 && minutes === 0) {
      this.recurrence = '00:00';
    } else {
      this.hours = `${hours}`;
      this.minutes = `${minutes}`;
      this.recurrence = 'hh:mm';
    }
  }

  onSubmit(): void {
    // timeout due to dtcc-textbox two way binding sync delay on focusout
    setTimeout(() => {
      const schedule: ISchedule = {
        ...this.schedule,
        startTime: this.startTime,
        endTime: this.startTime,
        timezone: this.timezone,
        hours:
          this.recurrence === '00:00'
            ? 24
            : this.parseInt(this.hours, 0, (v) => v > 0 && v < 24),
        minutes:
          this.recurrence === '00:00'
            ? 0
            : this.parseInt(this.minutes, 0, (v) => v > 0 && v < 60),
      };
      this.submit.emit(schedule);
    }, 200);
  }

  parseInt(value: string, def: number, check: (v: number) => boolean): number {
    const num = parseInt(value, 10);
    if (Number.isNaN(num) || !check(num)) {
      return def;
    }
    return num;
  }
}
