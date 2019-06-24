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
import './FilterBlock.scss';
import Input from "../../../../components/Input/Input";
import local from "../../FilmsPage.strings";

const cnFilterBlock = cn('FilterBlock');

class FilterBlock extends React.Component<IFilterBlockProps> {
    public render(): React.ReactNode {
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
            <ExpansionPanel
                className={cnFilterBlock('Container', [className, 'ShadowBox'])}
                onChange={onExpandFilters}
                expanded={filters.filter_open}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon/>}
                    focusVisibleClassName={cnFilterBlock('DisableFocus')}
                    classes={{content: cnFilterBlock('Header')}}
                >
                    {this.getHeaderContent()}
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={cnFilterBlock()}>
                    <div className={cnFilterBlock('Items')}>
                        <SelectCheckBox
                            onChange={genresOnChange}
                            className={cnFilterBlock('Select')}
                            arr={genres}
                            current={filters.genres}
                            label={local['Genres']}
                        />
                        <SelectCheckBox
                            onChange={datesOnChange}
                            className={cnFilterBlock('Select')}
                            arr={dates}
                            label={local['Date']}
                            current={filters.dates}
                        />
                        <Select
                            onChange={starsOnChange}
                            className={cnFilterBlock('Select')}
                            arr={stars}
                            current={filters.stars}
                            label={local['Min Stars']}
                        />
                        <Select
                            onChange={sortOnChange}
                            className={cnFilterBlock('Select')}
                            label={local.Sort}
                            current={filters.sort}
                            arr={sort}
                        />
                        <div style={{display: 'flex'}} onClick={findOnClick}>
                            <Button variant="contained"
                                    size="medium"
                                    color="primary">
                                {local['Find']}
                            </Button>
                        </div>
                        <div style={{display: 'flex'}} onClick={addOnClick}>
                            <Button variant="contained"
                                    size="medium"
                                    color="secondary">
                                {local['Add'].toUpperCase()}
                            </Button>
                        </div>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }

    protected getHeaderContent() {
        const {
            filters,
            onInputFind,
        } = this.props;

        return (
            <>
                <Typography variant={'h5'} style={{width: 100}}>{local['Filters']}</Typography>
                <Input
                    textFieldProps={{
                        className: cnFilterBlock('Search'),
                        value: filters.query,
                    }}
                    inputProps={{
                        classes: {root: cnFilterBlock('SearchInput', ['ShadowBox'])},
                    }}
                    label={local['Film name']}
                    onChange={onInputFind}
                />
                <div/>
            </>
        )
    }
}

export default FilterBlock;
