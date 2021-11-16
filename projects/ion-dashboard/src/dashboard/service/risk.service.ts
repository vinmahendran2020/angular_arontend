import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
  IHttpErrorResponse,
  throwInternalError,
} from 'ion-core';

import {
  IRiskSummary,
  ISettlement,
} from '../types';

@Injectable({
  providedIn: 'root',
})
export class RiskService {
  constructor(private client: HttpClient) {}

  search(
    participantId: string,
    collateralId: string
  ): Observable<IRiskSummary> {
    return this.client
      .get<ISettlement>(
        `./api/cash-settlement/v1/net-cash-balance?participantAccountId=${participantId}&collGrpId=${collateralId}`
      )
      .pipe(
        map((response: ISettlement) => ({
          collateralId,
          participantId: response.settlement.participantAccountId,
          settlementBalance: response.settlement.netBalance,
          netDepitCap: response.risk.debitCapAmt,
          collateralMonitor: response.risk.collMntrAmt,
          sppNetActivity: 0,
          netDirection: response.settlement.netDirection,
          valueAtRisk: 100,
          // valueAtRisk: response.risk.valueAtRisk,
        })),
        catchError((response: IHttpErrorResponse) =>
          throwInternalError(
            response,
            'No summary found'
          )
        )
      );
  }
}
