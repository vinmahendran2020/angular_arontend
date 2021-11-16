import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-status-link-renderer',
  templateUrl: './status-link-renderer.component.html',
  styleUrls: ['./status-link-renderer.component.css'],
})
export class StatusLinkRendererComponent implements ICellRendererAngularComp {
  params: any;

  get isPending(): boolean {
    return this.params.value === 'Pending';
  }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event: any): void {
    $event.preventDefault();
    if (this.params.onClick instanceof Function) {
      this.params.onClick(this.params.node.data);
    }
  }
}
