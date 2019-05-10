import * as React from 'react';
import {cn} from "@bem-react/classname";
import ChessGame from "./ChessPage.components/Chess";
import './ChessPage.css'

const cnChessPage = cn('ChessPage');

class ChessPage extends React.Component {
    public render() {
        return (
            <section className={cnChessPage()}>
                <ChessGame helper={true}/>
            </section>
        )
    }
}

export default ChessPage
