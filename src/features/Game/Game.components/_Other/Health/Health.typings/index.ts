import {Enemy} from "../../../Entity/Entity.childs/Enemy/Enemy";

export interface IHealthProps {
    hp?: number;
    showHp?: boolean;
}

export interface IHealthPropsWithParent extends IHealthProps{
    parent: Enemy
}
