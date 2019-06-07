import {TextFieldProps} from "@material-ui/core/TextField";
import {InputProps as StandardInputProps} from "@material-ui/core/Input";

export interface IInputState {
    value: string;
    error: boolean;
}

export interface IInputProps {
    textFieldProps?: Partial<TextFieldProps>;
    inputProps?: Partial<StandardInputProps>
    spanProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

    label?: string;
    onChange?: (value: string) => void;
    timeout?: number;
}
