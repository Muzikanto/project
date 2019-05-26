import * as React from 'react';
import {connect} from "react-redux";
import {IStore} from "../../../../reducers/typings";
import {IFilmsListContainerProps} from "./FilmsList.typings";
import {actionDialog} from "../../../../reducers/Dialog/Dialog.actions";
import {IFilm} from "../../../../reducers/Films/Films.typings";
import {actionShowSnackBarWarning} from "../../../../reducers/Other/Other.actions";
import {actionFavoriteFilm} from "../../../../reducers/Films/Films.actions";
import Thumb from "../../../../components/Thumb/Thumb";
import ScrollerContainer from "../../../../components/Container/ScrollerContainer/ScrollerContainer";
import GridContainer from "../../../../components/Container/GridContainer/GridContainer";

class FilmsList extends React.Component<IFilmsListContainerProps> {
    public render() {
        const {
            className,
            type,
        } = this.props;

        const thumbs = this.getThumbs();

        if (type === 'grid') {
            return (
                <GridContainer className={className}>
                    {thumbs}
                </GridContainer>
            );
        } else {
            return (
                <ScrollerContainer className={className}>
                    {thumbs}
                </ScrollerContainer>
            );
        }
    }

    protected getThumbs() {
        const {
            arr,
            user,
            actionDialog,
            actionFavoriteFilm,
            actionShowSnackBarWarning,
        } = this.props;

        return this.sort(arr)
            .map((film: IFilm) =>
                <Thumb
                    film={film}
                    menuItems={
                        [{
                            text: 'Редактировать',
                            action: () => {
                                actionDialog({open: true, film, type: 'change_film'})
                            },
                        }]
                    }
                    user={user}
                    onContentClick={() => actionDialog({
                        open: true,
                        film,
                        type: 'content'
                    })}
                    onStarClick={film.set_star ? () => {
                    } : () => user ? actionDialog({
                        open: true,
                        film,
                        type: 'stars'
                    }) : actionShowSnackBarWarning('Need Authorize')}
                    onFavoriteClick={() =>
                        user ? actionFavoriteFilm({
                            id: film.id,
                            is_favorite: !film.is_favorite,
                        }) : actionShowSnackBarWarning('Need Authorize')}
                    key={'Thumb' + film.id}
                />);
    }

    protected sort(arr: IFilm[]): IFilm[] {
        if (this.props.filter_sort === 'Star') {
            return [...arr]
                .sort((a: IFilm, b: IFilm) => b.stars - a.stars);
        } else {
            return [...arr]
                .sort((a: IFilm, b: IFilm) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());
        }
    }
}

const mapStateToProps = (store: IStore) => ({
    arr: store.FilmsReducer.arr,
    filter_sort: store.FilmsReducer.filter_sort,
    user: store.User.user,
});

const mapDispatchesToProps = {
    actionDialog,
    actionShowSnackBarWarning,
    actionFavoriteFilm,
};

export default connect(mapStateToProps, mapDispatchesToProps)(FilmsList);
