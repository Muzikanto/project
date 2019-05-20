import * as React from 'react';
import {FormEvent} from "react";

interface IForm_LoadFile {
    className?: string;
    fileName: string;
}

class FormLoadFile extends React.Component<IForm_LoadFile> {
    public render() {
        return (
            <form className={this.props.className} onSubmit={this.load}>
                {this.props.children}
            </form>
        )
    }

    private load = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const file = this.props.fileName;
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
export default FormLoadFile;
