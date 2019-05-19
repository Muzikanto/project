import * as React from 'react';
import {ExpansionPanel} from "@material-ui/core";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {IFilterBlockProps} from "./FilterBlock.typings";
import SelectCheckBox from "./FilterBlock.components/Select_checkBox/Select_checkBox";
import './FilterBlock.css';
import {cn} from "@bem-react/classname";
import Select from "./FilterBlock.components/Select/Select";
import Button from "@material-ui/core/Button";

const cnFilterBlock = cn('FilterBlock');

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
        } = this.props;

        return (
            <ExpansionPanel className={className}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography variant={'h5'}>Filters</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={cnFilterBlock('Items')}>
                    <SelectCheckBox
                        onChange={genresOnChange}
                        className={cnFilterBlock('Select')}
                        arr={genres}
                        current={filters.genres}
                        label={'Genres'}
                    />
                    <SelectCheckBox
                        onChange={datesOnChange}
                        className={cnFilterBlock('Select')}
                        arr={dates}
                        label={'Date'}
                        current={filters.dates}
                    />
                    <Select
                        onChange={starsOnChange}
                        className={cnFilterBlock('Select')}
                        arr={stars}
                        current={filters.stars}
                        label={'Min Stars'}
                    />
                    <Select
                        onChange={sortOnChange}
                        className={cnFilterBlock('Select')}
                        label={'Sort'}
                        current={filters.sort}
                        arr={sort}
                    />
                    <div style={{display: 'flex'}} onClick={findOnClick}>
                        <Button variant="contained"
                                size="medium"
                                color="primary">
                            Find
                        </Button>
                    </div>
                    <Button variant="contained"
                            size="medium"
                            color="secondary">
                        Add
                    </Button>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

export default FilterBlock;
