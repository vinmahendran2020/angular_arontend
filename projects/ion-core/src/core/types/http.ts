export interface IHttpError {
  code: number;
  description: string;
}

export interface IHttpFailure {
  error: IHttpError;
}

export interface IHttpErrorResponse {
  error: IHttpFailure | string;
}
