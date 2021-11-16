export interface ITickerForm {
  securityName: string;
  issuerName: string;
  cusip: string;
}

export interface ITickerRecord {
  ticker: string;
  security: string;
  issuer: string;
  price: number;
  selected: boolean;
}

export interface ITickerResult {
  items: Array<ITickerRecord>;
}

export interface ITickerState {
  error: string;
  form: ITickerForm;
  result: ITickerResult | null;
}

export interface ITickerError {
  code: number;
  description: string;
}

export interface ITickerFailure {
  error: ITickerError;
}
