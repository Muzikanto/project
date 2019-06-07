import * as React from "react";
import Slide from "@material-ui/core/Slide";
import {TransitionProps} from "@material-ui/core/transitions/transition";
import {dateToSqlFormat} from "../../../../../../utils/parseDate";
import {parseYoutubeId} from "../../../../../../components/Youtube/Youtube.helpers";
import Dialog from "../../../../../../components/Dialog";
import CommonDialogFilm from "../Common";
import {IDialogTypeChangeProps} from "./Dialog_type_changeFilm.typings";
import {ICommonDialogActionState} from "../Dialog_type_action.typings";

class DialogTypeChangeFilm extends React.Component<IDialogTypeChangeProps> {
    state: ICommonDialogActionState;

    constructor(props: IDialogTypeChangeProps) {
        super(props);

        this.state = {
            name: '',
            genres: [],
            image_src: '',
            ...props.film,
            date: props.film.date ? new Date(props.film.date) : new Date(),
        };
    }

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
        this.props.onChange({
            ...this.props.film,
            ...this.state,
            date: dateToSqlFormat(this.state.date),
            trailer_id: this.state.trailer_id ? parseYoutubeId(this.state.trailer_id) : undefined,
        });
    }
}

export default DialogTypeChangeFilm;
