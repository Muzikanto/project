import {IUser} from "../../../reducers/UserReducer";


interface INavBarItem {
    url: string;
    text: string;
    popup?: Array<{ url: string, text: string }>;
}

interface INavBar {
    user: IUser;
    dropSession: () => void;
    items: INavBarItem[];
}

export {
    INavBar,
    INavBarItem
}
