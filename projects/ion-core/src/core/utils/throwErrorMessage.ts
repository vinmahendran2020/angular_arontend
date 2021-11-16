import { Observable, SchedulerLike, throwError } from 'rxjs';
import { IHttpErrorResponse, IHttpFailure } from '../types';

export function throwErrorMessage(
  response: IHttpErrorResponse,
  message?: string,
  scheduler?: SchedulerLike
): Observable<never> {
  return throwError(
    (response.error as IHttpFailure)?.error?.description ||
      (typeof response.error === 'string' ? response.error : message),
    scheduler
  );
}
