import Gun from "../../Gun";

class Pistol extends Gun {
    protected damage = 1;
    protected loading = 300;
    protected speed = 10;
    protected cut = {x: 10, y: 0, w: 100, h: 100};
    protected translate = {x: -17.5, y: -17.5};
    protected size = {w: 35, h: 35};

    constructor(props: { ammo?: number }) {
        super({...props, name: 'Pistol'});
    }
}

export default Pistol;
