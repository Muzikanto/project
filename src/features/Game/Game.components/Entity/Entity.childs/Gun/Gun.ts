import {GameState} from "../../../State/State";
import {Bullet} from "../Bullet/Bullet";
import {Player} from "../../../Player/Player";
import {IVector2D} from "../../../../Game.typings";
import {Helpers, normalizeVectorDistance} from "../../../../Game.helpers";
import CommonEntity from "../../CommonEntity";
import {IGunProps} from "./Gun.typings";
import Moved from "../../../_Other/Moved/Moved";
import {Enemy} from "../Enemy/Enemy";

abstract class Gun extends CommonEntity {
    public controll: Moved;
    protected helpers = Helpers;
    protected damage = 0.3;
    protected ammo = 0;
    protected loading = 1000;
    protected speed = 15;
    protected player: Enemy | Player | undefined;
    protected img = new Image(552, 388);
    protected img_src = require('./Gun.asset/guns.png');
    protected abstract cut = {x: 10, y: 0, w: 100, h: 100};
    protected abstract translate = {x: -17.5, y: -17.5};
    protected abstract size = {w: 35, h: 35};

    private lastShot = new Date().getTime();

    constructor(props: IGunProps) {
        super(props);
        this.img.src = this.img_src;

        this.controll = new Moved({
            pos: {...props.parent ? props.parent.controll.pos : {x: 200, y: 200}},
            parent: this
        });

        props.ammo && (this.ammo = props.ammo);
    }

    public update(ctx: CanvasRenderingContext2D) {
        this.draw(ctx);

        if (!this.player) {
            this.controll.update();
        }
    }

    public shot(target: IVector2D) {
        if (this.player && this.ammo > 0) {
            const time = new Date().getTime();
            if (time - this.lastShot > this.loading) {
                const {pos} = this.player.controll;
                const normalize = normalizeVectorDistance({...pos}, target);
                const to = {x: normalize.x * 500 + pos.x, y: normalize.y * 500 + pos.y};

                this.createBullets(to);
                this.lastShot = time;
            }
        }
    }

    public setPlayer(player: Enemy | undefined) {
        if (player) {
            const {pos} = player.controll;
            this.parent_id = player.id;
            this.controll.pos = pos;
        } else if (this.player) {
            this.controll.pos = this.player.controll.pos;
        }

        this.player = player;
    }

    public instanciateAction(to: CommonEntity | Player): void {
        if (to instanceof Player && this.parent_id !== to.id) {
            to.inventory.addToInventory(this);
            this.player = to;
        }
    }

    protected createBullets(target: IVector2D) {
        if (this.player) {
            const {pos} = this.player.controll;

            this.ammo--;
            this.createBullet(pos, target);
        }
    }

    protected draw(ctx: CanvasRenderingContext2D) {
        if (this.player && this.player instanceof Player && this.player && this.player.hand && this.player.hand.id === this.id) {
            this.drawReload(ctx);

            const {controll: {pos}, cursor} = this.player;
            const normalize = this.helpers.normalizeVectorDistance(pos, cursor);

            const target = {
                x: pos.x + normalize.x * 30,
                y: pos.y + normalize.y * 30
            };

            let angle = this.helpers.angleOfVectors(pos, target) + Math.PI;
            const isLeft = angle > this.helpers.toRadians(90) && angle < this.helpers.toRadians(270);
            if (isLeft) {
                angle += this.helpers.toRadians(180);
            }
            const translated = this.helpers.rotateVector({x: target.x, y: target.y}, -angle);

            ctx.save();
            ctx.rotate(angle);
            if (isLeft) {
                ctx.scale(-1, 1);
            }
            ctx.translate(this.translate.x, this.translate.y);
            ctx.drawImage.apply(ctx, [this.img,
                ...[this.cut.x, this.cut.y, this.cut.w, this.cut.h],
                ...[isLeft ? -1 * translated.x : translated.x, translated.y, this.size.w, this.size.h]
            ] as any);
            ctx.restore();
        } else if (!this.player) {
            ctx.drawImage.apply(ctx, [this.img,
                ...[this.cut.x, this.cut.y, this.cut.w, this.cut.h],
                ...[this.controll.pos.x, this.controll.pos.y, this.size.w, this.size.h]
            ] as any);
        }
    };

    protected createBullet(pos: IVector2D, target: IVector2D) {
        if (this.player) {
            const normalize = this.helpers.normalizeVectorDistance(pos, target);
            const startPos = {
                x: pos.x + normalize.x * 30,
                y: pos.y + normalize.y * 30
            };

            GameState.createEntity(new Bullet({
                pos: startPos,
                parent_id: this.player.id,
                name: 'bullet',
                target,
                radius: 3,
                damage: this.damage,
                speed: this.speed,
            }));
        }
    }

    private drawReload(ctx: CanvasRenderingContext2D) {
        if (this.player && this.ammo > 0) {
            const {controll: {pos}, radius} = this.player;

            const time = new Date().getTime() - this.lastShot;
            const sizeHealthBar = radius * 2 * (time >= this.loading ? this.loading : time) / this.loading;
            const startX = pos.x - radius;
            const startY = pos.y - radius * 1.5 + 5;

            ctx.beginPath();
            ctx.fillStyle = 'blue';
            ctx.fillRect(startX, startY, sizeHealthBar, 3);
            ctx.fill();

            ctx.beginPath();
            ctx.rect(startX, startY, radius * 2, 3);
            ctx.stroke();
        }
    }
}

export default Gun;
