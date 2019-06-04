import * as React from 'react';
import {ExpansionPanel} from "@material-ui/core";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {IFilterBlockProps} from "./FilterBlock.typings";
import SelectCheckBox from "../../../../components/Select/Select_checkBox/Select_checkBox";
import {cn} from "@bem-react/classname";
import Select from "../../../../components/Select/Select/Select";
import Button from "@material-ui/core/Button";
import AutoComplete from "../../../../components/AutoComplete/AutoComplete";
import './FilterBlock.scss';

const cnFilterBlock = cn('FilterBlock');

const suggestions = [
    'Afghanistan',
    'Aland Islands',
    'Albania',
    'Algeria',
    'American Samoa',
    'Andorra',
    'Angola',
    'Anguilla',
];

class FilterBlock extends React.Component<IFilterBlockProps> {
    render(): React.ReactNode {
        const {
            genres,
            dates,
            stars,
            sort,
            genresOnChange,
            datesOnChange,
            sortOnChange,
            starsOnChange,
            className,
            filters,
            findOnClick,
            addOnClick,
            onExpandFilters,
        } = this.props;

        return (
            <ExpansionPanel className={className} onChange={onExpandFilters} expanded={filters.filter_open}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography variant={'h5'}>Filters</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={cnFilterBlock()}>
                    <div className={cnFilterBlock('Items')}>
                        <SelectCheckBox
                            onChange={genresOnChange}
                            className={cnFilterBlock('Select')}
                            arr={genres}
                            current={filters.filter_genres}
                            label={'Genres'}
                        />
                        <SelectCheckBox
                            onChange={datesOnChange}
                            className={cnFilterBlock('Select')}
                            arr={dates}
                            label={'Date'}
                            current={filters.filter_dates}
                        />
                        <Select
                            onChange={starsOnChange}
                            className={cnFilterBlock('Select')}
                            arr={stars}
                            current={filters.filter_stars}
                            label={'Min Stars'}
                        />
                        <Select
                            onChange={sortOnChange}
                            className={cnFilterBlock('Select')}
                            label={'Sort'}
                            current={filters.filter_sort}
                            arr={sort}
                        />
                        <div style={{display: 'flex'}} onClick={findOnClick}>
                            <Button variant="contained"
                                    size="medium"
                                    color="primary">
                                Find
                            </Button>
                        </div>
                        <div style={{display: 'flex'}} onClick={addOnClick}>
                            <Button variant="contained"
                                    size="medium"
                                    color="secondary">
                                Add
                            </Button>
                        </div>
                    </div>
                    <div className={cnFilterBlock('Items')}>
                        {/*<AutoComplete items={suggestions} placeholder={'Enter Film'}/>*/}
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

export default FilterBlock;
