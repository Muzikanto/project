import {IFilm, IFilmsFiltersOptions} from "../../../../../reducers/Films/Films.typings";
import {actionDialogOpen, IactionDialogOpen} from "../../../../../actions/Dialog";

export interface IFilmsListProps {
    className?: string;

    // stateToProps
    arr: IFilm[];

    onContentClick: (film: IFilm) => () => void;
    onStarClick: (film: IFilm) => () => void;
}

export interface IFilmsListContainerProps {
    className?: string;
    arr: IFilm[];
    filters: IFilmsFiltersOptions;
    actionDialogOpen: IactionDialogOpen;
}
