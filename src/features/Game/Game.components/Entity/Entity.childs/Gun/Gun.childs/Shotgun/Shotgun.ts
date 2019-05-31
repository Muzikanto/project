import Gun from "../../Gun";
import {IVector2D} from "../../../../../../Game.typings";
import {IGunPropsnoName} from "../../Gun.typings";

class Shotgun extends Gun {
    public loading = 1000;
    protected damage = 0.3;
    protected speed = 15;

    protected cut = {x: 420, y: 0, w: 200, h: 100};
    protected translate = {x: -17.5, y: -17.5};
    protected size = {w: 55, h: 35};

    constructor(props: IGunPropsnoName) {
        super({...props, name: 'Shotgun'});
    }

    public createBullets(target: IVector2D) {
        if (this.player) {
            this.ammo--;
            const {controll: {pos}} = this.player;

            for (let i = 0; i < 16; i++) {
                const r1 = 100;
                const randX = Math.floor(Math.random() * (target.x + r1 - (target.x - r1)) + target.x - r1);
                const randY = Math.floor(Math.random() * (target.y + r1 - (target.y - r1)) + target.y - r1);
                const r2 = 15;
                const startX = Math.floor(Math.random() * (pos.x + r2 - (pos.x - r2)) + pos.x - r2);
                const startY = Math.floor(Math.random() * (pos.y + r2 - (pos.y - r2)) + pos.y - r2);

                this.createBullet({x: startX, y: startY}, {x: randX, y: randY});
            }
        }
    }
}

export default Shotgun;
