import * as React from 'react';

import FooterUI from "./Footer";


class Footer extends React.Component {
    protected AppComponent = FooterUI;

    public render() {
        const App = this.AppComponent;
        return (<App/>);
    }
}

export default Footer;
