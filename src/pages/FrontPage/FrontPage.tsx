import * as React from 'react';
import {cn} from "@bem-react/classname";
import './FrontPage.css'

const cnFront = cn('FrontPage');

class FrontPage extends React.Component {
    public render() {
        return (
            <section className={cnFront()}>
                FrontPage
            </section>
        )
    }
}

export default FrontPage
