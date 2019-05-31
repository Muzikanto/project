import * as React from 'react';
import {cn} from "@bem-react/classname";
import {IHexagonProps} from "./Hexagon.typings";
import './Hexagon.scss';

const cnHexagon = cn('Hexagon');

class Hexagon extends React.Component<IHexagonProps> {
    render(): React.ReactNode {
        const {
            className,
            text,
            gold,
        } = this.props;

        return (
            <div className={cnHexagon({gold: Boolean(gold)}, [className])}>
                <span className={cnHexagon('Text')}>{text}</span>
            </div>
        )
    }
}

export default Hexagon;
