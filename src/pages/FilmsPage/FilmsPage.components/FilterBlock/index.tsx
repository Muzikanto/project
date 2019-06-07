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
import {IFilmsFilterSort} from "../../../../reducers/Films/Films.typings";
import Timeout = NodeJS.Timeout;
import {getGenres} from "../../FilmsPage.strings/genres";

class FilterBlock extends React.Component<IFilterBlockContainerProps> {
    private lastTimeOut: Timeout | null = null;

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
                genresOnChange={(genres: string[]) =>
                    this.props.actionFilmsSetFilter({genres})
                }
                dates={dates}
                datesOnChange={(dates: string[]) =>
                    this.props.actionFilmsSetFilter({dates})
                }
                stars={stars}
                starsOnChange={(stars: string) =>
                    this.props.actionFilmsSetFilter({stars})
                }
                sort={sortData}
                sortOnChange={(sort: IFilmsFilterSort) =>
                    this.props.actionFilmsSetFilter({sort})
                }
                findOnClick={() => {
                    this.props.actionSelectFilms({});
                }}
                addOnClick={() => {
                    this.props.actionDialog({type: 'add_film', open: true});
                }}
                onExpandFilters={() =>
                    this.props.actionFilmsSetFilter({filter_open: !filters.filter_open})
                }
                onInputFind={(query: string) => {
                        this.props.actionFilmsSetFilter({query});
                        this.lastTimeOut && clearTimeout(this.lastTimeOut);

                        this.lastTimeOut = setTimeout(() => {
                            this.props.actionSelectFilms({query, disableFilters: true})
                        }, 700);
                    }
                }
            />
        );
    }
}

const mapStateToProps = (store: IStore) => ({
    filters: {
        dates: store.FilmsReducer.dates,
        genres: store.FilmsReducer.genres,
        filter_open: store.FilmsReducer.filter_open,
        sort: store.FilmsReducer.sort,
        stars: store.FilmsReducer.stars,
        query: store.FilmsReducer.query,
    }
});

const mapActionsToProps = {
    actionFilmsSetFilter,
    actionFilmsFirstLoad,
    actionSelectFilms,
    actionDialog,
};

export default connect(mapStateToProps, mapActionsToProps)(FilterBlock);
