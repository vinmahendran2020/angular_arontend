import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ScheduleStatusComponent } from './schedule-status.component';

describe('ScheduleStatusComponent', () => {
  let component: ScheduleStatusComponent;
  let fixture: ComponentFixture<ScheduleStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScheduleStatusComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return isDisabled netting no', () => {
    component.type = 'netting';
    component.settlementDate = null;
    component.progress = false;
    expect(component.isDisabled).toBe(false);
  });

  it('should return isDisabled netting yes', () => {
    component.type = 'netting';
    component.settlementDate = null;
    component.progress = true;
    expect(component.isDisabled).toBe(true);
  });

  it('should return isDisabled cash yes 1', () => {
    component.type = 'cash';
    component.settlementDate = null;
    component.progress = false;
    expect(component.isDisabled).toBe(false);
  });

  it('should return isDisabled cash yes 2', () => {
    component.type = 'cash';
    component.settlementDate = null;
    component.progress = true;
    expect(component.isDisabled).toBe(true);
  });

  it('should return isDisabled cash yes 3', () => {
    component.type = 'cash';
    component.settlementDate = '12/10/2020';
    component.progress = true;
    expect(component.isDisabled).toBe(true);
  });

  it('should return isDisabled cash no 1', () => {
    component.type = 'cash';
    component.settlementDate = '12/10/2020';
    component.progress = false;
    expect(component.isDisabled).toBe(false);
  });

  it('should return isDisabled security yes 1', () => {
    component.type = 'security';
    component.settlementDate = null;
    component.progress = false;
    expect(component.isDisabled).toBe(true);
  });

  it('should return isDisabled security yes 2', () => {
    component.type = 'security';
    component.settlementDate = null;
    component.progress = true;
    expect(component.isDisabled).toBe(true);
  });

  it('should return isDisabled security yes 3', () => {
    component.type = 'security';
    component.settlementDate = '12/10/2020';
    component.progress = true;
    expect(component.isDisabled).toBe(true);
  });

  it('should return isDisabled security no 1', () => {
    component.type = 'security';
    component.settlementDate = '12/10/2020';
    component.progress = false;
    expect(component.isDisabled).toBe(false);
  });

  it('should return alignRun cash flex-end', () => {
    component.type = 'cash';
    expect(component.alignRun).toBe('flex-end');
  });

  it('should return alignRun security flex-end', () => {
    component.type = 'security';
    expect(component.alignRun).toBe('flex-end');
  });

  it('should return alignRun netting flex-end', () => {
    component.type = 'netting';
    expect(component.alignRun).toBe('flex-end');
  });

  it('should return alignRun settlementDate flex-end', () => {
    component.type = 'netting';
    component.settlementDate = '';
    expect(component.alignRun).toBe('flex-end');
  });

  it('should return alignRun settlementDate flex-end', () => {
    component.type = 'netting';
    component.settlementDate = '2020-12-20';
    expect(component.alignRun).toBe('flex-end');
  });

  it('should return alignRun settlementDate flex-end', () => {
    component.type = 'cash';
    component.settlementDate = '';
    expect(component.alignRun).toBe('flex-end');
  });

  it('should emit event with on run', () => {
    spyOn(component.run, 'emit');

    const button = fixture.debugElement.query(By.css('button[class*="run"]'));
    button.triggerEventHandler('click', null);

    expect(component.run.emit).toHaveBeenCalled();
  });

  it('should emit event with on date change', () => {
    spyOn(component.settlementDateChange, 'emit');
    component.onDateChange('2020-12-20');
    expect(component.settlementDateTouched).toBe(true);
    expect(component.settlementDateChange.emit).toHaveBeenCalled();
  });
});
