import {FormEvent, RefObject} from "react";
import Input from "../../../../../components/Input/Input";
import InputShow from "../../../../../components/Input/Input_show/InputShow";
import {IActionType} from "../../../../../reducers/typings";
import UserActions from "../../../../../reducers/User/User.actions";

export interface IRegisterFormProps {
    onSubmit: (e: FormEvent) => void;

    refNick: RefObject<Input>;
    refEmail: RefObject<Input>;
    refPassword: RefObject<InputShow>;
    refPassword2: RefObject<InputShow>;
}

export interface IRegisterFormContainerProps {
    Create: IActionType<typeof UserActions.Create>;
}
