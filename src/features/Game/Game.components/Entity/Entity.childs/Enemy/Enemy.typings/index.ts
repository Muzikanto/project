import {ICommonEntity} from "../../../Entity.typings";
import {IHealthProps} from "../../../../_Other/Health/Health.typings";
import {IMovedProps} from "../../../../_Other/Moved/Moved.typings";
import Gun from "../../Gun/Gun";

export interface IEnemyProps extends ICommonEntity{
    damage?: number;
    radius?: number;

    health?: IHealthProps;
    controll: IMovedProps;
    inventory?: Gun[]
}
