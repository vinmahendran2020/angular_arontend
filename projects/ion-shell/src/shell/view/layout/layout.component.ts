import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ShellFacade } from '../../facade/shell.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-shell-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  data: { title: string; breadcrumb: boolean; status: boolean }[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private facade: ShellFacade
  ) {}

  get title(): string {
    const data = this.data.filter((d) => d.status);
    return data.length ? data[data.length - 1].title : '';
  }

  get titles(): string[] {
    const data = this.data.filter((d) => d.breadcrumb);
    return data
      .map((d) => d.title)
      .filter((title, index, titles) => titles.indexOf(title) === index);
  }

  ngOnInit(): void {
    this.facade.loaded();
    this.updateTitle();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.updateTitle());
  }

  updateTitle(): void {
    const rts = this.getChildren(this.activatedRoute);
    this.data = [];
    rts.forEach((rt) =>
      rt.data.subscribe((data) => {
        const { title, breadcrumb, status } = data;
        this.data = [...this.data, { title, breadcrumb, status }];
        const xtitle = this.title;
        if (xtitle) {
          this.titleService.setTitle(xtitle);
        }
      })
    );
  }

  getChildren(activatedRoute: ActivatedRoute): ActivatedRoute[] {
    if (activatedRoute.firstChild) {
      return [activatedRoute, ...this.getChildren(activatedRoute.firstChild)];
    } else {
      return [activatedRoute];
    }
  }
}
