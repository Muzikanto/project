import * as React from 'react';
import './CustomInput.css'
import {cn} from "@bem-react/classname";

const cnCInput = cn('CInput');

class CustomInput extends React.Component {
    public render() {
        return (
            <div className={cnCInput()}>
                <input className={cnCInput('Input')} type="text" placeholder=""/>
                <label className={cnCInput('Label')}>First Name</label>
                <span className={cnCInput('Line')}/>
            </div>
        )
    }
}

export default CustomInput;
// https://codepen.io/maheshambure21/pen/EozKKy
