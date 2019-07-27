import {IThumbMenuitems} from "../../Thumb-Menu/Thumb-Menu.typings";
import {IFilmTypings} from "../../../../../reducers/Films/Films.typings";

export interface IThumbHeaderProps {
    film: IFilmTypings.Item;
    className?: string;

    menuItems: IThumbMenuitems;
}
