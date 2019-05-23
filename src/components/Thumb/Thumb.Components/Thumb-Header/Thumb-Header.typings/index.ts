import {IThumbMenuitems} from "../../Thumb-Menu/Thumb-Menu.typings";
import {IFilm} from "../../../../../reducers/Films/Films.typings";

export interface IThumbHeaderProps {
    film: IFilm;
    className?: string;

    menuItems: IThumbMenuitems;
}
