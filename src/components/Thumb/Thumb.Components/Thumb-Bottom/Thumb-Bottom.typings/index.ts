import {IFilm} from "../../../../../reducers/Films/Films.typings";

export interface IThumbBottomProps {
    film: IFilm;

    onStarClick: () => void;
}
