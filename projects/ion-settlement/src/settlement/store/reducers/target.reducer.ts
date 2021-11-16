import produce from 'immer';

import { FormTransactionTypeChange } from '../actions/form.actions';

export function reducer(
  state: string | null = null,
  action: FormTransactionTypeChange
): string | null {
  return produce(state, (draft) => {
    switch (action.type) {
      case FormTransactionTypeChange.Type:
        return action.transactionType;
    }
  });
}
