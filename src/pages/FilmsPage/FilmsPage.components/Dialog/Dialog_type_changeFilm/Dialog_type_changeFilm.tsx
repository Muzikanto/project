import * as React from "react";
import DialogTypeAddFilm from "../Dialog_type_addFilm/Dialog_type_addFilm";
import {IDialogTypeChangeProps} from "./Dialog_type_changeFilm.typings";
import {parseYoutubeId} from "../../../../../components/Youtube/Youtube";
import {dateToSqlFormat} from "../../../../../utils/parseDate";

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
            date: dateToSqlFormat(this.state.date),
            trailer_id: parseYoutubeId(this.state.trailer_id),
        })
    }
}

export default DialogTypeChangeFilm;
