import * as React from 'react';
import Dialog from "./FilmsPage.components/Dialog/";
import FilmsList from "./FilmsPage.components/FilmsList/";
import FilterBlock from "./FilmsPage.components/FilterBlock/";
import {cn} from "@bem-react/classname";
import Progress from "../../components/Progress";
import SnackBar from "../../components/SnackBar";
import './FilmsPage.css';

const cnFilmsPage = cn('FilmsPage');

class FilmsPage extends React.Component {
    public render() {
        return (
            <div className={cnFilmsPage()}>
                <FilterBlock className={cnFilmsPage('Filter')}/>
                <FilmsList className={cnFilmsPage('List')} type={'grid'}/>
                <Dialog/>
                <Progress/>
                <SnackBar/>
            </div>
        )
    }
}

export default FilmsPage;