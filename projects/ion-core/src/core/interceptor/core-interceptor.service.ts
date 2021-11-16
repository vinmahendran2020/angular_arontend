import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { CoreFacade } from '../facade/core.facade';
import { CoreService } from '../service/core.service';

@Injectable()
export class CoreInterceptor implements HttpInterceptor {
  refreshTokenInProgress = false;

  tokenRefreshedSource = new Subject();

  tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

  constructor(private service: CoreService, private facade: CoreFacade) {}

  addAuthHeader(request: HttpRequest<any>): HttpRequest<any> {
    const principal = this.service.getPrincipal();
    if (principal?.accessToken) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${principal.accessToken}`,
          Identification: principal.idToken,
        },
      });
    }
    return request;
  }

  refreshToken(): Observable<any> {
    if (this.refreshTokenInProgress) {
      return new Observable((observer) => {
        this.tokenRefreshed$.subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.refreshTokenInProgress = true;
      const principal = this.service.getPrincipal();
      return this.service
        .refresh(principal.user, principal.refreshToken)
        .pipe(
          tap(() => {
            this.refreshTokenInProgress = false;
            this.tokenRefreshedSource.next();
          }),
          catchError((error) => {
            this.refreshTokenInProgress = false;
            this.logout();
            return error;
          })
        );
    }
  }

  logout(): void {
    this.facade.logout();
  }

  handleResponseError(
    error: {
      status: number;
      message: string;
      error: {
        status: number;
        description: string;
        error: { status: number; description: string };
      };
    },
    request?: HttpRequest<any>,
    next?: HttpHandler
  ): Observable<any> {
    const description =
      error.error?.description ?? error.error?.error?.description;
    if (description?.includes('Token is expired')) {
      return this.refreshToken().pipe(
        switchMap(() => {
          const authRequest = this.addAuthHeader(request);
          return next.handle(authRequest);
        }),
        catchError((e) => {
          // this.logout();
          return e;
        })
      );
    }
    return throwError(error);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Handle request
    const authRequest = this.addAuthHeader(request);

    // Handle response
    return next.handle(authRequest).pipe(
      catchError((error) => {
        return this.handleResponseError(error, request, next);
      })
    );
  }
}
