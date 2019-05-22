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
                    arr.map((props: IFilm, index: number) =>
                        <Thumb
                            menuItems={
                                [{
                                    text: 'Редактировать',
                                    action: onEditFilmClick(props),
                                }]
                            }
                            onContentClick={onContentClick(props)}
                            onStarClick={props.set_star ? () => {} : onStarClick(props)}
                            trailer_id={props.trailer_id}
                            date={props.date}
                            stars={props.stars}
                            is_favorite={props.is_favorite}
                            genres={props.genres}
                            set_star={props.set_star}
                            id={props.id}
                            avatar={props.avatar}
                            name={props.name}
                            key={'Thumb' + index}
                            image_src={props.image_src}
                            className={cnFilms('Item')}
                        />)
                }
            </div>
        )
    }
}

export default FilmsList
