import * as React from 'react';
import {cn} from "@bem-react/classname";
import Map from "../../components/Map/Map";
import CircleChart from "../../components/Chart/Circle/Circle";
import './IntroPage.css'

const cnInto = cn('IntoPage');

class IntroPage extends React.Component {
    public render() {
        return (
            <div className={cnInto()}>
                <header className={cnInto('Head')}><h1>Head</h1></header>
                <section className={cnInto('Content')}>
                    <div style={{width:'700px', height:'450px'}}>
                        <Map id='testMap'/>
                    </div>
                    <div style={{width:'700px', height:'450px'}}>
                        <CircleChart labels={['lab1', 'lab2', 'lab3']} values={[1,5,3]}/>
                    </div>
                </section>
            </div>
        )
    };
}

export default IntroPage;
