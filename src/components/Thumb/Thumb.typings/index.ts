import {IFilm} from "../../../reducers/Films/Films.typings";
import {IThumbMenuitems} from "../Thumb.Components/Thumb-Menu/Thumb-Menu.typings";
import {IUser} from "../../../reducers/User/User.typings";

export interface IThumbProps {
    className?: string;

    film: IFilm;
    user: IUser | null;
    menuItems: IThumbMenuitems;

    onContentClick: () => void;
    onStarClick: () => void;
    onFavoriteClick: () => void;
}
