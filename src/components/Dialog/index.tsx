import * as React from "react";
import UI from "./Dialog";
import {IStore} from "../../reducers/typings";
import {connect} from "react-redux";
import {IDialogContainerProps} from "./Dialog.typings";
import DialogActions from '../../reducers/Dialog/Dialog.actions'

class Dialog extends React.Component<IDialogContainerProps> {
    public render(): React.ReactNode {
        const {
            open,
            title,
            children,
            dialogCoreProps,
            dialogContentProps,
        } = this.props;

        return (
            <UI
                title={title}
                handleClose={this.handleClose}
                dialogCoreProps={{
                    open,
                    ...dialogCoreProps,
                }}
                dialogContentProps={dialogContentProps}
            >
                {children}
            </UI>
        )
    }

    private handleClose = () => {
        this.props.onClose && this.props.onClose();
        this.props.DialogBase({open: false, type: null});
    };
}

const mapStateToProps = (store: IStore) => ({
    open: store.Dialog.open,
});

const mapDispatchesToProps = {
    DialogBase: DialogActions.base,
};

export default connect(mapStateToProps, mapDispatchesToProps)(Dialog);
