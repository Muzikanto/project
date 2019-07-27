import * as React from 'react';
import UI from './SnackBar'
import {ISnackBarContainerProps} from "./SnackBar.typings";
import {IStore} from "../../reducers/typings";
import {connect} from "react-redux";
import OtherActions from "../../reducers/Other/Other.actions";

class SnackBar extends React.Component<ISnackBarContainerProps> {
    public render(): React.ReactNode {
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
        this.props.ShowSnackBar(false);
    }
}

const mapStateToProps = (store: IStore) => ({
    snack_open: store.Other.snack_open,
    snack_text: store.Other.snack_text,
    snack_variant: store.Other.snack_variant,
});

const mapDispatchesToProps = {
    ShowSnackBar: OtherActions.ShowSnackBar,
};

export default connect(mapStateToProps, mapDispatchesToProps)(SnackBar);
