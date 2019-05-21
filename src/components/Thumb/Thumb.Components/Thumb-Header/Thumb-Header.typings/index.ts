import {IThumbMenuitems} from "../../Thumb-Menu/Thumb-Menu.typings";

export interface IThumbHeaderProps {
    avatar: string;
    title: string;
    date: string;
    className?: string;

    menuItems: IThumbMenuitems;
}
