import {Game} from "./State.typings";
import {Player} from "../Player/Player";
import IEntity = Game.IEntity;

class GameState {
    public static keysPressed: Game.IKeysPressed = {};
    public static entitys: Game.IEntitys = {};
    public static entityID: number = 0;
    public static player: Player;

    public static createEntity(entity: IEntity) {
        GameState.entitys[entity.id] = entity;
    }

    public static createPlayer(player: Player, canvas: HTMLCanvasElement) {
        GameState.player = player;
        GameState.player.setControlls(canvas);
        GameState.entitys[GameState.player.id] = GameState.player;
    }
}

export {GameState};
