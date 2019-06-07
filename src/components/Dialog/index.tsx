import * as React from "react";
import UI from "./Dialog";
import {IStore} from "../../reducers/typings";
import {actionDialog} from "../../reducers/Dialog/Dialog.actions";
import {connect} from "react-redux";
import {IDialogContainerProps} from "./Dialog.typings";

class Dialog extends React.Component<IDialogContainerProps> {
    render(): React.ReactNode {
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
        this.props.actionDialog({open: false, type: null});
    };
}

const mapStateToProps = (store: IStore) => ({
    open: store.DialogReducer.open,
});

const mapDispatchesToProps = {
    actionDialog,
};

export default connect(mapStateToProps, mapDispatchesToProps)(Dialog);
