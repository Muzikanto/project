import Gun from "../Common";
import {normalizeVectorDistance} from "../../../Game.helpers";

class Rifle extends Gun {
    public loading = 100;
    protected damage = 0.5;
    protected speed = 20;

    protected drawInPlayer(ctx: CanvasRenderingContext2D) {
        if (this.player) {
            const {pos, cursor} = this.player;
            const target = normalizeVectorDistance(pos, cursor);

            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
            ctx.lineTo(pos.x + target.x * 55, pos.y + target.y * 55);
            ctx.stroke();
        }
    };
}

export default Rifle;
