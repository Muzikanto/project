import {Game} from "./State.typings";
import {Player} from "../Player/Player";
import {Entity} from "../Entity/Enemy/Entity";
import {Bullet} from "../Entity/Bullet/Bullet";

class GameState {
    public static keysPressed: Game.IKeysPressed = {};
    public static entitys: Game.IEntitys = {};
    public static entityID: number = 0;
    public static player: Player;

    public static createEntity(entity: Entity | Bullet) {
        GameState.entitys[entity.id] = entity;
    }

    public static createPlayer(player: Player, canvas: HTMLCanvasElement) {
        GameState.player = player;
        GameState.player.setControlls(canvas);
        GameState.entitys[GameState.player.id] = GameState.player;
    }
}

export {GameState};
