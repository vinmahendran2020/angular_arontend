import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

export interface IRadioParams {
  data: { selected: boolean };
  onClick(selected: {}): void;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-radio-button-renderer',
  template: `
    <div class="ngSelectionCell" style="padding-top: 2px !important;">
      <input
        name="cusip"
        type="radio"
        [checked]="params.data.selected"
        (change)="handleChange($event)"
      />
    </div>
  `,
})
export class RadioButtonRendererComponent implements ICellRendererAngularComp {
  params: IRadioParams;

  agInit(params: unknown): void {
    this.params = params as IRadioParams;
  }

  refresh(params?: unknown): boolean {
    return true;
  }

  handleChange($event: unknown): void {
    if (this.params.onClick instanceof Function) {
      this.params.onClick(this.params.data);
    }
  }
}
