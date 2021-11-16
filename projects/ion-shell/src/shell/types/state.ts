export interface IScheduleInterval {
  netting: string | null;
  cash: string | null;
  security: string | null;
  start: string | null;
  end: string | null;
}

export interface IShellState {
  loadedAt: Date | null;
  participant: string | null;
  schedule: IScheduleInterval & { error: string | null };
}
