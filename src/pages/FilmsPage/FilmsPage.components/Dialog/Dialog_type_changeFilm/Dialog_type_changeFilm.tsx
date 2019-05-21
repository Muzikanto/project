import * as React from "react";
import DialogTypeAddFilm from "../Dialog_type_addFilm/Dialog_type_addFilm";
import {IDialogTypeChangeProps} from "./Dialog_type_changeFilm.typings";

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
        console.log(this.state)
    }
}

export default DialogTypeChangeFilm;
