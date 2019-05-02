import {IactionAuthorize} from "../../../actions/User/User.typings";
import {FormEvent, RefObject} from "react";
import Input from "../../../components/Input/Input";

export interface ILoginFormProps {
    onSubmit: (e: FormEvent) => void;
    refs: {
        email: RefObject<Input>;
        password: RefObject<Input>;
    }
}

export interface ILoginFormPropsContainrProps {
    actionAuthorize: IactionAuthorize;
}
