import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let formEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    formEl = fixture.debugElement.query(By.css('.form'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event with enter', () => {
    spyOn(component.enter, 'emit');
    formEl.triggerEventHandler('keydown.enter', null);

    expect(component.enter.emit).toHaveBeenCalled();
  });
});
