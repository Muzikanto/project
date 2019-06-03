import * as React from "react";
import YouTube from '../../../../../components/Youtube/Youtube';
import Dialog from "../../../../../components/Dialog";
import {IDialogContentProps} from "./Dialog.typings";


class DialogTypeContent extends React.Component<IDialogContentProps> {
    render(): React.ReactNode {
        const {
            film,
            title,
        } = this.props;

        return (
            <Dialog
                title={title}
            >
                <YouTube id={film.trailer_id} width={640} height={390}/>
            </Dialog>
        )
    }
}

export default DialogTypeContent;
