import {IFilm, IFilmsFiltersOptions} from "../../../../../reducers/Films/Films.typings";
import {IactionDialogOpen} from "../../../../../actions/Dialog";

export interface IFilmsListProps {
    className?: string;

    // stateToProps
    arr: IFilm[];

    actionDialogOpen: IactionDialogOpen;
}

export interface IFilmsListContainerProps extends IFilmsListProps {
    filters: IFilmsFiltersOptions;
}
