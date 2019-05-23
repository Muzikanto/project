import * as React from "react";
import {IDialogConteinerProps} from "./Dialog.typings";
import {connect} from "react-redux";
import {IStore} from "../../../../reducers/typings";
import {actionDialog} from "../../../../reducers/Dialog/Dialog.actions";
import {actionCreateFilm, actionFilmsChange, actionChangeStars} from "../../../../reducers/Films/Films.actions";
import DialogTypeStars from "./Dialog_type_stars/Dialog_type_stars";
import DialogTypeContent from "./Dialog_type_content/Dialog_type_content";
import {IFilm} from "../../../../reducers/Films/Films.typings";
import DialogTypeAddFilm from "./Dialog_type_addFilm/Dialog_type_addFilm";
import DialogTypeChangeFilm from "./Dialog_type_changeFilm/Dialog_type_changeFilm";

class Dialog extends React.Component<IDialogConteinerProps> {
    render(): React.ReactNode {
        const {
            open,
            film,
            type,
        } = this.props.dialog;

        if (film) {
            const {stars} = film;

            switch (type) {
                case 'stars':
                    return (
                        <DialogTypeStars
                            open={open}
                            handleClose={this.handleClose}

                            stars={stars}
                            handleChange={this.handleChangeStars}
                        />
                    );
                case 'content':
                    return (
                        <DialogTypeContent
                            open={open}
                            handleClose={this.handleClose}

                            film={film}
                        />
                    );
                case 'change_film':
                    return (<DialogTypeChangeFilm
                        submitText={'Change'}
                        open={open}
                        handleClose={this.handleClose}

                        film={film}
                        onSubmit={(film: IFilm) => this.props.actionFilmsChange(film)}
                    />);
            }
        } else {
            if (type === 'add_film') {
                return (<DialogTypeAddFilm
                    submitText={'Add'}
                    open={open}
                    handleClose={this.handleClose}

                    onSubmit={(film: IFilm) => this.props.actionCreateFilm(film)}
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

    private handleClose = () => {
        this.props.actionDialog({open: false, film: null, type: null});
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
