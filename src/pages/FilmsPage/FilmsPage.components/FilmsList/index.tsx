import * as React from 'react';
import {connect} from "react-redux";
import {IStore} from "../../../../reducers/typings";
import {IFilmsListContainerProps} from "./FilmsList.typings";
import DialogActions from "../../../../reducers/Dialog/Dialog.actions";
import {IFilmTypings} from "../../../../reducers/Films/Films.typings";
import OtherActions from "../../../../reducers/Other/Other.actions";
import FilmActions from "../../../../reducers/Films/Films.actions";
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
                this.props.Select({page: this.page});
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
            SetFavorite,
            SnackBarWarning,
            DialogWithFilm,
        } = this.props;

        return arr
            .map((item: IFilmTypings.Item) =>
                <Thumb
                    film={item}
                    menuItems={
                        [{
                            text: local.Edit,
                            action: () => DialogWithFilm({dialog: {open: true, type: 'change_film'}, item}),
                        }]
                    }
                    user={user}
                    onContentClick={() => DialogWithFilm({dialog: {open: true, type: 'content'}, item})}
                    onStarClick={item.set_star ? () => {} :
                        () => {
                            if (user) {
                                DialogWithFilm({dialog: {open: true, type: 'stars'}, item});
                            } else {
                                SnackBarWarning(local['Need Authorize'])
                            }
                        }}
                    onFavoriteClick={() =>
                        user ? SetFavorite({
                            id: item.id,
                            is_favorite: !item.is_favorite,
                        }) : SnackBarWarning(local['Need Authorize'])}
                    key={'Thumb' + item.id}
                />);
    }
}

const mapStateToProps = (store: IStore) => ({
    arr: store.Films.arr,
    sort: store.Films.sort,
    user: store.User.user,
});

const mapDispatchesToProps = {
    DialogBase: DialogActions.base,
    SnackBarWarning: OtherActions.ShowSnackBarWarning,
    SetFavorite: FilmActions.SetFavorite,
    Select: FilmActions.Select,
    DialogWithFilm: FilmActions.DialogWithFilm,
};

export default connect(mapStateToProps, mapDispatchesToProps)(FilmsList);
