import {IFilmTypings} from "../../../../../reducers/Films/Films.typings";
import {IUser} from "../../../../../reducers/User/User.typings";

export interface IThumbBottomProps {
    film: IFilmTypings.Item;
    user: IUser | null;

    onStarClick: () => void;
    onFavoriteClick: () => void;
}
