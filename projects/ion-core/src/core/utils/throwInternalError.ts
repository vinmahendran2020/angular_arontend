import { Observable, SchedulerLike, throwError } from 'rxjs';
import { IHttpErrorResponse, IHttpFailure } from '../types';

export function throwInternalError(
  response: IHttpErrorResponse,
  message?: string,
  scheduler?: SchedulerLike
): Observable<never> {
  if ((response.error as IHttpFailure)?.error?.code === 500) {
    return throwError((response.error as IHttpFailure).error, scheduler);
  } else {
    return throwError(
      typeof response.error === 'string' ? response.error : message,
      scheduler
    );
  }
}
