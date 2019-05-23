import * as React from 'react';
import Dialog from "./FilmsPage.components/Dialog/";
import FilmsList from "./FilmsPage.components/FilmsList/";
import FilterBlock from "./FilmsPage.components/FilterBlock/";
import {cn} from "@bem-react/classname";
import './FilmsPage.css';
import Progress from "../../components/Progress";
import SnackBar from "../../components/SnackBar";

const cnFilmsPage = cn('FilmsPage');

class FilmsPage extends React.Component {
    public render() {
        return (
            <div className={cnFilmsPage()}>
                <section>
                    <FilterBlock className={cnFilmsPage('Filter')}/>
                    <FilmsList className={cnFilmsPage('List')}/>
                </section>
                <Dialog/>
                <Progress/>
                <SnackBar/>
            </div>
        )
    }
}

export default FilmsPage;