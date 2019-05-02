import * as React from 'react';
import {cn} from "@bem-react/classname";
import {getFetch} from "../../utils/fetch";
import Chess from "../../features/Chess";
import './FrontPage.css'

const cnFront = cn('FrontPage');

class FrontPage extends React.Component {
    public componentDidMount() {
        getFetch('/api/test').then();
    }

    public render() {
        return (
            <section className={cnFront()}>
                <Chess helper={true}/>
            </section>
        )
    }
}

export default FrontPage
