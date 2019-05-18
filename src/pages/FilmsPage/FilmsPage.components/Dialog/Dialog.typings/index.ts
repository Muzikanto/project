import {IactionDialogOpen} from "../../../../../actions/Dialog";
import {IactionFilmsSetStar} from "../../../../../actions/Films";

export interface IDialogFavoritesProps {
    value: number;
    open: boolean;

    handleClose: () => void;
    handleChange: (value: number) => () => void;
}

export interface IDialogFavoritesContainerProps {
    id: string | null;
    value: number
    open: boolean;

    actionDialogOpen: IactionDialogOpen;
    actionFilmsSetStar: IactionFilmsSetStar;
}