import Moved from "../_Other/Moved/Moved";
import {GameState} from "../State/State";

class PlayerMoved extends Moved {
    public move(): void {
        if (this.speed) {
            const {keysPressed} = GameState;
            const dx = keysPressed['65'] && -1 || keysPressed['68'] && 1;
            const dy = keysPressed['87'] && -1 || keysPressed['83'] && 1;

            if (dx) {
                this.pos.x += dx * this.speed;
            }
            if (dy) {
                this.pos.y += dy * this.speed;
            }
        }
    }
}

export default PlayerMoved;
