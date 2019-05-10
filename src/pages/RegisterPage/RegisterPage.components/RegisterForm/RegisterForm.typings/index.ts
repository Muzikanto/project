import {IactionRegister} from "../../../../../actions/User/User.typings";
import {FormEvent, RefObject} from "react";
import Input from "../../../../../components/Input/Input";

export interface IRegisterFormProps {
    onSubmit: (e: FormEvent) => void;
    refs: {
        nick: RefObject<Input>;
        email: RefObject<Input>;
        password: RefObject<Input>;
        password2: RefObject<Input>;
    }
}

export interface IRegisterFormContainerProps {
    actionRegister: IactionRegister;
}
