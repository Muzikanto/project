import * as React from "react";
import {IDialogConteinerProps} from "./Dialog.typings";
import {connect} from "react-redux";
import {IStore} from "../../../../reducers/typings";
import {actionDialogOpen} from "../../../../actions/Dialog";
import {actionFilmsSetStar} from "../../../../actions/Films";
import DialogTypeStars from "./Dialog_type_stars/Dialog_type_stars";
import DialogTypeContent from "./Dialog_type_content/Dialog_type_content";
import {IFilm} from "../../../../reducers/Films/Films.typings";

class DialogStars extends React.Component<IDialogConteinerProps> {
    render(): React.ReactNode {
        const {
            open,
            value,
            type,
            id,
        } = this.props.dialog;

        if (type === 'stars') {
            return (
                <DialogTypeStars
                    open={open}
                    value={value}
                    handleClose={this.handleClose}
                    handleChange={this.handleChange}
                />
            )
        } else {
            const film: IFilm | null | '' = id && this.findFilm(id);

            return (
                <DialogTypeContent
                    open={open}
                    handleClose={this.handleClose}
                    film={film ? film : null}
                />
            );
        }
    }

    private findFilm = (id: string): IFilm | null => {
        for (const v of this.props.arr) {
            if (v.id === id) {
                return v;
            }
        }

        return null;
    };

    private handleChange = (star: number) => () => {
        const {id} = this.props.dialog;

        if (id) {
            this.props.actionDialogOpen({open: false, value: 5, id: null, type: 'content'});
            this.props.actionFilmsSetStar({star, id});
        }
    };

    private handleClose = () => {
        this.props.actionDialogOpen({open: false, value: 5, id: null, type: 'content'});
    };
}

const mapStateToProps = (store: IStore) => ({
    dialog: store.DialogReducer,
    arr: store.FilmsReducer.arr,
});

const mapDispatchesToProps = {
    actionDialogOpen,
    actionFilmsSetStar,
};

export default connect(mapStateToProps, mapDispatchesToProps)(DialogStars);
