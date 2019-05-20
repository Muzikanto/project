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
import SelectCheckBox from "../../../../../components/Select/Select_checkBox/Select_checkBox";
import {getGenres} from "../../../base";
import Thumb from "../../../../../components/Thumb/Thumb";
import Youtube, {parseYoutubeId} from "../../../../../components/Youtube/Youtube";

const cnDialog = cn('DialogAddFilm');

function Transition(props: any) {
    return <Slide direction="up" {...props} />;
}

class DialogTypeAddFilm extends React.Component<IDialogProps> {
    state = {
        name: '',
        date: new Date(),
        genres: [],
        image_src: '',
        trailer_id: '',
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
                    <div className={cnDialog('Controls')}>
                        <DatePicker
                            className={cnDialog('Date')}
                            label={'Date'}
                            value={this.state.date}
                            onChange={(date) => {
                                this.setState({date})
                            }}
                        />
                        <TextField
                            className={cnDialog('Name')}
                            id="add-film-name"
                            label="Name"
                            value={this.state.name}
                            onChange={this.handleChange('name')}
                            margin="normal"
                        />
                        <SelectCheckBox
                            className={cnDialog('Genres')}
                            arr={getGenres()}
                            label={'Genres'}
                            current={this.state.genres}
                            onChange={(genres: string[]) => {
                                this.setState({genres});
                            }}
                        />
                        <TextField
                            className={cnDialog('Name')}
                            id="add-film-image-src"
                            label="Image url"
                            value={this.state.image_src}
                            onChange={this.handleChange('image_src')}
                            margin="normal"
                        />
                        <Youtube
                            autoplay={false}
                            id={this.state.trailer_id}
                            width={345}
                            height={190}
                        />
                        <TextField
                            className={cnDialog('Name')}
                            id="add-film-trailer-id"
                            label="Trailer id"
                            value={this.state.trailer_id}
                            onChange={this.handleChange('trailer_id')}
                            margin="normal"
                        />
                    </div>
                    <div>
                        <Thumb
                            onContentClick={() => {
                            }}
                            onStarClick={() => {
                            }}
                            id={'testID'}
                            title={this.state.name || 'Name'}
                            avatar={'T'}
                            date={this.state.date.getTime()}
                            url={this.state.image_src || 'https://www.ticketpro.by/storage/img/no-image.png'}
                            genres={this.state.genres}
                            stars={0}
                            share={0}
                            isLiked={false}
                            trailer={''}
                        />
                        <div onClick={this.add} className={cnDialog('Btn')}>
                            <Button variant="contained"
                                    size="medium"
                                    color="secondary"
                            >
                                Add
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </DialogCore>
        )
    }

    private add = () => {
        this.props.onClickAdd({
            id: '',
            title: this.state.name,
            avatar: '',
            date: this.state.date.getTime(),
            url: this.state.image_src,
            genres: this.state.genres,
            stars: 0,
            share: 0,
            isLiked: false,
            trailer: parseYoutubeId(this.state.trailer_id),
        });
    }
}

export default DialogTypeAddFilm;
