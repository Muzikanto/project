import * as React from 'react';
import {cn} from "@bem-react/classname";
import InputShow from '../../../../components/Input/Input_show/InputShow'
import Input from "../../../../components/Input/Input";
import {ILoginFormProps} from "./LoginForm.typings";
import Button from "@material-ui/core/Button";
import './LoginForm.css';

const cnLoginForm = cn('LoginForm');

class LoginForm extends React.Component<ILoginFormProps> {
    public render() {
        return (
            <form className={cnLoginForm()} action={'#'}>
                <Input label={'Email'} ref={this.props.refEmail} className={cnLoginForm('Item')}/>
                <InputShow label={'Password'} ref={this.props.refPassword} className={cnLoginForm('Item')}/>
                <div onClick={this.props.onSubmit} className={cnLoginForm('Btn')}>
                    <Button variant="contained" size="large" color="primary">
                        Sign In
                    </Button>
                </div>
            </form>
        )
    }
}

export default LoginForm;
