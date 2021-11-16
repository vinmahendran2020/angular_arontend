import { Component } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-shell-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  copyRights = `© ${new Date(
    Date.now()
  ).getFullYear()} DTCC All Rights Reserved`;
  navigationProvider = {
    labelField: 'label',
    id: 'id',
    link: 'link',
    data: [
      {
        label: 'Privacy Policy',
        id: 'privacy',
        link: 'http://www.dtcc.com/privacy',
      },
      {
        label: 'Terms of Use',
        id: 'terms',
        link: 'http://www.dtcc.com/terms',
      },
    ],
  };
}
