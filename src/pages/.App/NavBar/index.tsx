import * as React from 'react';
import {connect} from "react-redux";
import {actionDropSession} from "../../../actions/User";
import UI from "./NavBar";
import {INavBarContainerProps} from "./NavBar.typings";
import {IStore} from "../../../reducers/typings";

class NavBar extends React.Component<INavBarContainerProps> {
    protected items = [
        {url: '/films', text: 'Films'},
        {url: '/page1', text: 'Map'},
        {url: '#', text: 'Games', popup: [{url: '/games/chess', text: 'Chess'}, {url: '/games/test', text: 'Test'}]},
        {url: '/page2', text: 'NotFound'},
    ];

    public render() {
        const {user} = this.props;

        return (
            <UI user={user} dropSession={this.dropSession} items={this.items}/>
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
