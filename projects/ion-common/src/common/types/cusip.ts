export interface ICusipForm {
  securityName: string;
  issuerName: string;
  ticker: string;
}

export interface ICusipRecord {
  cusip: string;
  security: string;
  issuer: string;
  price: number;
  selected: boolean;
}

export interface ICusipResult {
  items: Array<ICusipRecord>;
}

export interface ICusipState {
  error: string;
  form: ICusipForm;
  result: ICusipResult | null;
}

export interface ICusipError {
  code: number;
  description: string;
}

export interface ICusipFailure {
  error: ICusipError;
}
