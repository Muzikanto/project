import * as React from 'react';
import {cn} from "@bem-react/classname";
import {IFilmsListProps} from "./FilmsList.typings";
import {IThumbProps} from "../../../../components/Thumb/Thumb.typings";
import Thumb from "../../../../components/Thumb/Thumb";
import './FilmsList.css';

const cnFilms = cn('FilmsList');

class FilmsList extends React.Component<IFilmsListProps> {
    public render() {
        return (
            <div className={cnFilms('Container')}>
                {
                    this.props.arr.map((props: IThumbProps, index: number) =>
                        <Thumb
                            {...props}
                            key={'Thumb' + index}
                            url={props.url}
                            className={cnFilms('Item')}/>)
                }
            </div>
        )
    }
}

export default FilmsList
