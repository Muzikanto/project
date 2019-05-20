import * as React from 'react';
import {FormEvent, RefObject} from 'react';
import {connect} from "react-redux";
import {actionAuthorize} from "../../../../actions/User";
import UI from "./LoginForm";
import {ILoginFormPropsContainerProps} from "./LoginForm.typings";
import {IStore} from "../../../../reducers/typings";
import Input from "../../../../components/Input/Input";
import InputShow from "../../../../components/Input/Input_show/InputShow";

class LoginForm extends React.Component<ILoginFormPropsContainerProps> {
    refEmail: RefObject<Input> = React.createRef();
    refPassword: RefObject<InputShow> = React.createRef();

    public render() {
        return (
            <UI
                refEmail={this.refEmail}
                refPassword={this.refPassword}
                onSubmit={this.onSubmit}
            />
        )
    }

    onSubmit = (e: FormEvent) => {
        e.preventDefault();
        const email = this.refEmail.current;
        const password = this.refPassword.current;

        if (email && password) {
            if (email.state.value && password.state.value) {
                this.props.actionAuthorize({
                    email: email.state.value,
                    password: password.state.value,
                });
            } else {
                if (!email.state.value) {
                    email.setState({
                        error: true,
                    });
                }
                if (!password.state.value) {
                    password.setState({
                        error: true,
                    });
                }
            }
        } else {
            // Need Logic
        }
    }
}

const mapStateToProps = (_: IStore) => ({});

const mapDispatchToProps = {
    actionAuthorize,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
