import {IactionShowSnackBar} from "../../../reducers/Other/Other.actions";
import {IOtherSnackBarOptions} from "../../../reducers/Other/Other.typings";

export interface ISnackBarProps extends IOtherSnackBarOptions{
    handleClose: () => void;
}

export interface ISnackBarContainerProps extends IOtherSnackBarOptions{
    actionShowSnackBar: IactionShowSnackBar;
}


