import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { filter, map } from 'rxjs/operators';

import { CoreFacade } from 'ion-core';

import { ShellFacade } from '../../facade/shell.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-shell-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  applicationName = 'ION';
  environment = '';
  userName = this.coreFacade
    .getUser()
    .pipe(map((user) => `<i class="fa fa-user-circle mr-1"></i> ${user}`));
  hideLogout = true;
  navigationProvider = {
    labelField: 'label',
    idField: 'id',
    menuField: 'menu',
    menu: [
      {
        label: 'Dashboard',
        id: 'dashboard',
        routerLink: 'dashboard',
      },
      {
        label: 'Settlement Activity',
        id: 'settlement',
        routerLink: 'settlement',
      },
      {
        label: 'Transaction Submission',
        menuField: 'menu',
        menu: [
          {
            label: 'Market Trade Generator',
            id: 'trade',
            routerLink: 'transaction/trade',
          },
          {
            label: 'Bilateral Transactions',
            id: 'bilateral',
            routerLink: 'transaction/bilateral',
          },
          {
            label: 'Memo Segregation',
            id: 'memo',
            routerLink: 'transaction/memo',
          },
          {
            label: 'Pre-Positioning',
            id: 'preposition',
            routerLink: 'transaction/preposition',
          },
          {
            label: 'Prefunded Ion Cash Management',
            id: 'cash',
            routerLink: 'transaction/cash',
          },
        ],
      },
      {
        label: 'Admin Portal',
        id: 'admin',
        routerLink: 'admin',
      },
    ],
  };
  dropdownProvider = {
    placeholder: '',
    bindLabel: 'label',
    bindValue: 'value',
    items: [
      /* blank bank */
      {
        label: '',
        value: '',
      },
    ],
  };
  utilityProvider = {
    labelField: 'label',
    link: 'link',
    data: [
      {
        label: '<i class="fa fa-phone mr-1"></i> Contact Us',
        id: 'utility-contact-link',
        link: 'http://www.dtcc.com/client-center',
      },
      {
        label: '<i class="fa fa-globe mr-1"></i> DTCC.com',
        id: 'utility-dtcc-link',
        link: 'http://www.dtcc.com',
      },
    ],
  };

  @ViewChild('header', { static: false, read: ElementRef })
  headerRef: ElementRef<HTMLElement>;

  timeout: number;

  constructor(
    private coreFacade: CoreFacade,
    private facade: ShellFacade,
  ) {}

  logout(): void {
    this.coreFacade.logout();
  }

  onParticipantChange(participant: { label: string; value: string }): void {
    this.facade.changeParticipant(participant.value);
  }

  ngOnInit(): void {
    this.coreFacade
      .getParticipants()
      .pipe(
        map((participants) =>
          participants
            .map((participant) => ({
              label: participant.partName,
              value: participant.partId,
            }))
            .sort((left, right) => left.value.localeCompare(right.value))
        ),
        filter((banks) => banks.length > 0)
      )
      .subscribe((banks) => {
        this.dropdownProvider.items = banks;
        this.chooseBankHack();
      });
  }

  ngAfterViewInit(): void {
    this.chooseBankHack();
  }

  chooseBankHack(): void {
    if (this.dropdownProvider.items.filter((item) => !!item.value).length > 0) {
      // dtcc-header does not support default value for dropdown field.
      this.timeout = window.setTimeout(() => this.defaultValueHack(), 100);
    }
  }

  // dtcc-header does not support default value for dropdown field.
  defaultValueHack(): void {
    const header = this.headerRef.nativeElement;
    const event = document.createEvent('MouseEvents');
    event.initMouseEvent(
      'mousedown',
      true,
      true,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );

    try {
      const arrow = header.querySelector('span.ng-arrow');
      // hack to first mouse down to open the chooser
      arrow.dispatchEvent(event);

      const option = header.querySelector<HTMLDivElement>('div.ng-option');
      // hack to select the first option upon rendering.
      option.click();
    } catch (e) {
      // ignore error
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeout);
  }
}
