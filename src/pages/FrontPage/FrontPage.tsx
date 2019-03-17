import * as React from 'react';
import {cn} from "@bem-react/classname";

import {getFetch} from "../../utils/fetch";

import './FrontPage.css'
import LoadSelectedFile from "../../features/LoadSelectedFile/LoadSelectedFile";
import FormImage from "../../features/FormImage/FormImage";


const cnFront = cn('FrontPage');

class FrontPage extends React.Component {
    public componentDidMount() {
        getFetch('/api/test').then()
    }

    public render() {
        return (
            <section className={cnFront()}>
                <LoadSelectedFile/>
                <FormImage/>
            </section>
        )
    }
}

export default FrontPage;
