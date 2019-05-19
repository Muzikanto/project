import {IUser} from "../../../../reducers/User/User.typings";
import {IactionDropSession} from "../../../../actions/User/User.typings";

export interface INavBarItem {
    url: string;
    text: string;
    popup?: Array<{ url: string, text: string, isHref?: boolean}>;
}

export interface INavBarProps {
    user: IUser | null;
    dropSession: IactionDropSession;
    items: INavBarItem[];
}

export type INavBarContainerProps = {
    user: IUser | null;
    actionDropSession: IactionDropSession;
};
