import { ISchedule } from './schedule';

export interface INettingState {
  readonly progress: boolean;
  readonly inProgressMessage: string | null;
  readonly schedule: ISchedule | null;
  readonly lastUpdated: Date | null;
  readonly initialLoaded: Date | null;
  readonly pageLoaded: Date | null;
  readonly editing: boolean;
  readonly commitMessage: string | null;
  readonly commitError: string | null;
  readonly pageError: string | null;
  readonly pageSuccess: string | null;
}
