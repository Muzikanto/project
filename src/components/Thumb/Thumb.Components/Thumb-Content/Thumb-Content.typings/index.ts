import {IFilmTypings} from "../../../../../reducers/Films/Films.typings";

export interface IThumbContentProps {
    film: IFilmTypings.Item;

    className?: string;
    onContentClick: () => void;
}