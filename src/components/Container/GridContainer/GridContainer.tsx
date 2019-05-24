import * as React from "react";
import {cn} from "@bem-react/classname";
import {IGridContainerProps} from "./GridContainer.typings";
import './GridContainer.css';

const cnGrid = cn('GridContainer');

class GridContainer extends React.Component<IGridContainerProps> {
    public render() {
        const {
            className,
            children,
        } = this.props;

        return (
            <section className={cnGrid( '', [className])}>
                {
                    children
                }
            </section>
        )
    }
}

export default GridContainer;
