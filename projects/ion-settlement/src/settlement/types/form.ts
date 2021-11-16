import { IField, ILoadedState } from 'ion-core';

export interface ISettlementForm extends ILoadedState {
  readonly participantId: IField<string>;
  readonly transactionType: IField<string>;
  readonly businessDate: IField<string>;
}
