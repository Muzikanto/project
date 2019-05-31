import {ICommonEntity, ICommonEntityNoName} from "../../../Entity.typings";
import {Enemy} from "../../Enemy/Enemy";

export interface IGunPropsnoName extends ICommonEntityNoName {
    ammo?: number;
    parent?: Enemy;
}

export interface IGunProps extends ICommonEntity {
    ammo?: number;
    parent?: Enemy;
}