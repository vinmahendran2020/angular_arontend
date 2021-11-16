export interface ILoadedState {
  readonly lastUpdated: Date | null;
  readonly initialLoaded: Date | null;
  readonly pageLoaded: Date | null;
}

export interface IPageState {
  readonly pageError: string | null | Array<{ [key: string]: unknown }>;
  readonly pageSuccess: string | null | Array<{ [key: string]: unknown }>;
}

export interface IEntityState extends ILoadedState, IPageState {
  readonly pageTarget?: string | null;
}
