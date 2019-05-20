import {ICommonEntity, ICommonEntityNoName} from "../../../Entity.typings";
import {Enemy} from "../../Enemy/Enemy";

export interface IGunProps_noName extends ICommonEntityNoName {
    ammo?: number;
    parent?: Enemy;
}

export interface IGunProps extends ICommonEntity {
    ammo?: number;
    parent?: Enemy;
}