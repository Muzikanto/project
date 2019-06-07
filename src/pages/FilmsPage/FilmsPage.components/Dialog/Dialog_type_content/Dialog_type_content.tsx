import * as React from "react";
import YouTube from '../../../../../components/Youtube/Youtube';
import Dialog from "../../../../../components/Dialog";
import {IDialogContentProps} from "./Dialog.typings";
import './Dialog_type_content.scss';
import {cn} from "@bem-react/classname";

const cnFilmContent = cn('FilmContent');

class DialogTypeContent extends React.Component<IDialogContentProps> {
    render(): React.ReactNode {
        const {
            film,
            title,
        } = this.props;

        return (
            <Dialog
                title={title}
                dialogCoreProps={{scroll: 'body'}}
                dialogContentProps={{style: {display: 'flex'}}}
            >
                <div
                    style={{background: `url(${film.image_src})`}}
                    className={cnFilmContent('Image', ['ShadowBox'])}
                />
                <YouTube
                    id={film.trailer_id}
                    width={640}
                    height={390}
                    className={cnFilmContent('Trailer', ['ShadowBox'])}
                />
            </Dialog>
        )
    }
}

export default DialogTypeContent;
