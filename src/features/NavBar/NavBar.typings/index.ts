import {IUser} from "../../../reducers/UserReducer";
import {IdropSession} from "../../../actions/User/User.typings";


interface INavBarItem {
    url: string;
    text: string;
    popup?: Array<{ url: string, text: string }>;
}

interface INavBar {
    user: IUser | null;
    dropSession: IdropSession;
    items: INavBarItem[];
}

type INavBarContainer = {
    user: IUser | null;
    dropSession: IdropSession;
};



export {
    INavBar,
    INavBarItem,
    INavBarContainer
}
