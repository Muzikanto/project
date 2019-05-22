import * as React from "react";
import YouTube from '../../../../../components/Youtube/Youtube';
import DialogBase from "../Base/DialogBase";
import {IDialogProps} from "./Dialog.typings";


class DialogTypeContent extends DialogBase<IDialogProps> {
    protected getTitle(): string {
        return this.props.film.name;
    }

    protected getContent(): React.ReactNode {
        const {film} = this.props;

        return (
             <YouTube id={film.trailer_id} width={640} height={390}/>
        )
    }
}

export default DialogTypeContent;
