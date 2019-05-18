import * as React from 'react';
import UI from "./FilmsList";
import {connect} from "react-redux";
import {IStore} from "../../../../reducers/typings";
import {IFilmsListProps} from "./FilmsList.typings";

class FilmsPage extends React.Component<IFilmsListProps> {
    public render() {
        return (
            <UI arr={this.props.arr}/>
        )
    }
}

const mapStateToProps = (store: IStore) => ({
   arr: store.FilmsReducer.arr,
});

export default connect(mapStateToProps, {})(FilmsPage);
