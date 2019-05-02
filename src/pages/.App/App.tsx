import * as React from 'react';
import {Route, Switch} from "react-router";
import Footer from "../../features/Footer";
import NavBar from "../../features/NavBar";
import FrontPage from "../FrontPage/FrontPage";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import AppRoutes from "./AppRoutes";
import './App.css';

class App extends React.Component {
    public render() {
        return (
            <div className='PageContainer'>
                <NavBar/>
                <main className="ContentContainer">
                    <Switch>
                        <Route exact={true} path="/" component={FrontPage}/>
                        {AppRoutes.map((route, i) => <Route key={i} path={route.url} component={route.el}/>)}
                        <Route component={NotFoundPage}/>
                    </Switch>
                </main>
                <Footer/>
            </div>
        )
    }
}

export default App;
