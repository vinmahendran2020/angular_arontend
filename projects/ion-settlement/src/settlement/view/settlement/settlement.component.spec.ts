import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { SettlementFacade } from '../../facade/settlement.facade';

import { SettlementComponent } from './settlement.component';

describe('SettlementComponent', () => {
  let component: SettlementComponent;
  let fixture: ComponentFixture<SettlementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettlementComponent],
      providers: [provideMockStore(), SettlementFacade],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
