import { ICollateralGroup } from './collateralGroup';
import { IParticipant } from './participant';

export interface ILegalEntity {
  lglEntityId: string;
  partGlblDunsId: number;
  createDate: Date;
  lastUpdateDate: Date;
  participants: IParticipant[];
  collateralGroupList: ICollateralGroup[];
}
