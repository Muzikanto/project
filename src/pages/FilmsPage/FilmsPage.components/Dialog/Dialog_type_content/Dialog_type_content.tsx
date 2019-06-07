import * as React from "react";
import YouTube from '../../../../../components/Youtube/Youtube';
import Dialog from "../../../../../components/Dialog";
import {IDialogContentProps} from "./Dialog.typings";
import './Dialog_type_content.scss';
import {cn} from "@bem-react/classname";
import {CircularProgress, Typography} from "@material-ui/core";
import {IFilmFull} from "../../../../../reducers/Films/Films.typings";
import {parseDate} from "../../../../../utils/parseDate";

const cnFilmContent = cn('FilmContent');

class DialogTypeContent extends React.Component<IDialogContentProps> {
    render(): React.ReactNode {
        const {
            title,
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
                    filmData ? this.getContent(filmData) :
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

    protected getContent(filmData: IFilmFull) {
        const {
            film,
        } = this.props;

        const isNew = film.date ? new Date(film.date) > new Date() : null;
        const fresh_date = film.date && !isNew ?
            Math.ceil(Math.abs(new Date(film.date).getTime() - new Date().getTime()) / (1000 * 3600 * 24)) : null;

        return (
            <>
                <div
                    style={{background: `url(${film.image_src})`}}
                    className={cnFilmContent('Image', ['ShadowBox'])}
                />
                <div style={{margin: '0 auto', textAlign: 'center'}}>
                    {
                        filmData.trailer_id ? <YouTube
                            id={filmData.trailer_id}
                            width={640}
                            height={390}
                            className={cnFilmContent('Trailer', ['ShadowBox'])}
                        /> : null
                    }
                    <Typography variant={'h5'}>Genres: {film.genres.join(', ')}</Typography>
                    <Typography
                        variant={'h5'}
                    >Date: {film.date ? <span className={cnFilmContent('Date', {
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
                    <p>{filmData.description}</p>
                </div>
            </>
        );
    }
}

export default DialogTypeContent;
