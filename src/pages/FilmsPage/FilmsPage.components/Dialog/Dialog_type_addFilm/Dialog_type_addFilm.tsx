import * as React from "react";
import Slide from "@material-ui/core/Slide";
import {IDialogTypeAddProps, IDialogTypeAddState} from "./Dialog_type_addFilm.typings";
import {Button} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import DatePicker from "../../../../../components/DatePicker/DatePicker";
import './Dialog_type_addFilms.css';
import {cn} from "@bem-react/classname";
import SelectCheckBox from "../../../../../components/Select/Select_checkBox/Select_checkBox";
import {getGenres} from "../../../base";
import Thumb from "../../../../../components/Thumb/Thumb";
import Youtube, {parseYoutubeId} from "../../../../../components/Youtube/Youtube";
import DialogBase from "../Base/DialogBase";
import {TransitionProps} from "@material-ui/core/transitions/transition";
import {dateToSqlFormat} from "../../../../../utils/parseDate";

const cnDialog = cn('DialogAddFilm');

class DialogTypeAddFilm<Props extends IDialogTypeAddProps> extends DialogBase<Props> {
    state: IDialogTypeAddState = {
        name: '',
        date: new Date(),
        genres: [],
        image_src: '',
        trailer_id: '',
    };

    protected getTitle(): string {
        return 'Enter New Film';
    }

    protected getContent(): React.ReactNode {
        const {submitText} = this.props;

        return (
            <>
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
                        user={{id: 0, email: '', nick: 'Nick'}}
                        menuItems={[]}
                        onContentClick={() => {}}
                        onStarClick={() => {}}
                        onFavoriteClick={()=>{}}
                        film={{
                            id: 'testID',
                            name: this.state.name || "Name",
                            avatar: 'T',
                            date: dateToSqlFormat(this.state.date),
                            image_src: this.state.image_src || 'https://www.ticketpro.by/storage/img/no-image.png',
                            genres: this.state.genres,
                            stars: 0,
                            is_favorite: false,
                            set_star: false,
                            trailer_id: '',
                            stars_users: 0,
                        }}
                    />
                    <div onClick={this.submit} className={cnDialog('Btn')}>
                        <Button variant="contained"
                                size="medium"
                                color="secondary"
                        >
                            {submitText}
                        </Button>
                    </div>
                </div>
            </>
        )
    }

    protected getTransitionComponent(props: TransitionProps): any {
        return <Slide direction="up" {...props} />
    }

    protected submit = () => {
        this.props.onCreate({
            name: this.state.name,
            avatar: '',
            date: dateToSqlFormat(this.state.date),
            image_src: this.state.image_src,
            genres: this.state.genres,
            trailer_id: parseYoutubeId(this.state.trailer_id),
        });
    }
}

export default DialogTypeAddFilm;
