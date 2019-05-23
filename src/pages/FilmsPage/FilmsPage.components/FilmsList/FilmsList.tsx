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
            className,
            onStarClick,
            onContentClick,
            onEditFilmClick,
            arr,
        } = this.props;

        return (
            <div className={cnFilms('Container', [className])}>
                {
                    arr.map((film: IFilm, index: number) =>
                        <Thumb
                            film={film}
                            menuItems={
                                [{
                                    text: 'Редактировать',
                                    action: onEditFilmClick(film),
                                }]
                            }
                            onContentClick={onContentClick(film)}
                            onStarClick={film.set_star ? () => {} : onStarClick(film)}
                            key={'Thumb' + index}
                            className={cnFilms('Item')}
                        />)
                }
            </div>
        )
    }
}

export default FilmsList
