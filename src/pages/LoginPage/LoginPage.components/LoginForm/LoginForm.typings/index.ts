import {IactionAuthorize} from "../../../../../actions/User/User.typings";
import {FormEvent, RefObject} from "react";
import Input from "../../../../../components/Input/Input";
import InputShow from "../../../../../components/Input/Input_show/InputShow";

export interface ILoginFormProps {
    onSubmit: (e: FormEvent) => void;

    refEmail: RefObject<Input>;
    refPassword: RefObject<InputShow>;
}

export interface ILoginFormPropsContainerProps {
    actionAuthorize: IactionAuthorize;
}
