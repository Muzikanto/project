import * as React from 'react';
import Downshift from 'downshift';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import {cn} from "@bem-react/classname";
import './AutoComplete.scss';
import {IAutoCompleteProps} from "./AutoComplete.typings";

const cnAutoComplete = cn('AutoComplete');

class AutoComplete extends React.Component<IAutoCompleteProps> {
    render(): React.ReactNode {
        return (
            <Downshift>
                {({
                      getInputProps,
                      getItemProps,
                      getMenuProps,
                      highlightedIndex,
                      inputValue,
                      isOpen,
                  }) => (
                    <div className={cnAutoComplete('Container')}>
                        <TextField
                            InputProps={getInputProps({
                                placeholder: this.props.placeholder,
                                onChange: this.props.onChange,
                            })}
                            fullWidth={true}
                        />
                        <div {...getMenuProps()}>
                            {isOpen ? (
                                <Paper className={cnAutoComplete('Paper')} square>
                                    {(this.props.filterSuggestions ? this.getSuggestions(inputValue) : this.props.items)
                                        .map((suggestion, index) =>
                                            <MenuItem
                                                {...getItemProps({item: suggestion})}
                                                key={suggestion}
                                                selected={highlightedIndex === index}
                                                component="div"
                                            >
                                                {suggestion}
                                            </MenuItem>
                                        )}
                                </Paper>
                            ) : null}
                        </div>
                    </div>
                )}
            </Downshift>
        );
    }

    protected getSuggestions(value: string | null, {showEmpty = false} = {}): string[] {
        const inputValue = value ? value.trim().toLowerCase() : '';
        const inputLength = inputValue.length;
        let count = 0;

        return inputLength === 0 && !showEmpty
            ? []
            : this.props.items.filter(suggestion => {
                // const start = count < 5 && suggestion.slice(0, inputLength).toLowerCase() === inputValue;
                const indexOf = count < 5 && suggestion.toLowerCase().indexOf(inputValue) !== -1;

                if (indexOf) {
                    count += 1;
                }

                return indexOf;
            });
    }
}

export default AutoComplete;
