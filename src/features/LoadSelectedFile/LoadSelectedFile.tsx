import * as React from 'react';
import {getFetch} from "../../utils/fetch";
import './LoadSelectedFile.css'
import {cn} from "@bem-react/classname";
import Button from "../../components/Button/Button";
import {FormEvent} from "react";
import Input from "../../components/Input/Input";


const cnLoadSelFile = cn('LoadSelFile');

interface ILoadSelectedFile {
    className?: string;
}

class LoadSelectedFile extends React.Component<ILoadSelectedFile> {
    public state = {files: []};

    public async componentDidMount() {
        const data = await getFetch('/api/resources_list');
        this.setState({files: data.response.files.map((el: string) => ({text: el, val: null}))})
    }

    public render() {
        return (
            <form className={cnLoadSelFile()} onSubmit={this.load}>
                <Input/>
                <Button className={cnLoadSelFile('btn')} type={'submit'} text={'Load'}/>
            </form>
        )
    }

    private load = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const file = 'test.txt';
        fetch(`/api/resources/${file}`, {method: 'get'})
            .then(data => data.blob())
            .then(blob => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = file;
                link.click();
            })
    };
}
export default LoadSelectedFile;
