import * as React from "react";
import DialogTypeAddFilm from "../Dialog_type_addFilm/Dialog_type_addFilm";
import {IDialogTypeChangeProps} from "./Dialog_type_changeFilm.typings";
import {parseYoutubeId} from "../../../../../components/Youtube/Youtube";

class DialogTypeChangeFilm extends DialogTypeAddFilm<IDialogTypeChangeProps> {
    constructor(props: IDialogTypeChangeProps) {
        super(props);

        this.state = {
            ...props.film,
            date: new Date(props.film.date),
        };
    }

    protected getTitle(): string {
        return 'Change Film Fields';
    }

    protected submit = () => {
        this.props.onSubmit({
            ...this.props.film,
            date: this.state.date.getTime(),
            trailerId: parseYoutubeId(this.state.trailerId),
        })
    }
}

export default DialogTypeChangeFilm;
