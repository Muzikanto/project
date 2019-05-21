import {IFilm} from "../../../reducers/Films/Films.typings";
import {IThumbMenuitems} from "../Thumb.Components/Thumb-Menu/Thumb-Menu.typings";

export interface IThumbProps extends IFilm {
    onContentClick: () => void;
    onStarClick: ()=>void;
    menuItems: IThumbMenuitems;
    className?: string;
}
