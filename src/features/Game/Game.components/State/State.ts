import {IVector2D} from "../../Game.typings";
import {Game} from "./State.typings";
import {Player} from "../Player/Player";

class GameState {
    public static cursor: IVector2D = {x: 0, y: 0};
    public static keysPressed: Game.IKeysPressed = {};
    public static entitys: Game.IEntitys  = {};
    public static entitysID: number = 0;
    public static player = new Player();
}

export {GameState};
