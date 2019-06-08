import {IOtherSnackBarOptions} from "../../../reducers/Other/Other.typings";
import {IActionType} from "../../../reducers/typings";
import {actionShowSnackBar} from "../../../reducers/Other/Other.actions";

export interface ISnackBarProps extends IOtherSnackBarOptions{
    handleClose: () => void;
}

export interface ISnackBarContainerProps extends IOtherSnackBarOptions{
    actionShowSnackBar: IActionType<typeof actionShowSnackBar>;
}
