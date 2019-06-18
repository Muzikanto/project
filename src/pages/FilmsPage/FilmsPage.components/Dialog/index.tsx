import * as React from "react";
import {IDialogConteinerProps} from "./Dialog.typings";
import {connect} from "react-redux";
import {IStore} from "../../../../reducers/typings";
import {
    actionCreateFilm,
    actionFilmsChange,
    actionChangeStars,
    actionSelectSingleFilm,
    actionFilmsSet,
} from "../../../../reducers/Films/Films.actions";
import DialogTypeStars from "./Dialog_type_stars/Dialog_type_stars";
import DialogTypeContent from "./Dialog_type_content/Dialog_type_content";
import {IFilm, IFilmToCreate} from "../../../../reducers/Films/Films.typings";
import DialogTypeAddFilm from "./Dialog_type_action/Dialog_type_addFilm/Dialog_type_addFilm";
import DialogTypeChangeFilm from "./Dialog_type_action/Dialog_type_changeFilm/Dialog_type_changeFilm";
import local from "../../FilmsPage.strings";
import {RefObject} from "react";
import {actionDialogWithFilm} from "../../../../reducers/Dialog/Dialog.actions";

class Dialog extends React.Component<IDialogConteinerProps> {
    protected refChange: RefObject<DialogTypeChangeFilm>;

    constructor(props: IDialogConteinerProps) {
        super(props);

        this.refChange = React.createRef();
    }

    public render(): React.ReactNode {
        const {
            dialog: {
                type,
            },
            actionDialogWithFilm,
            actionSelectSingleFilm,
            filmData,
            film,
        } = this.props;

        if (film) {
            const {stars} = film;

            switch (type) {
                case 'stars':
                    return (
                        <DialogTypeStars
                            title={local["How did you like the movie?"]}
                            stars={stars}
                            film={film}
                        />
                    );
                case 'change_film':
                    if (!filmData) {
                        actionSelectSingleFilm(film.id);
                    } else {
                        const item = this.refChange.current;
                        item && item.setState({...filmData, ...item.state});
                    }

                    return (
                        <DialogTypeChangeFilm
                            ref={this.refChange}
                            title={local['Change Film Fields']}
                            submitText={local.Change}

                            film={film}

                            onChange={(film: IFilm) => this.props.actionFilmsChange(film)}
                            onClose={() => {
                                actionFilmsSet({film: null, filmData: null});
                            }}
                        />);
            }
        }

        if (type === 'add_film') {
            return (
                <DialogTypeAddFilm
                    title={local['Enter new Film']}
                    submitText={local['Add']}

                    onCreate={(film: IFilmToCreate) => this.props.actionCreateFilm(film)}
                />
            );
        }

        if (type === 'content' && film) {
            if (!filmData) {
                actionSelectSingleFilm(film.id);
            }
            return (
                <DialogTypeContent
                    title={film.name}
                    film={film}
                    filmData={filmData}
                    onClose={() => actionDialogWithFilm({
                        dialog: {open: false, type: null},
                        film: null,
                        filmData: null
                    })}
                />
            );
        }

        return null;
    }
}

const mapStateToProps = (store: IStore) => ({
    dialog: store.DialogReducer,
    arr: store.FilmsReducer.arr,
    film: store.FilmsReducer.film,
    filmData: store.FilmsReducer.filmData,
});

const mapDispatchesToProps = {
    actionChangeStars,
    actionCreateFilm,
    actionFilmsChange,
    actionSelectSingleFilm,
    actionDialogWithFilm,
};

export default connect(mapStateToProps, mapDispatchesToProps)(Dialog);
