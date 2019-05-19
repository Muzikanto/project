import * as React from "react";
import DialogCore from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import {IDialogProps} from "./Dialog_type_addFilm.typings";
import {Button} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import DatePicker from "../../../../../components/DatePicker/DatePicker";
import './Dialog_type_addFilms.css';
import {cn} from "@bem-react/classname";

const cnDialog = cn('DialogAddFilm');

function Transition(props: any) {
    return <Slide direction="up" {...props} />;
}

class DialogTypeAddFilm extends React.Component<IDialogProps> {
    state = {
        name: 'Name'
    };

    protected handleChange = (name: string) => (e: any) => {
        this.setState({[name]: e.target.value})
    };

    render(): React.ReactNode {
        const {open, handleClose} = this.props;

        return (
            <DialogCore
                maxWidth={false}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title-add-film"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title-add-film">
                    Enter New Film
                </DialogTitle>
                <DialogContent className={cnDialog()}>
                    <TextField
                        id="add-film-name"
                        label="Name"
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                        margin="normal"
                    />
                    <DatePicker/>
                    <div onClick={this.add}>
                        <Button variant="contained"
                                size="medium"
                                color="secondary"
                        >
                            Add
                        </Button>
                    </div>
                </DialogContent>
            </DialogCore>
        )
    }

    private add = () => {
        this.props.onClickAdd({
            id: '',
            title: 'Avangers',
            avatar: '',
            date: '26 april 2019',
            url: 'https://cdnimg.rg.ru/img/content/167/02/68/kinopoisk.ru-Avengers_3A-Endgame-3193444_d_850.jpg',
            genres: ['Fantasy', 'Thriller'],
            stars: 0,
            share: 0,
            isLiked: false,
            trailer: 'gbcVZgO4n4E',
        });
    }
}

export default DialogTypeAddFilm;
