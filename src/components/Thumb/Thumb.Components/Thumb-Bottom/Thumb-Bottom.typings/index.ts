import {IactionDialogOpen} from "../../../../../actions/Dialog";

export interface IThumbBottomProps {
    isLiked: boolean;
    share: number;
    stars: number;
}

export interface IThumbBottomPropsFromContainer {
    setIsFavorite: () => void;
}

export interface IThumbBottomContainerProps extends IThumbBottomProps {
    id: string;

    actionDialogOpen: IactionDialogOpen;
}
