import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { CoreFacade } from 'ion-core';

@Injectable()
export class CanActivateAuthorizedRoute implements CanActivate {
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
      tap((authenticated) => {
        if (!authenticated) {
          // not logged in so redirect to login page with the return url
          this.router.navigate(['/login'], {
            queryParams: { returnUrl: state.url },
          });
        }
      })
    );
  }
}
