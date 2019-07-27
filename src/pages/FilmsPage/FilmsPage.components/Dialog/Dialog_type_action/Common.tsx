import * as React from 'react';
import {Button} from "@material-ui/core";
import {cn} from "@bem-react/classname";
import local from "../../../FilmsPage.strings";
import SelectCheckBox from "../../../../../components/Select/Select_checkBox/Select_checkBox";
import Thumb from "../../../../../components/Thumb/Thumb";
import TextField from "@material-ui/core/TextField";
import DatePicker from "../../../../../components/DatePicker/DatePicker";
import {getGenres} from "../../../FilmsPage.strings/genres";
import {ICommonDialogActionProps} from "./Dialog_type_action.typings";
import {dateToSqlFormat} from "../../../../../src.utils/parseDate";
import './Dialog_action.css';

const cnDialog = cn('DialogAddFilm');

class CommonDialogFilm extends React.Component<ICommonDialogActionProps> {
    public render(): React.ReactNode {
        const {
            id,
            btnText,
            date,
            name,
            genres,
            preview,
            onSubmit,
            handleChange,
        } = this.props;

        return (
            <>
                <div className={cnDialog('Controls')}>
                    <DatePicker
                        className={cnDialog('Date')}
                        label={local['Date']}
                        value={date || new Date()}
                        onChange={(date: Date) => {
                            handleChange({date});
                        }}
                    />
                    <TextField
                        className={cnDialog('id')}
                        id="add-film-id"
                        label={local['ID']}
                        value={id}
                        onChange={(e) => handleChange({id: e.target.value})}
                        margin="normal"
                    />
                    <TextField
                        className={cnDialog('Name')}
                        id="add-film-name"
                        label={local['Name']}
                        value={name}
                        onChange={(e) => handleChange({name: e.target.value})}
                        margin="normal"
                    />
                    <SelectCheckBox
                        className={cnDialog('Genres')}
                        arr={getGenres()}
                        label={local['Genres']}
                        current={genres}
                        onChange={(genres: string[]) => {
                            handleChange({genres})
                        }}
                    />
                    <TextField
                        className={cnDialog('Name')}
                        id="add-film-image-src"
                        label={local["Image url"]}
                        value={preview}
                        onChange={(e) => handleChange({preview: e.target.value})}
                        margin="normal"
                    />
                </div>
                <div>
                    <Thumb
                        user={{id: '0', email: '', nick: 'Nick'}}
                        menuItems={[]}
                        onContentClick={() => {}}
                        onStarClick={() => {}}
                        onFavoriteClick={() => {}}
                        film={{
                            id: 'testID',
                            name: this.props.name || local['Name'],
                            studio: 'T',
                            date: date ? dateToSqlFormat(date) : undefined,
                            preview: this.props.preview || 'https://www.ticketpro.by/storage/img/no-image.png',
                            genres: this.props.genres,
                            stars: 0,
                            is_favorite: false,
                            set_star: false,
                            stars_users: 0,
                        }}
                    />
                    <div onClick={onSubmit} className={cnDialog('Btn')}>
                        <Button variant="contained"
                                size="medium"
                                color="secondary"
                        >
                            {btnText}
                        </Button>
                    </div>
                </div>
            </>
        );
    }
}

export default CommonDialogFilm;
