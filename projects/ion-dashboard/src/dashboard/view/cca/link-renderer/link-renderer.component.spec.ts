import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkRendererComponent } from './link-renderer.component';

describe('LinkRendererComponent', () => {
  let component: LinkRendererComponent;
  let fixture: ComponentFixture<LinkRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinkRendererComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkRendererComponent);
    component = fixture.componentInstance;
    component.params = { value: 'Fixed' };
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
