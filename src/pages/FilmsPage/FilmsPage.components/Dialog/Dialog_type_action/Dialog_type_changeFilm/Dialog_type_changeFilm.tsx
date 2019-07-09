import * as React from "react";
import Slide from "@material-ui/core/Slide";
import {TransitionProps} from "@material-ui/core/transitions/transition";
import {dateToSqlFormat} from "../../../../../../src.utils/parseDate";
import Dialog from "../../../../../../components/Dialog";
import CommonDialogFilm from "../Common";
import {IDialogTypeChangeProps} from "./Dialog_type_changeFilm.typings";
import {ICommonDialogActionState} from "../Dialog_type_action.typings";

class DialogTypeChangeFilm extends React.Component<IDialogTypeChangeProps> {
    public state: ICommonDialogActionState;

    constructor(props: IDialogTypeChangeProps) {
        super(props);

        this.state = {
            name: '',
            genres: [],
            preview: '',
            ...props.film,
            date: props.film.date ? new Date(props.film.date) : new Date(),
        };
    }

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
        this.props.onChange({
            ...this.props.film,
            ...this.state,
            date: dateToSqlFormat(this.state.date),
        });
    }
}

export default DialogTypeChangeFilm;
