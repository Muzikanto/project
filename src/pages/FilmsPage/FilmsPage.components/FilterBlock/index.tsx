import * as React from 'react';
import {IFilterBlockContainerProps} from "./FilterBlock.typings";
import UI from './FilterBlock';
import {connect} from "react-redux";
import {IStore} from "../../../../reducers/typings";
import {
    actionFilmsFirstLoad, actionFilmsLoad,
    actionFilmsSetFilterDates,
    actionFilmsSetFilterGenres,
    actionFilmsSetFilterStars,
    actionFilmsSetSort
} from "../../../../actions/Films";
import {historyState} from "../../../../history";

class FilterBlock extends React.Component<IFilterBlockContainerProps> {
    componentDidMount(): void {
        this.props.actionFilmsFirstLoad(historyState.location.search);
    }

    render(): React.ReactNode {
        const {className, filters} = this.props;

        const genres = [
            'Fantastic',
            'Thriller',
        ];
        for (let i = 0; i < 5; i++) {
            genres.push(genres[0] + i, genres[1] + i);
        }

        const dates = new Array(10).fill(0).map((_, index: number) => (2019 - index).toString());
        const stars = new Array(10).fill(0).map((_, index: number) => (10 - index).toString());

        return (
            <UI
                className={className}
                filters={filters}
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
                sort={['Star', 'Date']}
                sortOnChange={(current: string) =>
                    this.props.actionFilmsSetSort(current)
                }
                findOnClick={() => {
                    this.props.actionFilmsLoad();
                }}
            />
        );
    }
}

const mapStateToProps = (store: IStore) => ({
    filters: store.FilmsReducer.filters,
});

const mapActionsToProps = {
    actionFilmsSetFilterGenres,
    actionFilmsSetSort,
    actionFilmsSetFilterDates,
    actionFilmsSetFilterStars,
    actionFilmsFirstLoad,
    actionFilmsLoad,
};

export default connect(mapStateToProps, mapActionsToProps)(FilterBlock);
