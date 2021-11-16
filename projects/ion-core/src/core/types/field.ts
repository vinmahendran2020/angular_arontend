export interface IField<T> {
  type: 'string' | 'boolean';
  value: T;
  editable: boolean;
  touched: boolean;
  error: string | null;
  async: boolean;
  validatable: boolean;
  validating: boolean;
  validated: boolean;
}
