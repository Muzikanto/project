import {IUser} from "../../../../reducers/User/User.typings";
import {IActionType} from "../../../../reducers/typings";
import UserActions from "../../../../reducers/User/User.actions";

export interface INavBarItem {
    url: string;
    text: string;
    popup?: Array<{ url: string, text: string, isHref?: boolean }>;
}

export interface INavBarProps {
    user: IUser | null;
    dropSession: () => void;
    items: INavBarItem[];
}

export interface INavBarContainerProps {
    user: IUser | null;
    Logout: IActionType<typeof UserActions.Logout>;
}
