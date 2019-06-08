import {FormEvent, RefObject} from "react";
import Input from "../../../../../components/Input/Input";
import InputShow from "../../../../../components/Input/Input_show/InputShow";
import {IActionType} from "../../../../../reducers/typings";
import {actionAuthorize} from "../../../../../reducers/User/User.actions";

export interface ILoginFormProps {
    onSubmit: (e: FormEvent) => void;

    refEmail: RefObject<Input>;
    refPassword: RefObject<InputShow>;
}

export interface ILoginFormPropsContainerProps {
    actionAuthorize: IActionType<typeof actionAuthorize>;
}
