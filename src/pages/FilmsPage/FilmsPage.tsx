import * as React from 'react';
import Dialog from "./FilmsPage.components/Dialog/";
import './FilmsPage.css'
import FilmsList from "./FilmsPage.components/FilmsList/";
import Filter from "./FilmsPage.components/Filter/Filter";

class FilmsPage extends React.Component {
    public render() {
        return (
            <>
                <Filter/>
                <FilmsList/>
                <Dialog/>
            </>
        )
    }
}

export default FilmsPage
