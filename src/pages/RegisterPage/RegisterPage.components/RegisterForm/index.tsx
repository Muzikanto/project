import * as React from 'react';
import {FormEvent, RefObject} from 'react';
import {connect} from "react-redux";
import {actionRegister} from "../../../../actions/User";
import RegisterFormUI from "./RegisterForm";
import {IRegisterFormContainerProps} from "./RegisterForm.typings";
import Input from "../../../../components/Input/Input";
import {IStore} from "../../../../reducers/typings";


class RegisterForm extends React.Component<IRegisterFormContainerProps> {
    refNick: RefObject<Input>;
    refEmail: RefObject<Input>;
    refPassword: RefObject<Input>;
    refPassword2: RefObject<Input>;

    constructor(props: IRegisterFormContainerProps) {
        super(props);
        this.refNick = React.createRef();
        this.refEmail = React.createRef();
        this.refPassword = React.createRef();
        this.refPassword2 = React.createRef();
    }

    public render() {
        return (
            <RegisterFormUI refs={{
                nick: this.refNick,
                email: this.refEmail,
                password: this.refPassword,
                password2: this.refPassword2,
            }} onSubmit={this.onSubmit}/>
        )
    }

    onSubmit = (e: FormEvent) => {
        e.preventDefault();
        const nick = this.refNick.current && this.refNick.current.state.text;
        const email = this.refEmail.current && this.refEmail.current.state.text;
        const password = this.refPassword.current && this.refPassword.current.state.text;
        const password2 = this.refPassword2.current && this.refPassword2.current.state.text;

        if (nick && email && password && password2) {
            this.props.actionRegister({
                nick, email, password, password2
            });
        }
    }
}

const mapStateToProps = (_: IStore) => ({});

const mapDispatchToProps = {
    actionRegister,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
