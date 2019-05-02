import * as React from 'react';
import {connect} from "react-redux";
import {actionDropSession} from "../../actions/User";
import NavBarUI from "./NavBar";
import {INavBarContainerProps} from "./NavBar.typings";
import {IStore} from "../../reducers/typings";

class NavBar extends React.Component<INavBarContainerProps> {
    protected items = [
        {url: '/page1', text: 'Map'},
        {url: '/page2', text: 'NotFound'},
        {url: '#', text: 'About', popup: [{url: '/page1', text: 'Map'}, {url: '/page2', text: 'NotFound'}]}];

    public render() {
        const {user} = this.props;

        return (
            <NavBarUI user={user} dropSession={this.dropSession} items={this.items}/>
        )
    }

    private dropSession = () => {
        this.props.actionDropSession();
    };
}

const mapStateToProps = (state: IStore) => ({
    user: state.User.user,
});

const mapDispatchToProps = {
    actionDropSession,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
