import * as React from "react";
import {IDialogConteinerProps} from "./Dialog.typings";
import {connect} from "react-redux";
import {IStore} from "../../../../reducers/typings";
import {actionDialogOpen} from "../../../../actions/Dialog";
import {actionFilmsAdd, actionFilmsSetStar} from "../../../../actions/Films";
import DialogTypeStars from "./Dialog_type_stars/Dialog_type_stars";
import DialogTypeContent from "./Dialog_type_content/Dialog_type_content";
import {IFilm} from "../../../../reducers/Films/Films.typings";
import DialogTypeAddFilm from "./Dialog_type_addFilm/Dialog_type_addFilm";

class DialogStars extends React.Component<IDialogConteinerProps> {
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
            }
        } else {
            if (type === 'add_film') {
                return (<DialogTypeAddFilm
                    open={open}
                    handleClose={this.handleClose}

                    onClickAdd={(film: IFilm) => this.props.actionFilmsAdd(film)}
                />);
            }
        }

        return null;
    }

    private handleChangeStars = (star: number) => () => {
        if (this.props.dialog.film) {
            this.props.actionDialogOpen({open: false, film: null, type: 'content'});
            this.props.actionFilmsSetStar({star, id: this.props.dialog.film.id});
        }
    };

    private handleClose = () => {
        this.props.actionDialogOpen({open: false, film: null, type: 'content'});
    };
}

const mapStateToProps = (store: IStore) => ({
    dialog: store.DialogReducer,
    arr: store.FilmsReducer.arr,
});

const mapDispatchesToProps = {
    actionDialogOpen,
    actionFilmsSetStar,
    actionFilmsAdd,
};

export default connect(mapStateToProps, mapDispatchesToProps)(DialogStars);
