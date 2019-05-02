import * as React from 'react';
import {FormEvent, RefObject} from 'react';
import {connect} from "react-redux";
import {actionAuthorize} from "../../actions/User";
import RegisterFormUI from "./LoginForm";
import {ILoginFormPropsContainrProps} from "./LoginForm.typings";
import Input from "../../components/Input/Input";
import {IStore} from "../../reducers/typings";

class LoginForm extends React.Component<ILoginFormPropsContainrProps> {
    refEmail: RefObject<Input>;
    refPassword: RefObject<Input>;

    constructor(props: ILoginFormPropsContainrProps) {
        super(props);
        this.refEmail = React.createRef();
        this.refPassword = React.createRef();
    }

    public render() {
        return (
            <RegisterFormUI refs={{
                email: this.refEmail,
                password: this.refPassword,
            }} onSubmit={this.onSubmit}/>
        )
    }

    onSubmit = (e: FormEvent) => {
        e.preventDefault();
        const email = this.refEmail.current && this.refEmail.current.state.text;
        const password = this.refPassword.current && this.refPassword.current.state.text;

        if (email && password) {
            this.props.actionAuthorize({
                email,
                password
            });
        }
    }
}

const mapStateToProps = (_: IStore) => ({});

const mapDispatchToProps = {
    actionAuthorize,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
