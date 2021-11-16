import { Observable, of, SchedulerLike, throwError } from 'rxjs';
import { IHttpErrorResponse, IHttpFailure } from '../types';

export function throwIfOnlyInternalError(
  response: IHttpErrorResponse,
  data: any,
  scheduler?: SchedulerLike
): Observable<never> {
  if ((response.error as IHttpFailure)?.error?.code === 500) {
    return throwError((response.error as IHttpFailure).error, scheduler);
  } else {
    return of(data as never);
  }
}
