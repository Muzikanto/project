import * as React from 'react';
import {FormEvent, RefObject} from 'react';
import {connect} from "react-redux";
import UserActions from "../../../../reducers/User/User.actions";
import UI from "./RegisterForm";
import {IRegisterFormContainerProps} from "./RegisterForm.typings";
import {IStore} from "../../../../reducers/typings";
import Input from "../../../../components/Input/Input";
import InputShow from "../../../../components/Input/Input_show/InputShow";


class RegisterForm extends React.Component<IRegisterFormContainerProps> {
   public refNick: RefObject<Input>;
    public refEmail: RefObject<Input>;
    public refPassword: RefObject<InputShow>;
    public refPassword2: RefObject<InputShow>;

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

    protected onSubmit = (e: FormEvent) => {
        e.preventDefault();
        const nick = this.refNick.current;
        const email = this.refEmail.current;
        const password = this.refPassword.current;
        const password2 = this.refPassword2.current;

        if (nick && email && password && password2) {
            if (nick.state.value && email.state.value && password.state.value && password2.state.value) {
                this.props.Create({
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
    Create: UserActions.Create,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
