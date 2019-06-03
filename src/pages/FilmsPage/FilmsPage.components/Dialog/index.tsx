import * as React from "react";
import {IDialogConteinerProps} from "./Dialog.typings";
import {connect} from "react-redux";
import {IStore} from "../../../../reducers/typings";
import {actionCreateFilm, actionFilmsChange, actionChangeStars} from "../../../../reducers/Films/Films.actions";
import DialogTypeStars from "./Dialog_type_stars/Dialog_type_stars";
import DialogTypeContent from "./Dialog_type_content/Dialog_type_content";
import {IFilm, IFilmToCreate} from "../../../../reducers/Films/Films.typings";
import DialogTypeAddFilm from "./Dialog_type_addFilm/Dialog_type_addFilm";
import DialogTypeChangeFilm from "./Dialog_type_changeFilm/Dialog_type_changeFilm";
import {actionDialog} from "../../../../reducers/Dialog/Dialog.actions";

class Dialog extends React.Component<IDialogConteinerProps> {
    render(): React.ReactNode {
        const {
            film,
            type,
        } = this.props.dialog;

        if (film) {
            const {stars} = film;

            switch (type) {
                case 'stars':
                    return (
                        <DialogTypeStars
                            title={"How did you like the movie?"}

                            stars={stars}
                            handleChange={this.handleChangeStars}
                        />
                    );
                case 'content':
                    return (
                        <DialogTypeContent
                            title={film.name}

                            film={film}
                        />
                    );
                case 'change_film':
                    return (<DialogTypeChangeFilm
                        title={'Change Film Fields'}
                        submitText={'Change'}

                        film={film}
                        onChange={(film: IFilm) => this.props.actionFilmsChange(film)}
                        onCreate={() => {
                        }}
                    />);
            }
        } else {
            if (type === 'add_film') {
                return (<DialogTypeAddFilm
                    title={'Enter New Film'}
                    submitText={'Add'}

                    onCreate={(film: IFilmToCreate) => this.props.actionCreateFilm(film)}
                />);
            }
        }

        return null;
    }

    private handleChangeStars = (stars: number) => () => {
        if (this.props.dialog.film) {
            this.props.actionDialog({open: false, film: null, type: null});
            this.props.actionChangeStars({stars, id: this.props.dialog.film.id});
        }
    };
}

const mapStateToProps = (store: IStore) => ({
    dialog: store.DialogReducer,
    arr: store.FilmsReducer.arr,
});

const mapDispatchesToProps = {
    actionDialog,
    actionChangeStars,
    actionCreateFilm,
    actionFilmsChange,
};

export default connect(mapStateToProps, mapDispatchesToProps)(Dialog);
