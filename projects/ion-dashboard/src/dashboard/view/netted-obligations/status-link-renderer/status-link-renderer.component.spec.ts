import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusLinkRendererComponent } from './status-link-renderer.component';

describe('StatusLinkRendererComponent', () => {
  let component: StatusLinkRendererComponent;
  let fixture: ComponentFixture<StatusLinkRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatusLinkRendererComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusLinkRendererComponent);
    component = fixture.componentInstance;
    component.params = { value: 'Pending ' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should agInit', () => {
    const params = { onClick: () => {}, node: { data: { x: 100 } } };
    component.agInit(params);
    expect(component.params).toEqual(params);
  });

  it('should refresh', () => {
    const value = component.refresh();
    expect(value).toBe(true);
  });

  it('should onClick', (done) => {
    let preventCalled = false;
    const params = {
      onClick: (data) => {
        expect(preventCalled).toBe(true);
        expect(data).toEqual({ x: 100 });
        done();
      },
      node: { data: { x: 100 } },
    };
    component.agInit(params);
    component.onClick({
      preventDefault(): void {
        preventCalled = true;
      },
    });
  });

  it('should onClick', () => {
    let preventCalled = false;
    const params = {
      onClick: null,
      node: { data: { x: 100 } },
    };
    component.agInit(params);
    component.onClick({
      preventDefault(): void {
        preventCalled = true;
      },
    });
    expect(preventCalled).toBe(true);
  });
});
