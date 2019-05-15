import {IVector2D} from "../../Game.typings";
import Game from "../../Game";
import {IEntityProps} from "./Entity.typings";
import {GameState} from "../State/State";
import {normalizeVectorDistance} from "../../Game.helpers";

export class Entity {
    public x: number;
    public y: number;

    public isStatic: boolean;
    public isSolid: boolean = false;
    public start: IVector2D;
    public target: IVector2D | undefined;
    public speed: number | undefined;

    public id: string;
    public parent: string | undefined;
    public name: string;

    public radius: number;
    public hp: number;
    public maxHp: number;
    public showHealth: boolean = false;

    private damage: number | undefined;

    constructor(props: IEntityProps) {
        const {entitysID} = GameState;
        const id = props.name + entitysID;
        GameState.entitysID++;

        this.x = props.x;
        this.y = props.y;

        this.isSolid = Boolean(props.isSolid);
        this.isStatic = Boolean(props.isStatic);

        this.speed = props.speed;
        this.target = props.target;
        this.start = {
            x: props.x,
            y: props.y
        };

        this.id = props.id || id;
        this.parent = props.parent;
        this.name = props.name;

        this.radius = props.radius || 5;
        this.hp = props.hp || 1;
        this.maxHp = this.hp;
        this.showHealth = Boolean(props.showHealth);

        this.damage = props.damage;
    }

    public update(ctx: CanvasRenderingContext2D): void {
        if (!this.isStatic) {
            this.moveToTarget();
            this.checkInstanciateEntitys();
        }

        this.draw(ctx);
    }

    //

    protected draw(ctx: CanvasRenderingContext2D): void {
        if (this.showHealth) {
            ctx.beginPath();
            ctx.rect(this.x - this.radius, this.y - this.radius * 1.5, this.radius * 2, 5);
            ctx.stroke();

            ctx.beginPath();
            ctx.fillStyle = 'red';
            ctx.fillRect(this.x - this.radius, this.y - this.radius * 1.5, this.radius * 2 * this.hp / this.maxHp, 5);
            ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }

    protected checkInstanciateEntitys() {
        const list = GameState.entitys;

        for (const name in list) {
            if (name !== this.id) {
                if (list[name].isSolid && this.checkInstanciate(list[name])) {
                    list[name].instanciateAction(this);
                    this.instanciateAction(list[name]);
                }
            }
        }
    }

    // Столкновения

    private moveToTarget(): void {
        if (this.target && this.speed) {
            const {speed, target, start} = this;

            const {x, y} = normalizeVectorDistance(start, target);

            this.x += x * speed;
            this.y += y * speed;

            if (this.checkExitOfCanvas()) {
                this.drop();
            }
        }
    }

    private checkExitOfCanvas(): boolean {
        const {width, height} = Game.settings;

        return (this.x < 0 || this.y < 0 || this.x > width || this.y > height);
    }

    private checkInstanciate(entity: Entity): boolean {
        const r2 = entity.radius;

        const instX = this.x > entity.x - r2 && this.x < entity.x + r2;
        const instY = this.y > entity.y - r2 && this.y < entity.y + r2;

        return instX && instY;
    }

    // События

    private instanciateAction(to: Entity) {
        if (this.name === 'bullet' && to.name === 'player' && this.parent !== to.id) {
            this.drop();
            to.newHealth(-(this.damage || 1));
        }
    }

    private drop() {
        delete GameState.entitys[this.id];
    }

    private newHealth(change: number) {
        this.hp += change;

        if (this.hp <= 0) {
            this.drop();
        }
    }
}
