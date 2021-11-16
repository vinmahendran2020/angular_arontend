import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ScheduleViewerComponent } from './schedule-viewer.component';

describe('ScheduleViewerComponent', () => {
  let component: ScheduleViewerComponent;
  let fixture: ComponentFixture<ScheduleViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScheduleViewerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleViewerComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.recurrenceText).toBe('');
    expect(component.checked).toBe(false);
  });

  it('should emit event with message on edit', () => {
    spyOn(component.edit, 'emit');

    const button = fixture.debugElement.query(By.css('button[class*="edit"]'));
    button.triggerEventHandler('click', null);

    expect(component.edit.emit).toHaveBeenCalled();
  });

  it('should emit event with message on toggle', () => {
    spyOn(component.toggle, 'emit');

    const input = fixture.debugElement.query(
      By.css('input[class*="custom-control-input"]')
    );
    input.triggerEventHandler('change', { target: { checked: true } });

    expect(component.toggle.emit).toHaveBeenCalled();
  });

  it('should return recurrenceText for every hour', () => {
    component.schedule = {
      scheduleType: 'Netting',
      startTime: '5:00AM',
      endTime: '9:00PM',
      timezone: 'US/Hawaii',
      hours: 2,
      minutes: 40,
      status: 'ACTIVE',
    };

    expect(component.recurrenceText).toBe(
      'Trigger every 2 hours and 40 minutes.'
    );
  });

  it('should return recurrenceText for every hour', () => {
    component.schedule = {
      scheduleType: 'Netting',
      startTime: '5:00AM',
      endTime: '9:00PM',
      timezone: 'US/Hawaii',
      hours: 0,
      minutes: 0,
      status: 'ACTIVE',
    };

    expect(component.recurrenceText).toBe('Trigger once at the start of day.');
  });

  it('should return checked true', () => {
    component.schedule = {
      scheduleType: 'Netting',
      startTime: '5:00AM',
      endTime: '9:00PM',
      timezone: 'US/Hawaii',
      hours: 2,
      minutes: 40,
      status: 'ACTIVE',
    };

    expect(component.checked).toBe(true);
  });
});
