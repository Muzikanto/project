import * as React from 'react';
import {connect} from "react-redux";
import UserActions from "../../../reducers/User/User.actions";
import UI from "./NavBar";
import {INavBarContainerProps} from "./NavBar.typings";
import {IStore} from "../../../reducers/typings";

class NavBar extends React.Component<INavBarContainerProps> {
    protected items = [
        {url: '/films', text: 'Films'},
        {url: '#', text: 'Test', popup: [{url: '#', text: 'Test1'}, {url: '#', text: 'Test2'}]},
    ];

    public render() {
        const {user} = this.props;

        return (
            <UI user={user} dropSession={this.dropSession} items={this.items}/>
        )
    }

    private dropSession = () => {
        this.props.Logout(true);
    };
}

const mapStateToProps = (state: IStore) => ({
    user: state.User.user,
});

const mapDispatchToProps = {
    Logout: UserActions.Logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
