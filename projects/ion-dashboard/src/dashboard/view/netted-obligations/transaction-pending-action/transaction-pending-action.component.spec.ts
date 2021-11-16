import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionPendingActionComponent } from './transaction-pending-action.component';

import { PopoverModule } from 'ngx-bootstrap/popover';

describe('TransactionPendingActionComponent', () => {
  let component: TransactionPendingActionComponent;
  let fixture: ComponentFixture<TransactionPendingActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopoverModule.forRoot()],
      declarations: [TransactionPendingActionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionPendingActionComponent);
    component = fixture.componentInstance;
    component.params = {
      data: {
        node: {
          cusip: 'cusip 1',
        },
      },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should agInit', () => {
    const params = { onClick: () => {}, node: { data: { cusip: 100 } } };
    component.agInit(params);
    expect(component.params).toEqual(params);
  });

  it('should cusip', () => {
    const params = { onClick: () => {}, node: { data: { cusip: '100' } } };
    component.agInit(params);
    expect(component.cusip).toBe('100');
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
        expect(data).toEqual({ cusip: 100 });
        done();
      },
      node: { data: { cusip: 100 } },
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
      node: { data: { cusip: 100 } },
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
