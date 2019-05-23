import * as React from 'react';
import {Snackbar} from "@material-ui/core";
import {ISnackBarProps} from "./SnackBar.typings";

class SnackBar extends React.Component<ISnackBarProps> {
    render() {
        const {open, text, handleClose} = this.props;

        return (
            <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                open={open}
                onClose={handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id='message-id'>${text}</span>}
            />
        );
    }
}

export default SnackBar;