import * as fromRouter from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';

import { ICommonState } from '../../types';

export const selectCommonState = createFeatureSelector<ICommonState>(
  'common'
);