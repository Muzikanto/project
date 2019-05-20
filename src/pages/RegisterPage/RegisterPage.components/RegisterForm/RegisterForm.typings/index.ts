import {IactionRegister} from "../../../../../actions/User/User.typings";
import {FormEvent, RefObject} from "react";
import Input from "../../../../../components/Input/Input";
import InputShow from "../../../../../components/Input/Input_show/InputShow";

export interface IRegisterFormProps {
    onSubmit: (e: FormEvent) => void;

    refNick: RefObject<Input>;
    refEmail: RefObject<Input>;
    refPassword: RefObject<InputShow>;
    refPassword2: RefObject<InputShow>;
}

export interface IRegisterFormContainerProps {
    actionRegister: IactionRegister;
}
