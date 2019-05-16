import Gun from "../../Gun";

class Rifle extends Gun {
    public loading = 100;
    protected damage = 0.5;
    protected speed = 20;

    protected cut = {x: 10, y: 100, w: 180, h:100};
    protected translate = {x: -17.5, y: -10};
    protected size = {w: 50, h: 30};

    constructor(props: {ammo?: number}) {
        super({...props, name: 'Rifle'});
    }
}

export default Rifle;
