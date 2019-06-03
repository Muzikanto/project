import * as React from 'react';
import {connect} from "react-redux";
import {IStore} from "../../../../reducers/typings";
import {IFilmsListContainerProps} from "./FilmsList.typings";
import {actionDialog} from "../../../../reducers/Dialog/Dialog.actions";
import {IFilm} from "../../../../reducers/Films/Films.typings";
import {actionShowSnackBarWarning} from "../../../../reducers/Other/Other.actions";
import {actionFavoriteFilm, actionSelectFilms} from "../../../../reducers/Films/Films.actions";
import Thumb from "../../../../components/Thumb/Thumb";
import ScrollerContainer from "../../../../components/Container/ScrollerContainer/ScrollerContainer";
import GridContainer from "../../../../components/Container/GridContainer/GridContainer";

class FilmsList extends React.Component<IFilmsListContainerProps> {
    page = 0;
    last = new Date();

    componentDidMount(): void {
        window.addEventListener('scroll', (_: Event) => {
            const bodyHeight = document.body.offsetHeight;

            if (window.scrollY + window.innerHeight > bodyHeight - 500 && new Date().getSeconds() - this.last.getSeconds() > 1) {
                this.page++;
                this.last = new Date();
                this.props.actionSelectFilms(this.page);
            }
        });
    }

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

        return arr
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
    actionSelectFilms,
};

export default connect(mapStateToProps, mapDispatchesToProps)(FilmsList);
