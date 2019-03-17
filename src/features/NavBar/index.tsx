import * as React from 'react';
import {connect} from "react-redux";
import {dropSession, setUser} from "../../actions/User";
import {IdropSession} from "../../actions/User/User.typings";
import {IUser} from "../../reducers/UserReducer";
import {IStore} from "../../reducers/index";
import NavBarUI from "./NavBar";


interface INavBar {
    user: IUser;
    dropSession: IdropSession;
}

class NavBar extends React.Component<INavBar> {
    protected AppComponent = NavBarUI;

    protected items = [
        {url: '/page1', text: 'Map'},
        {url: '/page2', text: 'NotFound'},
        {url: '#', text: 'About', popup: [{url: '/page1', text: 'Map'}, {url: '/page2', text: 'NotFound'}]}];

    public render() {
        const {user} = this.props;
        return (
            <this.AppComponent user={user} dropSession={this.dropSession} items={this.items}/>
        )
    }
    private dropSession = () => {
        this.props.dropSession();
    };
}

const mapStateToProps = (state: IStore) => ({
    user: state.UserReducer.user,
});

const mapDispatchToProps = {
    setUser,
    dropSession,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar as any);
