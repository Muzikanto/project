import * as React from 'react';
import {DatePicker as DatePickerBase, MuiPickersUtilsProvider} from 'material-ui-pickers';
import DateFnsUtils from "@date-io/date-fns";

class DatePicker extends React.Component {
    state = {
        selectedDate: new Date('2014-08-18T21:11:54'),
    };

    handleDateChange = (date: Date) => {
        this.setState({selectedDate: date});
    };

    setState(state: any, callback?: () => void): void {
        super.setState(state);
    }

    render() {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePickerBase
                    label="Basic example"
                    value={this.state.selectedDate}
                    onChange={this.handleDateChange}
                    animateYearScrolling
                />
            </MuiPickersUtilsProvider>
        );
    }
}

export default DatePicker;
