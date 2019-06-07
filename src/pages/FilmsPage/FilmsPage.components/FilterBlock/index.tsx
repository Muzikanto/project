import * as React from 'react';
import {IFilterBlockContainerProps} from "./FilterBlock.typings";
import UI from './FilterBlock';
import {connect} from "react-redux";
import {IStore} from "../../../../reducers/typings";
import {
    actionFilmsFirstLoad,
    actionSelectFilms,
    actionFilmsSetFilter,
} from "../../../../reducers/Films/Films.actions";
import {historyState} from "../../../../history";
import {actionDialog} from "../../../../reducers/Dialog/Dialog.actions";
import {getGenres} from "../../base";
import {IFilmsFilterSort} from "../../../../reducers/Films/Films.typings";

class FilterBlock extends React.Component<IFilterBlockContainerProps> {
    componentDidMount(): void {
        this.props.actionFilmsFirstLoad(historyState.location.search);
    }

    render(): React.ReactNode {
        const {
            className,
            filters,
        } = this.props;

        const genres = getGenres();

        const dates = new Array(10).fill(0).map((_, index: number) => (2019 - index).toString());
        const stars = new Array(7).fill(0).map((_, index: number) => (10 - index).toString());
        const sortData: IFilmsFilterSort[] = ['star', 'date'];

        return (
            <UI
                className={className}
                filters={filters}
                genres={genres}
                genresOnChange={(filter_genres: string[]) =>
                    this.props.actionFilmsSetFilter({filter_genres})
                }
                dates={dates}
                datesOnChange={(filter_dates: string[]) =>
                    this.props.actionFilmsSetFilter({filter_dates})
                }
                stars={stars}
                starsOnChange={(filter_stars: string) =>
                    this.props.actionFilmsSetFilter({filter_stars})
                }
                sort={sortData}
                sortOnChange={(filter_sort: IFilmsFilterSort) =>
                    this.props.actionFilmsSetFilter({filter_sort})
                }
                findOnClick={() => {
                    this.props.actionSelectFilms({});
                }}
                addOnClick={() => {
                    this.props.actionDialog({type: 'add_film', film: null, open: true});
                }}
                onExpandFilters={() =>
                    this.props.actionFilmsSetFilter({filter_open: !filters.filter_open})
                }
                onInputFind={(input) =>
                    this.props.actionSelectFilms({input, disableFilters: true})
                }
            />
        );
    }
}

const mapStateToProps = (store: IStore) => ({
    filters: {
        filter_dates: store.FilmsReducer.filter_dates,
        filter_genres: store.FilmsReducer.filter_genres,
        filter_open: store.FilmsReducer.filter_open,
        filter_sort: store.FilmsReducer.filter_sort,
        filter_stars: store.FilmsReducer.filter_stars,
    }
});

const mapActionsToProps = {
    actionFilmsSetFilter,
    actionFilmsFirstLoad,
    actionSelectFilms,
    actionDialog,
};

export default connect(mapStateToProps, mapActionsToProps)(FilterBlock);
