import * as React from 'react';
import {DatePicker as DatePickerBase, MuiPickersUtilsProvider} from 'material-ui-pickers';
import DateFnsUtils from "@date-io/date-fns";
import {IDatePicker} from "./DatePicker.typings";

class DatePicker extends React.Component<IDatePicker> {
    render() {
        const {
            label,
            onChange,
            value,
            className,
        } = this.props;

        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePickerBase
                    className={className}
                    label={label}
                    value={value}
                    variant={'outlined'}
                    onChange={onChange}
                    keyboard
                    format={"dd/MM/yyyy"}
                    mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
                    minDate={new Date('2000-01-01T21:11:54')}
                    maxDate={new Date(Date.now() + 75000000000)}
                />
            </MuiPickersUtilsProvider>
        );
    }
}

export default DatePicker;
