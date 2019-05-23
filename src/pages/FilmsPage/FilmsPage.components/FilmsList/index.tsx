import * as React from 'react';
import UI from "./FilmsList";
import {connect} from "react-redux";
import {IStore} from "../../../../reducers/typings";
import {IFilmsListContainerProps} from "./FilmsList.typings";
import {deepCopy} from "../../../../utils/copy";
import {actionDialog} from "../../../../reducers/Dialog/Dialog.actions";
import {IFilm} from "../../../../reducers/Films/Films.typings";
import {actionShowSnackBarWarning} from "../../../../reducers/Other/Other.actions";
import {actionFavoriteFilm} from "../../../../reducers/Films/Films.actions";

class FilmsList extends React.Component<IFilmsListContainerProps> {
    public render() {
        const {
            actionDialog,
            user,
            actionShowSnackBarWarning,
            actionFavoriteFilm,
        } = this.props;
        const arr = this.sort(this.props.arr);

        return (
            <UI
                user={user}
                arr={arr}
                className={this.props.className}
                onEditFilmClick={
                    (film: IFilm) => () => {
                        actionDialog({open: true, film, type: 'change_film'})
                    }
                }
                onContentClick={
                    (film: IFilm) => () => actionDialog({
                        open: true,
                        film,
                        type: 'content'
                    })}
                onStarClick={
                    (film: IFilm) => () => user ? actionDialog({
                        open: true,
                        film,
                        type: 'stars'
                    }) : actionShowSnackBarWarning('Need Authorize')}
                onFavoriteClick={
                    (film: IFilm) => () =>
                        user ? actionFavoriteFilm({
                            id: film.id,
                            is_favorite: !film.is_favorite,
                        }) : actionShowSnackBarWarning('Need Authorize')
                }
            />
        )
    }

    protected sort(arr: IFilm[]): IFilm[] {
        if (this.props.filter_sort === 'Star') {
            return deepCopy(arr)
                .sort((a: IFilm, b: IFilm) => b.stars - a.stars);
        } else {
            return deepCopy(arr)
                .sort((a: IFilm, b: IFilm) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
