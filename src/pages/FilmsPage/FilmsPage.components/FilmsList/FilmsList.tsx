import * as React from 'react';
import {cn} from "@bem-react/classname";
import {IFilmsListProps} from "./FilmsList.typings";
import Thumb from "../../../../components/Thumb/Thumb";
import './FilmsList.css';
import {IFilm} from "../../../../reducers/Films/Films.typings";

const cnFilms = cn('FilmsList');

class FilmsList extends React.Component<IFilmsListProps> {
    public render() {
        return (
            <div className={cnFilms('Container', [this.props.className])}>
                {
                    this.props.arr.map((props: IFilm, index: number) =>
                        <Thumb
                            onContentClick={() => this.props.actionDialogOpen({
                                open: true,
                                value: 10,
                                id: props.id,
                                type: 'content'
                            })}
                            onStarClick={() => this.props.actionDialogOpen({
                                open: true,
                                value: props.stars,
                                id: props.id,
                                type: 'stars'
                            })}
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
