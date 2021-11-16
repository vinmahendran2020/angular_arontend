import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CoreFacade } from 'ion-core';

@Injectable()
export class CanActivateLoginRoute implements CanActivate {
  constructor(private coreFacade: CoreFacade, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.coreFacade.isAuthenticated().pipe(
      map((authenticated) => {
        return !authenticated || this.router.parseUrl('/dashboard');
      })
    );
  }
}
