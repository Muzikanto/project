import * as React from 'react';
import {IFilterBlockContainerProps} from "./FilterBlock.typings";
import UI from './FilterBlock';
import {connect} from "react-redux";
import {IStore} from "../../../../reducers/typings";
import {
    actionFilmsFirstLoad, actionFilmsLoad, actionFilmsOpenFilter,
    actionFilmsSetFilterDates,
    actionFilmsSetFilterGenres,
    actionFilmsSetFilterStars,
    actionFilmsSetSort
} from "../../../../actions/Films";
import {historyState} from "../../../../history";
import {actionDialogOpen} from "../../../../actions/Dialog";
import {getGenres} from "../../base";

class FilterBlock extends React.Component<IFilterBlockContainerProps> {
    componentDidMount(): void {
        this.props.actionFilmsFirstLoad(historyState.location.search);
    }

    render(): React.ReactNode {
        const {
            className,
            filters,
            open_filters,
        } = this.props;

        const genres = getGenres()

        const dates = new Array(10).fill(0).map((_, index: number) => (2019 - index).toString());
        const stars = new Array(10).fill(0).map((_, index: number) => (10 - index).toString());
        const sortData = ['Star', 'Date'];

        return (
            <UI
                className={className}
                filters={filters}
                open_filters={open_filters}
                genres={genres}
                genresOnChange={(current: string[]) =>
                    this.props.actionFilmsSetFilterGenres(current)
                }
                dates={dates}
                datesOnChange={(current: string[]) =>
                    this.props.actionFilmsSetFilterDates(current)
                }
                stars={stars}
                starsOnChange={(current: string) =>
                    this.props.actionFilmsSetFilterStars(current)
                }
                sort={sortData}
                sortOnChange={(current: string) =>
                    this.props.actionFilmsSetSort(current)
                }
                findOnClick={() => {
                    this.props.actionFilmsLoad();
                }}
                addOnClick={() => {
                    this.props.actionDialogOpen({type: 'add_film', value: 0, id: null, open: true});
                }}
                onExpandFilters={() =>
                    this.props.actionFilmsOpenFilter(!open_filters)
                }
            />
        );
    }
}

const mapStateToProps = (store: IStore) => ({
    filters: store.FilmsReducer.filters,
    open_filters: store.FilmsReducer.open_filters,
});

const mapActionsToProps = {
    actionFilmsSetFilterGenres,
    actionFilmsSetSort,
    actionFilmsSetFilterDates,
    actionFilmsSetFilterStars,
    actionFilmsFirstLoad,
    actionFilmsLoad,
    actionDialogOpen,
    actionFilmsOpenFilter,
};

export default connect(mapStateToProps, mapActionsToProps)(FilterBlock);
