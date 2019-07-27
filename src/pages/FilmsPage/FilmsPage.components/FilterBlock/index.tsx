import * as React from 'react';
import {IFilterBlockContainerProps} from "./FilterBlock.typings";
import UI from './FilterBlock';
import {connect} from "react-redux";
import {IStore} from "../../../../reducers/typings";
import FilmActions from "../../../../reducers/Films/Films.actions";
import {historyState} from "../../../../history";
import DialogActions from "../../../../reducers/Dialog/Dialog.actions";
import Timeout = NodeJS.Timeout;
import {getGenres} from "../../FilmsPage.strings/genres";
import {IFilmTypings} from "../../../../reducers/Films/Films.typings";

class FilterBlock extends React.Component<IFilterBlockContainerProps> {
    private lastTimeOut: Timeout | null = null;

    public componentDidMount(): void {
        this.props.FirstLoad(historyState.location.search);
    }

    public render(): React.ReactNode {
        const {
            className,
            filters,
        } = this.props;

        const GENRES = getGenres();

        const DATES = new Array(10).fill(0).map((_, index: number) => (2019 - index).toString());
        const STARS = new Array(7).fill(0).map((_, index: number) => (10 - index).toString());
        const SORTDATA: IFilmTypings.Sort[] = ['star', 'date'];

        return (
            <UI
                className={className}
        filters={filters}
        genres={GENRES}
        genresOnChange={(genres: string[]) =>
        this.props.SetFilter({genres})
    }
        dates={DATES}
        datesOnChange={(dates: string[]) =>
        this.props.SetFilter({dates})
    }
        stars={STARS}
        starsOnChange={(stars: string) =>
        this.props.SetFilter({stars})
    }
        sort={SORTDATA}
        sortOnChange={(sort: IFilmTypings.Sort) =>
        this.props.SetFilter({sort})
    }
        findOnClick={() => {
            this.props.Select({});
        }}
        addOnClick={() => {
            this.props.DialogBase({type: 'add_film', open: true});
        }}
        onExpandFilters={() =>
        this.props.SetFilter({filter_open: !filters.filter_open})
    }
        onInputFind={(query: string) => {
            this.props.SetFilter({query});
            this.lastTimeOut && clearTimeout(this.lastTimeOut);

            this.lastTimeOut = setTimeout(() => {
                this.props.Select({query, disableFilters: true})
            }, 700);
        }
    }
        />
    );
    }
}

const mapStateToProps = (store: IStore) => ({
    filters: {
        dates: store.Films.dates,
        genres: store.Films.genres,
        filter_open: store.Films.filter_open,
        sort: store.Films.sort,
        stars: store.Films.stars,
        query: store.Films.query,
    }
});

const mapActionsToProps = {
    SetFilter: FilmActions.SetFilter,
    FirstLoad: FilmActions.FirstLoad,
    Select: FilmActions.Select,
    DialogBase: DialogActions.base,
};

export default connect(mapStateToProps, mapActionsToProps)(FilterBlock);