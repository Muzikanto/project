import * as React from "react";
import {IDialogFavoritesContainerProps} from "./Dialog.typings";
import {connect} from "react-redux";
import {IStore} from "../../../../reducers/typings";
import {actionDialogOpen} from "../../../../actions/Dialog";
import UI from "./Dialog";
import {actionFilmsSetStar} from "../../../../actions/Films";

class DialogFavorites extends React.Component<IDialogFavoritesContainerProps> {
    render(): React.ReactNode {
        return (
            <UI
                open={this.props.open}
                value={this.props.value}
                handleClose={this.handleClose}
                handleChange={this.handleChange}
            />
        );
    }

    private handleChange = (star: number) => () => {
        if (this.props.id) {
            this.props.actionDialogOpen({open: false, value: 5, id: null});
            this.props.actionFilmsSetStar({star, id: this.props.id});
        }
    };

    private handleClose = () => {
        this.props.actionDialogOpen({open: false, value: 5, id: null});
    };
}

const mapStateToProps = (store: IStore) => ({
    open: store.DialogReducer.open,
    value: store.DialogReducer.value,
    id: store.DialogReducer.id,
});

const mapDispatchesToProps = {
    actionDialogOpen,
    actionFilmsSetStar,
};

export default connect(mapStateToProps, mapDispatchesToProps)(DialogFavorites);
