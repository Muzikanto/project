import * as React from 'react';
import {cn} from "@bem-react/classname";
import {ILoginFormProps} from "./LoginForm.typings";
import Input from "../../../../components/Input/Input";
import Button from "../../../../components/Button/Button";
import './LoginForm.css';

const cnLoginForm = cn('LoginForm');

class LoginForm extends React.Component<ILoginFormProps> {
    public render() {
        return (
            <form className={cnLoginForm()} onSubmit={this.props.onSubmit} action={'#'}>
                <Input bemType={'withLabel'} placeholder={'Email'}  ref={this.props.refs.email}/>
                <Input bemType={'withLabel'} placeholder={'Password'} ref={this.props.refs.password}/>
                <Button type={'submit'} theme={'Future'} size={'Big'} text={'Sign Up'}
                        className={cnLoginForm('Btn')}/>
            </form>
        )
    }
}

export default LoginForm;
