import * as React from 'react';
import UI from "./FilmsList";
import {connect} from "react-redux";
import {IStore} from "../../../../reducers/typings";
import {IFilmsListContainerProps} from "./FilmsList.typings";
import {deepCopy} from "../../../../utils/copy";
import {actionDialogOpen} from "../../../../actions/Dialog";
import {IFilm} from "../../../../reducers/Films/Films.typings";

class FilmsPage extends React.Component<IFilmsListContainerProps> {
    public render() {
        const arr = this.sort(this.props.arr);

        return (
            <UI arr={arr} className={this.props.className} actionDialogOpen={this.props.actionDialogOpen}/>
        )
    }

    protected sort(arr: IFilm[]): IFilm[] {
        if (this.props.filters.sort === 'Star') {
            return deepCopy(arr).sort((a: IFilm, b: IFilm) => b.stars - a.stars)
        } else {
            return deepCopy(arr);
        }
    }
}

const mapStateToProps = (store: IStore) => ({
    arr: store.FilmsReducer.arr,
    filters: store.FilmsReducer.filters,
});

const mapDispatchesToProps = {
    actionDialogOpen,
};

export default connect(mapStateToProps, mapDispatchesToProps)(FilmsPage);
