import * as React from 'react';
import {cn} from "@bem-react/classname";
import {IFilmsListProps} from "./FilmsList.typings";
import Thumb from "../../../../components/Thumb/Thumb";
import './FilmsList.css';
import {IFilm} from "../../../../reducers/Films/Films.typings";

const cnFilms = cn('FilmsList');

class FilmsList extends React.Component<IFilmsListProps> {
    public render() {
        const {
            onStarClick,
            onContentClick,
            className
        } = this.props;

        return (
            <div className={cnFilms('Container', [className])}>
                {
                    this.props.arr.map((props: IFilm, index: number) =>
                        <Thumb
                            onContentClick={onContentClick(props)}
                            onStarClick={props.isLiked ? () => {
                            } : onStarClick(props)}
                            trailer={props.trailer}
                            date={props.date}
                            stars={props.stars}
                            share={props.share}
                            genres={props.genres}
                            isLiked={props.isLiked}
                            id={props.id}
                            avatar={props.avatar}
                            title={props.title}
                            key={'Thumb' + index}
                            url={props.url}
                            className={cnFilms('Item')}/>)
                }
            </div>
        )
    }
}

export default FilmsList
