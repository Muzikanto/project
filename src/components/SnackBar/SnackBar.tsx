import * as React from 'react';
import {SnackbarContent, Snackbar} from "@material-ui/core";
import {ISnackBarProps} from "./SnackBar.typings";
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {cn} from "@bem-react/classname";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import './SnackBar.css';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const cnSnackBar = cn('SnackBar');

class SnackBar extends React.Component<ISnackBarProps> {
    render() {
        const {
            snack_open,
            snack_text,
            handleClose,
            snack_variant,
        } = this.props;
        const Icon = variantIcon['info'];

        return (
            <Snackbar
                autoHideDuration={3000}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                open={snack_open}
                onClose={handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
            >
                <SnackbarContent
                    message={
                        <span id='message-id' className={cnSnackBar('Message')}>
                            <Icon className={cnSnackBar('Icon')}/>
                            {snack_text}
                        </span>
                    }
                    className={cnSnackBar({variant: snack_variant})}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={handleClose}
                        >
                            <CloseIcon/>
                        </IconButton>,
                    ]}
                />
            </Snackbar>
        );
    }
}

export default SnackBar;