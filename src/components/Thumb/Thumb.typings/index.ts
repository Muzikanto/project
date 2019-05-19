import {IFilm} from "../../../reducers/Films/Films.typings";

export interface IThumbProps extends IFilm {
    onContentClick: () => void;
    onStarClick: ()=>void;
    className?: string;
}
