import {ICommonEntity, ICommonEntity_noName} from "../../../Entity.typings";
import {Enemy} from "../../Enemy/Enemy";

export interface IGunProps_noName extends ICommonEntity_noName {
    ammo?: number;
    parent?: Enemy;
}

export interface IGunProps extends ICommonEntity {
    ammo?: number;
    parent?: Enemy;
}