import * as React from 'react';
import {FormEvent, RefObject} from 'react';
import {connect} from "react-redux";
import {actionRegister} from "../../../../reducers/User/User.actions";
import UI from "./RegisterForm";
import {IRegisterFormContainerProps} from "./RegisterForm.typings";
import {IStore} from "../../../../reducers/typings";
import Input from "../../../../components/Input/Input";
import InputShow from "../../../../components/Input/Input_show/InputShow";


class RegisterForm extends React.Component<IRegisterFormContainerProps> {
    refNick: RefObject<Input>;
    refEmail: RefObject<Input>;
    refPassword: RefObject<InputShow>;
    refPassword2: RefObject<InputShow>;

    constructor(props: IRegisterFormContainerProps) {
        super(props);
        this.refNick = React.createRef();
        this.refEmail = React.createRef();
        this.refPassword = React.createRef();
        this.refPassword2 = React.createRef();
    }

    public render() {
        return (
            <UI
                refNick={this.refNick}
                refEmail={this.refEmail}
                refPassword={this.refPassword}
                refPassword2={this.refPassword2}
                onSubmit={this.onSubmit}
            />
        )
    }

    onSubmit = (e: FormEvent) => {
        e.preventDefault();
        const nick = this.refNick.current;
        const email = this.refEmail.current;
        const password = this.refPassword.current;
        const password2 = this.refPassword2.current;

        if (nick && email && password && password2) {
            if (nick.state.value && email.state.value && password.state.value && password2.state.value) {
                this.props.actionRegister({
                    nick: nick.state.value,
                    email: email.state.value,
                    password: password.state.value,
                    password2: password2.state.value
                });
            } else {
                // Need Logic
            }
        } else {
            // Need Logic
        }
    }
}

const mapStateToProps = (_: IStore) => ({});

const mapDispatchToProps = {
    actionRegister,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
