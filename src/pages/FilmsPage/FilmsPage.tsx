import * as React from 'react';
import './FilmsPage.css'
import Thumb from "../../components/Thumb/Thumb";
import {cn} from "@bem-react/classname";
import {IThumbProps} from "../../components/Thumb/Thumb.typings";

const cnFilms = cn('Films');

class FilmsPage extends React.Component {
    public render() {
        const arr: IThumbProps[] = [
            {
                title: 'Avangers',
                avatar: 'М',
                date: '26 april 2019',
                url: 'https://cdnimg.rg.ru/img/content/167/02/68/kinopoisk.ru-Avengers_3A-Endgame-3193444_d_850.jpg',
                genres:['Fantasy', 'Thriller'],
                stars: 3,
                share: 1,
                isLiked: true,
            },
            {
                title: 'Star Wars',
                avatar: 'F',
                date: '15 november 2017',
                url: 'http://www.spletnik.ru/img/2015/12/ayna/20151208-star-post.jpg',
                genres: ['Fantasy'],
                stars: 7.5,
                share: 5,
                isLiked: false,
            }
        ];
        for (let i = 0; i < 10; i++) {
            arr.push({...arr[0]});
            arr.push({...arr[1]});
        }

        return (
            <section className={cnFilms('Container')}>
                {
                    arr.map((props, index) => <Thumb key={'Thumb' + index} {...props} url={props.url} className={cnFilms('Item')}/>)
                }
            </section>
        )
    }
}

export default FilmsPage
