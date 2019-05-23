import {IFilm} from "../../../../../reducers/Films/Films.typings";

export interface IThumbContentProps {
    film: IFilm;
    className?: string;
    onContentClick: () => void;
}