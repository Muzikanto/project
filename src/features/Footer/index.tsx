import * as React from 'react';

import FooterUI from "./Footer";

class Footer extends React.Component {
    protected AppComponent = FooterUI;

    public render() {
        return (<this.AppComponent/>)
    }
}

export default Footer;
