import * as React from "react";
import Slide from "@material-ui/core/Slide";
import {IDialogTypeAddProps} from "./Dialog_type_addFilm.typings";
import {TransitionProps} from "@material-ui/core/transitions/transition";
import {dateToSqlFormat} from "../../../../../../utils/parseDate";
import {parseYoutubeId} from "../../../../../../components/Youtube/Youtube.helpers";
import Dialog from "../../../../../../components/Dialog";
import CommonDialogFilm from "../Common";
import {ICommonDialogActionState} from "../Dialog_type_action.typings";

class DialogTypeAddFilm<Props extends IDialogTypeAddProps> extends React.Component<Props> {
    state: ICommonDialogActionState = {
        name: '',
        date: new Date(),
        genres: [],
        image_src: '',
        trailer_id: '',
    };

    protected handleChange = (value: Partial<ICommonDialogActionState>) => {
        this.setState({...this.state, ...value});
    };

    render(): React.ReactNode {
        const {
            title,
            onClose,
            submitText,
        } = this.props;
        const {
            genres,
            image_src,
            trailer_id,
            name,
            date,
        } = this.state;

        return (
            <Dialog
                title={title}
                onClose={onClose}
                dialogCoreProps={{
                    TransitionComponent: this.getTransitionComponent,
                }}
                dialogContentProps={{style: {display: 'flex'}}}
            >
                <CommonDialogFilm
                    btnText={submitText}
                    genres={genres}
                    image_src={image_src}
                    name={name}
                    trailer_id={trailer_id}
                    date={date}
                    onSubmit={this.submit}
                    handleChange={this.handleChange}
                />
            </Dialog>
        )
    }

    protected getTransitionComponent(props: TransitionProps): any {
        return <Slide direction="up" {...props} />
    }

    protected submit = () => {
        const toCreate = {
            name: this.state.name,
            date: dateToSqlFormat(this.state.date),
            image_src: this.state.image_src,
            genres: this.state.genres,
            trailer_id: this.state.trailer_id ? parseYoutubeId(this.state.trailer_id) : undefined,
        };

        this.props.onCreate(toCreate);
    }
}

export default DialogTypeAddFilm;
