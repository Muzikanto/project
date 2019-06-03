import * as React from "react";
import DialogTypeAddFilm from "../Dialog_type_addFilm/Dialog_type_addFilm";
import {IDialogTypeChangeProps} from "./Dialog_type_changeFilm.typings";
import {dateToSqlFormat} from "../../../../../utils/parseDate";
import {parseYoutubeId} from "../../../../../components/Youtube/Youtube.helpers";

class DialogTypeChangeFilm extends DialogTypeAddFilm<IDialogTypeChangeProps> {
    constructor(props: IDialogTypeChangeProps) {
        super(props);

        this.state = {
            ...props.film,
            date: new Date(props.film.date || Date.now()),
        };
    }

    protected submit = () => {
        this.props.onChange({
            ...this.props.film,
            date: dateToSqlFormat(this.state.date),
            trailer_id: parseYoutubeId(this.state.trailer_id),
        })
    }
}

export default DialogTypeChangeFilm;
