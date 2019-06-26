import * as React from 'react';
import {cn} from "@bem-react/classname";
import {Button} from "@material-ui/core";
import Input from "../../../../components/Input/Input";
import InputShow from "../../../../components/Input/Input_show/InputShow";
import {IRegisterFormProps} from "./RegisterForm.typings";
import './RegisterForm.css';
import GoogleIcon from "../../../../components/Icons/GoogleIcon";
import VkIcon from "../../../../components/Icons/VkIcon";
import SvgIcon from "@material-ui/core/SvgIcon";
import YandexIcon from "../../../../components/Icons/YandexIcon";

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
                        <GoogleIcon/>
                    </Button>
                    <Button variant="contained" size="large" color="primary" href={'/auth/vkontakte'}>
                        <VkIcon/>
                    </Button>
                    <Button variant="contained" size="large" color="primary" href={'/auth/yandex'}>
                        <YandexIcon/>
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
