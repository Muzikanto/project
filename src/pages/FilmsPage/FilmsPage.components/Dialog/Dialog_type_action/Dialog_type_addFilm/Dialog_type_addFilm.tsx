import * as React from "react";
import Slide from "@material-ui/core/Slide";
import {IDialogTypeAddProps} from "./Dialog_type_addFilm.typings";
import {TransitionProps} from "@material-ui/core/transitions/transition";
import {dateToSqlFormat} from "../../../../../../utils/parseDate";
import Dialog from "../../../../../../components/Dialog";
import CommonDialogFilm from "../Common";
import {ICommonDialogActionState} from "../Dialog_type_action.typings";

class DialogTypeAddFilm<Props extends IDialogTypeAddProps> extends React.Component<Props> {
    public state: ICommonDialogActionState = {
        id: '',
        name: '',
        date: new Date(),
        genres: [],
        preview: '',
    };

    protected handleChange = (value: Partial<ICommonDialogActionState>) => {
        this.setState({...this.state, ...value});
    };

    public render(): React.ReactNode {
        const {
            title,
            onClose,
            submitText,
        } = this.props;
        const {
            id,
            genres,
            preview,
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
                    id={id}
                    btnText={submitText}
                    genres={genres}
                    preview={preview}
                    name={name}
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
            ...this.state,
            date: dateToSqlFormat(this.state.date),
        };

        this.props.onCreate(toCreate);
    }
}

export default DialogTypeAddFilm;
