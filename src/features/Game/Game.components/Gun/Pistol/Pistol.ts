import Gun from "../Common";
import {normalizeVectorDistance} from "../../../Game.helpers";

class Pistol extends Gun {
    protected damage = 1;
    protected loading = 300;
    protected speed = 10;

    protected drawInPlayer(ctx: CanvasRenderingContext2D) {
        if (this.player) {
            const {pos, cursor} = this.player;
            const target = normalizeVectorDistance(pos, cursor);

            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
            ctx.lineTo(pos.x + target.x * 30, pos.y + target.y * 30);
            ctx.stroke();
        }
    };
}

export default Pistol;
