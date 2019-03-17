import * as React from 'react';
import {FormEvent, RefObject} from "react";

import './FormImage.css'
import {cn} from "@bem-react/classname";
import Thumb from "../../components/Thumb/Thumb";

const cnFormImage = cn('FormImage');

class FormImage extends React.Component {
    public state: { empty: boolean, nameFile: string | null } = {empty: true, nameFile: null};
    public inputImage: RefObject<HTMLInputElement>;
    public outputImage: RefObject<HTMLImageElement>;

    constructor(props: any) {
        super(props);
        this.inputImage = React.createRef();
        this.outputImage = React.createRef();
    }

    public render() {
        return (
            <form onSubmit={this.onSubmit} className={cnFormImage()}>
                <div className={cnFormImage('ImgCont', {empty: this.state.empty})}>
                    <Thumb src={require('../../assets/logo.svg')}
                           className={cnFormImage('Img', {empty: this.state.empty})}
                           onClick={this.openModalSelectFile} refSrc={this.outputImage}/>
                </div>
                <label className={cnFormImage('Label')}>{this.state.nameFile ? this.state.nameFile : 'Выберите Изображение'}</label>
                <button className={cnFormImage('Button')} type="submit" disabled={!this.state.nameFile}>Send</button>

                <input type="file" name="load_image" ref={this.inputImage} accept="image/*"
                       onChange={this.onFileSelected}
                       style={{display: 'none'}}/>
            </form>
        )
    }

    private onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const elem = this.inputImage.current;
        if (!elem)
            return;
        const file = elem.files ? elem.files[0] : null;
        if(file) {
            const body = new FormData();
            body.append('load_image', file);
            fetch('/api/data/image', {
                method: 'POST',
                body
            }).then(data => data.json())
                .then(data => {
                    this.setState({nameFile: data.message})
                })
        }
    };

    private onFileSelected = (e: any) => {
        const selectedFile = e.target.files[0];
        const reader = new FileReader();
        const image = this.outputImage.current;
        reader.onload = (e2: any) => {
            if(image) {
                image.src = e2.target.result;
                image.title = selectedFile.name;
                this.setState({empty: false, nameFile: selectedFile.name.split('.')[0]})
            }
        };
        reader.readAsDataURL(selectedFile);
    };

    private openModalSelectFile() {
        const input = document.getElementsByName('load_image')[0];
        const evt = document.createEvent("MouseEvents");
        evt.initEvent("click", true, false);
        input.dispatchEvent(evt);
    }
}


export default FormImage;
