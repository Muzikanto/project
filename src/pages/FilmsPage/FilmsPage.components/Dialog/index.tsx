import * as React from "react";
import {IDialogConteinerProps} from "./Dialog.typings";
import {connect} from "react-redux";
import {IStore} from "../../../../reducers/typings";
import FilmActions from "../../../../reducers/Films/Films.actions";
import DialogTypeStars from "./Dialog_type_stars/Dialog_type_stars";
import DialogTypeContent from "./Dialog_type_content/Dialog_type_content";
import {IFilmTypings} from "../../../../reducers/Films/Films.typings";
import DialogTypeAddFilm from "./Dialog_type_action/Dialog_type_addFilm/Dialog_type_addFilm";
import DialogTypeChangeFilm from "./Dialog_type_action/Dialog_type_changeFilm/Dialog_type_changeFilm";
import local from "../../FilmsPage.strings";
import {RefObject} from "react";

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
            itemPart2,
            DialogWithFilm,
            Change,
            Create,
            FilmsBase,
            SelectOne,
            item,
        } = this.props;

        if (item) {
            const {stars} = item;

            switch (type) {
                case 'stars':
                    return (
                        <DialogTypeStars
                            title={local["How did you like the movie?"]}
                            stars={stars}
                            film={item}
                        />
                    );
                case 'change_film':
                    if (!itemPart2) {
                        SelectOne(item.id);
                    } else {
                        const itemRef = this.refChange.current;
                        itemRef && itemRef.setState({...itemPart2, ...itemRef.state});
                    }

                    return (
                        <DialogTypeChangeFilm
                            ref={this.refChange}
                            title={local['Change Film Fields']}
                            submitText={local.Change}

                            film={item}

                            onChange={(film: IFilmTypings.Item) => Change(film)}
                            onClose={() => {
                                FilmsBase({item: null, itemPart2: null});
                            }}
                        />);
            }
        }

        if (type === 'add_film') {
            return (
                <DialogTypeAddFilm
                    title={local['Enter new Film']}
                    submitText={local['Add']}

                    onCreate={(film: IFilmTypings.ItemToCreate) => Create(film)}
                />
            );
        }

        if (type === 'content' && item) {
            if (!itemPart2) {
                SelectOne(item.id);
            }
            return (
                <DialogTypeContent
                    title={item.name}
                    film={item}
                    filmData={itemPart2}
                    onClose={() => DialogWithFilm({
                        dialog: {open: false, type: null},
                        item: null,
                        itemPart2: null
                    })}
                />
            );
        }

        return null;
    }
}

const mapStateToProps = (store: IStore) => ({
    dialog: store.Dialog,
    arr: store.Films.arr,
    item: store.Films.item,
    itemPart2: store.Films.itemPart2,
});

const mapDispatchesToProps = {
    Create: FilmActions.Create,
    Change: FilmActions.Change,
    SelectOne: FilmActions.SelectOne,
    DialogWithFilm: FilmActions.DialogWithFilm,
    FilmsBase: FilmActions.base,
};

export default connect(mapStateToProps, mapDispatchesToProps)(Dialog);
