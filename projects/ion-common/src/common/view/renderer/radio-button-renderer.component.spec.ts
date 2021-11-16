import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgGridModule } from 'ag-grid-angular';

import { RadioButtonRendererComponent } from './radio-button-renderer.component';

describe('RadioButtonRendererComponent', () => {
  let component: RadioButtonRendererComponent;
  let fixture: ComponentFixture<RadioButtonRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgGridModule.withComponents([])],
      declarations: [RadioButtonRendererComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioButtonRendererComponent);
    component = fixture.componentInstance;
    component.params = {
      data: { selected: false },
      onClick(selected: {}): void {},
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should agInit', () => {
    const params = {
      data: { selected: false },
      onClick(selected: {}): void {},
    };
    component.agInit(params);
    expect(component.params).toEqual(params);
  });

  it('should refresh', () => {
    const refresh = component.refresh({});
    expect(refresh).toBeTruthy();
  });

  it('should handle click event', () => {
    component.handleChange({});

    component.params = {
      data: {
        selected: false,
      },
      onClick: (event: any) => true,
    };
    component.handleChange({});

    expect(component).toBeTruthy();
  });

  it('should handle no click event', () => {
    component.handleChange({});

    component.params = {
      data: {
        selected: false,
      },
      onClick: null,
    };
    component.handleChange({});

    expect(component).toBeTruthy();
  });
});
