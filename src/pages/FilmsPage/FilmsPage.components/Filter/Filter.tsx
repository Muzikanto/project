import * as React from 'react';
import Select from 'react-select';
import {withStyles} from '@material-ui/core/styles';
import {FilterComponents, filterStyles} from "./Filter.components";

const suggestions = [
    {label: 'Afghanistan'},
    {label: 'Aland Islands'},
    {label: 'Albania'},
    {label: 'Algeria'},
    {label: 'American Samoa'},
    {label: 'Andorra'},
    {label: 'Angola'},
    {label: 'Anguilla'},
    {label: 'Antarctica'},
    {label: 'Antigua and Barbuda'},
    {label: 'Argentina'},
    {label: 'Armenia'},
    {label: 'Aruba'},
    {label: 'Australia'},
    {label: 'Austria'},
    {label: 'Azerbaijan'},
    {label: 'Bahamas'},
    {label: 'Bahrain'},
    {label: 'Bangladesh'},
    {label: 'Barbados'},
    {label: 'Belarus'},
    {label: 'Belgium'},
    {label: 'Belize'},
    {label: 'Benin'},
    {label: 'Bermuda'},
    {label: 'Bhutan'},
    {label: 'Bolivia, Plurinational State of'},
    {label: 'Bonaire, Sint Eustatius and Saba'},
    {label: 'Bosnia and Herzegovina'},
    {label: 'Botswana'},
    {label: 'Bouvet Island'},
    {label: 'Brazil'},
    {label: 'British Indian Ocean Territory'},
    {label: 'Brunei Darussalam'},
].map(suggestion => ({
    value: suggestion.label,
    label: suggestion.label,
}));


class Filter extends React.Component<any> {
    state = {
        single: null,
        multi: null,
    };

    handleChange = (name: any) => (value: any) => {
        this.setState({
            [name]: value,
        });
    };

    render() {
        const {classes, theme} = this.props;

        const selectStyles = {
            input: (base: any) => ({
                ...base,
                color: theme.palette.text.primary,
                '& input': {
                    font: 'inherit',
                },
            }),
        };

        return (
            <Select
                classes={classes}
                styles={selectStyles}
                textFieldProps={{
                    label: 'Label',
                    InputLabelProps: {
                        shrink: true,
                    },
                }}
                options={suggestions}
                components={FilterComponents}
                value={this.state.multi || undefined}
                onChange={this.handleChange('multi')}
                placeholder="Select multiple countries"
                isMulti
            />
        );
    }
}

export default withStyles(filterStyles as any, {withTheme: true})(Filter);
