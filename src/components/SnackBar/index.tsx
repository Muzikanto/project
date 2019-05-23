import * as React from 'react';
import UI from './SnackBar'
import {ISnackBarContainerProps} from "./SnackBar.typings";
import {IStore} from "../../reducers/typings";
import {connect} from "react-redux";
import {actionShowSnackBar} from "../../reducers/Other/Other.actions";

class SnackBar extends React.Component<ISnackBarContainerProps> {
    render(): React.ReactNode {
        const {
            snack_text,
            snack_open,
            snack_variant,
        } = this.props;
        return (
            <UI snack_text={snack_text} snack_open={snack_open} snack_variant={snack_variant} handleClose={this.handleClose}/>
        )
    }

    protected handleClose = () => {
        this.props.actionShowSnackBar({
            snack_open: false,
        });
    }
}

const mapStateToProps = (store: IStore) => ({
    snack_open: store.OtherReducer.snack_open,
    snack_text: store.OtherReducer.snack_text,
    snack_variant: store.OtherReducer.snack_variant,
});

const mapDispatchesToProps = {
    actionShowSnackBar,
};

export default connect(mapStateToProps, mapDispatchesToProps)(SnackBar);
