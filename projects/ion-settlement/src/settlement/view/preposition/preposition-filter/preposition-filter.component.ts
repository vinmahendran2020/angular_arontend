import { Component } from '@angular/core';
import { IDataProvider } from '@dtcc-uif/shared';
import { PrepositionFacade } from '../../../facade/preposition.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-preposition-filter',
  templateUrl: './preposition-filter.component.html',
  styleUrls: ['./preposition-filter.component.css'],
})
export class PrepositionFilterComponent {
  cusipId$ = this.facade.getCusipId();
  cusipName$ = this.facade.getCusipName();
  action$ = this.facade.getAction();

  actions: IDataProvider[] = [
    { label: 'Pledge', id: 'Pledge' },
    { label: 'Release', id: 'Release' },
  ];

  constructor(private facade: PrepositionFacade) {}

  filter(): void {
    this.facade.filter();
  }

  onCusipIdChange(cusipId: string): void {
    this.facade.changeCusipId(cusipId);
  }

  onCusipNameChange(cusipName: string): void {
    this.facade.changeCusipName(cusipName);
  }

  onActionChange(action: string): void {
    this.facade.changeAction(action);
  }
}
