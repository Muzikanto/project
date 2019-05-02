import * as React from 'react';
import {cn} from "@bem-react/classname";
import {IRegisterFormProps} from "./RegisterForm.typings";
import Input from "../../components/Input/Input";
import './RegisterForm.css';
import Button from "../../components/Button/Button";

const cnRegisterForm = cn('RegisterForm');

class RegisterForm extends React.Component<IRegisterFormProps> {
    public render() {
        return (
            <form className={cnRegisterForm()} onSubmit={this.props.onSubmit} action={'#'}>
                <Input bemType={'withLabel'} placeholder={'Nick'} ref={this.props.refs.nick}/>
                <Input bemType={'withLabel'} placeholder={'Email'}  ref={this.props.refs.email}/>
                <Input bemType={'withLabel'} placeholder={'Password'} ref={this.props.refs.password}/>
                <Input bemType={'withLabel'} placeholder={'Password2'} ref={this.props.refs.password2}/>
                <Button type={'submit'} theme={'Future'} size={'Big'} text={'Sign Up'}
                        className={cnRegisterForm('Btn')}/>
            </form>
        )
    }
}

export default RegisterForm;
