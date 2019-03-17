import * as React from 'react';
import {connect} from "react-redux";
import {dropSession} from "../../actions/User";
import {IStore} from "../../reducers";
import NavBarUI from "./NavBar";
import {INavBarContainer} from "./NavBar.typings";


class NavBar extends React.Component<INavBarContainer> {
    protected AppComponent = NavBarUI;

    protected items = [
        {url: '/page1', text: 'Map'},
        {url: '/page2', text: 'NotFound'},
        {url: '#', text: 'About', popup: [{url: '/page1', text: 'Map'}, {url: '/page2', text: 'NotFound'}]}];

    public render() {
        const {user} = this.props;
        const App = this.AppComponent;
        return (
            <App user={user} dropSession={this.dropSession} items={this.items}/>
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
    dropSession,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
