import * as React from 'react';
import {connect} from "react-redux";
import {IStore} from "../../../../reducers/typings";
import {IFilmsListContainerProps} from "./FilmsList.typings";
import {actionDialog, actionDialogWithFilm} from "../../../../reducers/Dialog/Dialog.actions";
import {IFilm} from "../../../../reducers/Films/Films.typings";
import {actionShowSnackBarWarning} from "../../../../reducers/Other/Other.actions";
import {actionFavoriteFilm, actionSelectFilms} from "../../../../reducers/Films/Films.actions";
import Thumb from "../../../../components/Thumb/Thumb";
import ScrollerContainer from "../../../../components/Container/ScrollerContainer/ScrollerContainer";
import GridContainer from "../../../../components/Container/GridContainer/GridContainer";
import local from "../../FilmsPage.strings";

class FilmsList extends React.Component<IFilmsListContainerProps> {
    private page = 0;
    private last = new Date();

    public componentDidMount(): void {
        window.addEventListener('scroll', (_: Event) => {
            const bodyHeight = document.body.offsetHeight;

            if (window.scrollY + window.innerHeight > bodyHeight - 500 && new Date().getSeconds() - this.last.getSeconds() > 1) {
                this.page++;
                this.last = new Date();
                this.props.actionSelectFilms({page: this.page});
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
            actionFavoriteFilm,
            actionShowSnackBarWarning,
            actionDialogWithFilm,
        } = this.props;

        return arr
            .map((film: IFilm) =>
                <Thumb
                    film={film}
                    menuItems={
                        [{
                            text: local.Edit,
                            action: () => actionDialogWithFilm({dialog: {open: true, type: 'change_film'}, film}),
                        }]
                    }
                    user={user}
                    onContentClick={() => actionDialogWithFilm({dialog: {open: true, type: 'content'}, film})}
                    onStarClick={film.set_star ? () => {
                        } :
                        () => {
                            if (user) {
                                actionDialogWithFilm({dialog: {open: true, type: 'stars'}, film});
                            } else {
                                actionShowSnackBarWarning(local['Need Authorize'])
                            }
                        }}
                    onFavoriteClick={() =>
                        user ? actionFavoriteFilm({
                            id: film.id,
                            is_favorite: !film.is_favorite,
                        }) : actionShowSnackBarWarning(local['Need Authorize'])}
                    key={'Thumb' + film.id}
                />);
    }
}

const mapStateToProps = (store: IStore) => ({
    arr: store.FilmsReducer.arr,
    sort: store.FilmsReducer.sort,
    user: store.User.user,
});

const mapDispatchesToProps = {
    actionDialog,
    actionShowSnackBarWarning,
    actionFavoriteFilm,
    actionSelectFilms,
    actionDialogWithFilm,
};

export default connect(mapStateToProps, mapDispatchesToProps)(FilmsList);
