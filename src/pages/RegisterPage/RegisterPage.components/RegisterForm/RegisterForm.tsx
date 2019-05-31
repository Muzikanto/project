import * as React from 'react';
import {cn} from "@bem-react/classname";
import {Button} from "@material-ui/core";
import Input from "../../../../components/Input/Input";
import InputShow from "../../../../components/Input/Input_show/InputShow";
import {IRegisterFormProps} from "./RegisterForm.typings";
import './RegisterForm.css';

const cnRegisterForm = cn('RegisterForm');

class RegisterForm extends React.Component<IRegisterFormProps> {
    public render() {
        return (
            <form className={cnRegisterForm()} action={'#'}>
                <img alt="" className={cnRegisterForm('Image')}/>
                <div className={cnRegisterForm('Block')}>
                <Input
                    ref={this.props.refNick}
                    label={'Nick'}
                    className={cnRegisterForm('Item')}/>
                <Input
                    ref={this.props.refEmail}
                    label={'Email'}
                    className={cnRegisterForm('Item')}/>
                <InputShow
                    ref={this.props.refPassword}
                    label={'Password'}
                    className={cnRegisterForm('Item')}/>
                <InputShow
                    ref={this.props.refPassword2}
                    label={'Repeat Password'}
                    className={cnRegisterForm('Item')}/>
                <div
                    onClick={this.props.onSubmit}
                    className={cnRegisterForm('Btn')}
                >
                    <Button variant="contained" size="large" color="primary">
                        Sign Up
                    </Button>
                </div>
                </div>
            </form>
        )
    }
}

export default RegisterForm;
