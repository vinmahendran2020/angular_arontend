import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskManagementSummaryComponent } from './risk-management-summary.component';

describe('RiskManagementSummaryComponent', () => {
  let component: RiskManagementSummaryComponent;
  let fixture: ComponentFixture<RiskManagementSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RiskManagementSummaryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskManagementSummaryComponent);
    component = fixture.componentInstance;
    component.summary = {
      participantId: '111',
      collateralId: '222',
      settlementBalance: 200000,
      netDepitCap: 400000,
      collateralMonitor: 300000,
      sppNetActivity: 600000,
      netDirection:'D',
      valueAtRisk: 100,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
