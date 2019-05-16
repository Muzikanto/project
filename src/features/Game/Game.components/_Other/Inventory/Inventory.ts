import Gun from "../../Entity/Entity.childs/Gun/Gun";
import {GameState} from "../../State/State";
import {Enemy} from "../../Entity/Entity.childs/Enemy/Enemy";

class Inventory {
    public items: { [key: string]: Gun } = {};
    protected emptyPosition: number[] = [];
    protected parent: Enemy;

    constructor(parent: Enemy, items: Gun[] = []) {
        this.parent = parent;

        for (let i = 0; i < 10; i++) {
            this.emptyPosition.push(i);
        }
        for(const v of items) {
            this.addToInventory(v);
        }
    }

    public addToInventory(item: Gun) {
        if(this.emptyPosition.length > 0) {
            this.items[this.emptyPosition[0]] = item;
            item.setPlayer(this.parent);
            this.emptyPosition.shift();
        }
    }

    public dropItems() {
        for(const v in this.items) {
            this.items[v].setPlayer(undefined);
            GameState.createEntity(this.items[v]);
        }
    }
}

export default Inventory;
