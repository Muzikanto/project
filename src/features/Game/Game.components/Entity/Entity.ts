import {IVector2D} from "../../Game.typings";
import Game from "../../Game";
import {IEntityProps} from "./Entity.typings";
import {GameState} from "../State/State";

export class Entity {
    public x: number;
    public y: number;

    public isStatic: boolean;
    public start: IVector2D | undefined;
    public target: IVector2D | undefined;
    public speed: number | undefined;

    public id: string;
    public parent: string | undefined;
    public name: string;

    public radius: number;
    public hp: number;

    constructor(props: IEntityProps) {
        const {entitysID} = GameState;
        const id = props.name + entitysID;
        GameState.entitysID++;

        this.x = props.x;
        this.y = props.y;
        this.isStatic = Boolean(props.isStatic);
        this.speed = props.speed;
        this.target = props.target;
        this.start = props.start;

        this.id = id;
        this.parent = props.parent;
        this.name = props.name;

        this.radius = props.radius || 5;
        this.hp = props.hp || 1;
    }


    public create() {
        GameState.entitys[this.id] = this;
    }

    public update(ctx: CanvasRenderingContext2D): void {
        if (!this.isStatic) {
            this.moveToTarget();
            this.checkInstanciateEntitys();
        }

        this.draw(ctx);
    }

    //

    private moveToTarget(): void {
        if (this.start && this.target && this.speed) {
            const {speed, target, start} = this;

            const d1 = target.x - start.x;
            const d2 = target.y - start.y;

            // Уравниваем длинну вектора
            const k = Math.sqrt(d1 ** 2 + d2 ** 2);

            const dx = (d1 / k) * speed;
            const dy = (d2 / k) * speed;

            this.x += dx;
            this.y += dy;

            if (this.checkExitOfCanvas()) {
                this.drop();
            }
        }
    }

    private draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }

    // Столкновения

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

    private checkInstanciateEntitys() {
        const list = GameState.entitys;

        for (const name in list) {
            if (name !== this.id) {
                if (this.checkInstanciate(list[name])) {
                    list[name].instanciateAction(this);
                    this.instanciateAction(list[name]);
                }
            }
        }
    }

    // События

    private instanciateAction(to: Entity) {
        if (this.name === 'bullet' && to.name === 'player') {
            this.drop();
            to.newHealth(-1);
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
