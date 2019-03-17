import * as React from 'react';
import {Route, Switch} from "react-router";
import Footer from "../../features/Footer";
import NavBar from "../../features/NavBar";
import './App.css';

import IntroLoad from "../IntroPage/IntroPage.load";
import FrontPageLoad from "../FrontPage/FrontPage.load";
import NotFoundLoad from "../NotFoundPage/NotFoundPage.load";

const routes = [
    {url: '/page1', el: IntroLoad},
];

class App extends React.Component {
    public render() {
        return (
            <div className='PageContainer'>
                <NavBar/>
                <main className="ContentContainer">
                    <Switch>
                        <Route exact={true} path="/" component={FrontPageLoad}/>
                        {routes.map((route, i) => <Route key={i} path={route.url} component={route.el}/>)}
                        <Route component={NotFoundLoad}/>
                    </Switch>
                </main>
                <Footer/>
            </div>
        )
    }
}

export default App;
