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
                <Input
                    ref={this.props.refNick}
                    label={'Nick'}
                    textFieldProps={{
                        className: cnRegisterForm('Item')
                    }}
                />
                <Input
                    ref={this.props.refEmail}
                    label={'Email'}
                    textFieldProps={{
                        className: cnRegisterForm('Item')
                    }}
                />
                <InputShow
                    ref={this.props.refPassword}
                    label={'Password'}
                    textFieldProps={{
                        className: cnRegisterForm('Item')
                    }}
                />
                <InputShow
                    ref={this.props.refPassword2}
                    label={'Repeat Password'}
                    textFieldProps={{
                        className: cnRegisterForm('Item')
                    }}
                />
                <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                    <Button variant="contained" size="large" color="primary" href={'/auth/google'}>
                        Google
                    </Button>
                    <Button variant="contained" size="large" color="primary" href={'/auth/vkontakte'}>
                        VK
                    </Button>
                    <div
                        onClick={this.props.onSubmit}
                    >
                        <Button variant="contained" size="large" color="primary">
                            Create
                        </Button>
                    </div>
                </div>
            </form>
        )
    }
}

export default RegisterForm;
