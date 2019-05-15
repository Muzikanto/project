import {Game} from "../Player/Player.typings";
import {IVector2D} from "../../Game.typings";
import {GameState} from "../State/State";
import {Entity} from "../Entity/Entity";
import {Player} from "../Player/Player";
import IGuns = Game.IGuns;
import {normalizeVectorDistance} from "../../Game.helpers";
import IWeapon = Game.IWeapon;

class Gun {
    public current: IWeapon;
    private player: Player;
    private lastShot: number = new Date().getTime();

    constructor(player: Player) {
        this.player = player;
        this.current = this.getGun('pistol');
    }

    public update(ctx: CanvasRenderingContext2D) {
        const {x, y, cursor} = this.player;

        this.current.draw(ctx, normalizeVectorDistance({x, y}, cursor));
    }

    public newGun(number: number) {
        if (number >= 49 && number <= 51) {
            this.player.gun.current = this.getGun(['pistol', 'rifle', 'shotgun'][number - 49] as IGuns)
        }
    }

    public shot(target: IVector2D) {
        const time = new Date().getTime();
        if (time - this.lastShot > this.current.loading) {
            this.current.createBullets(target);
            this.lastShot = time;
        }
    }

    private getGun(name: IGuns) {
        let weapon: Game.IWeapon = {
            name,
        } as Game.IWeapon;

        const player = this.player;

        switch (name) {
            case 'pistol':
                weapon = {
                    draw: (ctx: CanvasRenderingContext2D, target: IVector2D) => {
                        ctx.moveTo(player.x, player.y);
                        ctx.lineTo(player.x + target.x * 30, player.y + target.y * 30);
                    },
                    createBullets: (target: IVector2D) => {
                        this.createBullet({x: player.x, y: player.y}, target);
                    },
                    damage: 1,
                    loading: 300,
                    speed: 10,
                } as Game.IWeapon;
                break;
            case 'rifle':
                weapon = {
                    draw: (ctx: CanvasRenderingContext2D, target: IVector2D) => {
                        ctx.moveTo(player.x, player.y);
                        ctx.lineTo(player.x + target.x * 55, player.y + target.y * 55);
                    },
                    createBullets: (target: IVector2D) => {
                        this.createBullet({x: player.x, y: player.y}, target);
                    },
                    damage: 0.5,
                    loading: 100,
                    speed: 20,
                } as Game.IWeapon;
                break;
            case 'shotgun':
                weapon = {
                    draw: (ctx: CanvasRenderingContext2D, target: IVector2D) => {
                        ctx.moveTo(player.x, player.y);
                        ctx.lineTo(player.x + target.x * 50, player.y + target.y * 50);
                        ctx.arc(player.x + target.x * 50, player.y + target.y * 50, 3, 0, 2 * Math.PI);
                    },
                    createBullets: (target: IVector2D) => {
                        for (let i = 0; i < 16; i++) {
                            const r1 = 100;
                            const randX = Math.floor(Math.random() * (target.x + r1 - (target.x - r1)) + target.x - r1);
                            const randY = Math.floor(Math.random() * (target.y + r1 - (target.y - r1)) + target.y - r1);
                            const r2 = 15;
                            const startX = Math.floor(Math.random() * (player.x + r2 - (player.x - r2)) + player.x - r2);
                            const startY = Math.floor(Math.random() * (player.y + r2 - (player.y - r2)) + player.y - r2);
                            this.createBullet({x: startX, y: startY}, {x: randX, y: randY});
                        }
                    },
                    damage: 0.3,
                    loading: 1000,
                    speed: 15,
                } as Game.IWeapon;
                break;
        }

        return weapon;
    }

    private createBullet(start: IVector2D, target: IVector2D) {
        GameState.createEntity(new Entity({
            ...start,
            parent: this.player.id,
            name: 'bullet',
            target,
            radius: 3,
            damage: this.current.damage,
            speed: this.current.speed,
        }));
    }
}

export {
    Gun,
}