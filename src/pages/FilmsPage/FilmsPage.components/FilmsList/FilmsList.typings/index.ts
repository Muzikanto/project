import {IFilm, IFilmsFiltersOptions} from "../../../../../reducers/Films/Films.typings";
import {actionDialogOpen, IactionDialogOpen} from "../../../../../actions/Dialog";
import {IThumbMenuitems} from "../../../../../components/Thumb/Thumb.Components/Thumb-Menu/Thumb-Menu.typings";

export interface IFilmsListProps {
    className?: string;

    arr: IFilm[];

    headerProps: {
        menuItems: IThumbMenuitems;
    }
    contentProps: {
        onContentClick: (film: IFilm) => () => void;
    }
    footerProps: {
        onStarClick: (film: IFilm) => () => void;
    }
}

export interface IFilmsListContainerProps {
    className?: string;

    arr: IFilm[];
    filters: IFilmsFiltersOptions;

    actionDialogOpen: IactionDialogOpen;
}
