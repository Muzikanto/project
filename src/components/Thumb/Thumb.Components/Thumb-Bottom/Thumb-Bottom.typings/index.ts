import {IFilm} from "../../../../../reducers/Films/Films.typings";
import {IUser} from "../../../../../reducers/User/User.typings";

export interface IThumbBottomProps {
    film: IFilm;
    user: IUser | null;

    onStarClick: () => void;
    onFavoriteClick: () => void;
}
