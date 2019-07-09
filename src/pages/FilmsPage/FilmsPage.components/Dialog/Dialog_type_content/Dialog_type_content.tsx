import * as React from "react";
import Dialog from "../../../../../components/Dialog";
import {IDialogContentProps} from "./Dialog.typings";
import './Dialog_type_content.scss';
import {cn} from "@bem-react/classname";
import {CircularProgress, Typography} from "@material-ui/core";
import {IFullFilm} from "../../../../../reducers/Films/Films.typings";
import {parseDate} from "../../../../../src.utils/parseDate";

const cnFilmContent = cn('FilmContent');

class DialogTypeContent extends React.Component<IDialogContentProps> {
    public render(): React.ReactNode {
        const {
            title,
            film,
            filmData,
            onClose,
        } = this.props;

        return (
            <Dialog
                title={<Typography className={cnFilmContent('Title')} variant={'h3'}>{title}</Typography>}
                onClose={onClose}
                dialogCoreProps={{scroll: 'body', style: {maxWidth: 1300, margin: 'auto'}}}
                dialogContentProps={{className: cnFilmContent()}}
            >
                {
                    filmData ? this.getContent({...film, ...filmData}) :
                        <CircularProgress
                            value={50}
                            size={200}
                            color="secondary"
                            thickness={4}
                            className={cnFilmContent('Loader')}
                        />
                }
            </Dialog>
        );
    }

    protected getContent(film: IFullFilm) {

        return (
            <>
                <div>
                    <div
                        style={{background: `url(${film.preview})`}}
                        className={cnFilmContent('Image', ['ShadowBox'])}
                    />
                    {this.getDate(film)}
                </div>
                <div style={{margin: '0 auto', textAlign: 'center', marginLeft: 20}}>
                    <Typography variant={'h5'}>Genres: {film.genres.join(', ')}</Typography>
                    <p className={cnFilmContent('Description')}>{film.description}</p>
                    <iframe src={film.iframe_film} style={{width: 600, height: 400}} allowFullScreen={true}/>
                </div>
            </>
        );
    }

    protected getDate(film: IFullFilm) {
        const isNew = film.date ? new Date(film.date) > new Date() : null;
        const fresh_date = film.date && !isNew ?
            Math.ceil(Math.abs(new Date(film.date).getTime() - new Date().getTime()) / (1000 * 3600 * 24)) : null;

        return (
            <Typography
                variant={'h5'}
                style={{textAlign: 'center'}}
            >{isNew ? 'Выйдет' : 'Вышел'}: {film.date ? <span className={cnFilmContent('Date', {
                fresh: fresh_date ?
                    fresh_date < 60 ?
                        fresh_date < 30 ?
                            fresh_date < 15 ?
                                'hard' : 'mid'
                            : 'mid'
                        : 'low'
                    : undefined,
                new: Boolean(isNew),
            })}>{parseDate(film.date)}</span> : 'Не указана'} </Typography>
        )
    }
}

export default DialogTypeContent;
