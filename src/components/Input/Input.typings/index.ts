import {IClassNameProps} from "@bem-react/core";
import {ChangeEvent} from "react";

interface IInput extends IClassNameProps {
    pattern?: string;
    type?: string;
    value?: string;
    title?: string;
    required?: boolean;
    className?: string;

    placeholder?: string;
    bemType?: 'withLabel'
    name?: string;
    onChangeCB?: (value: string) => void;

    icon?: string;

    success?: boolean;
}

interface IInputProps extends IInput{
    bemOnChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}


export {
    IInput,
    IInputProps
}
