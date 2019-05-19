import * as React from 'react';
import {cn} from "@bem-react/classname";
import {CreateMap, IMap} from "./api/init";
import './Map.css';

const cnMapCont = cn('Map');

interface IMapCont {
    id: string;
}

class Map extends React.Component<IMapCont> {
    public container: any;
    public state: { map: IMap | null } = {map: null};

    constructor(props: any) {
        super(props);
        this.container = React.createRef();
    }

    public componentDidMount() {
        CreateMap(this.props.id, (map: IMap) => {
            this.setState({map});
            // map.geoObjects.add(new ymaps.Placemark([55.684758, 37.738521], {
            //     balloonContent: 'the color of <strong>the water on Bondi Beach</strong>',
            //     iconCaption: 'text'
            // }))
        });
    };

    public render() {
        return (
            <div ref={this.container} className={cnMapCont()} id={this.props.id}/>
        )
    };
}


export default Map;
