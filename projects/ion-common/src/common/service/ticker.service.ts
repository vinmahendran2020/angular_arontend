import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ISecurity } from 'ion-core';

import {
  ITickerForm,
  ITickerResult,
  ITickerFailure,
} from '../types';

@Injectable({
  providedIn: 'root',
})
export class TickerService {
  constructor(private client: HttpClient) {}

  search(form: ITickerForm): Observable<ITickerResult> {
    return this.client
      .post<ISecurity[]>(`./api/security-master/v1/securities`, form)
      .pipe(
        map((securities: ISecurity[]) => ({
          items: securities.map((security) => ({
            ticker: security.ticker,
            security: security.name,
            issuer: security.issuerName,
            price: security.price,
            selected: false,
          })),
        })),
        catchError(
          (response: { error: ITickerFailure | string }) =>
            throwError('No results found.')
          // throwError(
          //   (response.error as ICusipFailure).error?.description ||
          //     response.error
          // )
        )
      );
  }
}
