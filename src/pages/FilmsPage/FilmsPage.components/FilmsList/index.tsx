import * as React from 'react';
import UI from "./FilmsList";
import {connect} from "react-redux";
import {IStore} from "../../../../reducers/typings";
import {IFilmsListContainerProps} from "./FilmsList.typings";
import {deepCopy} from "../../../../utils/copy";
import {actionDialog} from "../../../../actions/Dialog";
import {IFilm} from "../../../../reducers/Films/Films.typings";

class FilmsList extends React.Component<IFilmsListContainerProps> {
    public render() {
        const {actionDialog} = this.props;
        const arr = this.sort(this.props.arr);

        return (
            <UI
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
                    (film: IFilm) => () => actionDialog({
                        open: true,
                        film,
                        type: 'stars'
                    })}
            />
        )
    }

    protected sort(arr: IFilm[]): IFilm[] {
        if (this.props.filter_sort === 'Star') {
            return deepCopy(arr)
                .sort((a: IFilm, b: IFilm) => b.stars - a.stars);
        } else {
            return deepCopy(arr)
                .sort((a: IFilm, b: IFilm) => b.date - a.date);
        }
    }
}

const mapStateToProps = (store: IStore) => ({
    arr: store.FilmsReducer.arr,
    filter_sort: store.FilmsReducer.filter_sort,
});

const mapDispatchesToProps = {
    actionDialog,
};

export default connect(mapStateToProps, mapDispatchesToProps)(FilmsList);
