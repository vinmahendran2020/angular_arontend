import { Component, Input } from '@angular/core';
import { IPrepositionSummary } from '../../../types/preposition';
import { PrepositionFacade } from '../../../facade/preposition.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-pre-positioning-submissions',
  templateUrl: './pre-positioning-submissions.component.html',
  styleUrls: ['./pre-positioning-submissions.component.css'],
})
export class PrepositioningSubmissionsComponent {
  submitDisabled$ = this.facade.disableSubmit();

  prepositionIds$ = this.facade.getPrepositionIds();

  constructor(private facade: PrepositionFacade) {}

  submit(): void {
    this.facade.submit();
  }

  reset(): void {
    this.facade.reset();
  }

  addRow(): void {
    this.facade.addNewPreposition();
  }
}
