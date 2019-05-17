import * as React from 'react';
import './FilmsPage.css'
import ImgMediaCard from "../../components/Thumb/Thumb";
import {cn} from "@bem-react/classname";

const cnFilmsPage = cn('FilmsPage');

class FilmsPage extends React.Component {
    public render() {
        return (
            <section className={cnFilmsPage()}>
                <ImgMediaCard
                    url={'https://cdnimg.rg.ru/img/content/167/02/68/kinopoisk.ru-Avengers_3A-Endgame-3193444_d_850.jpg'}
                    date={'26 april 2019'}
                    title={'Avangers'}
                    description={'Fantasy, Thriller'}
                    stars={3}
                    share={1}
                    avatar={'М'}
                />
                <ImgMediaCard
                    url={'https://cdnimg.rg.ru/img/content/167/02/68/kinopoisk.ru-Avengers_3A-Endgame-3193444_d_850.jpg'}
                    date={'26 april 2019'}
                    title={'Avangers'}
                    description={'Fantasy, Thriller'}
                    stars={3}
                    share={1}
                    avatar={'М'}
                />
                <ImgMediaCard
                    url={'http://www.spletnik.ru/img/2015/12/ayna/20151208-star-post.jpg'}
                    date={'15 november 2017'}
                    title={'Star Wars'}
                    description={'Fantasy'}
                    stars={7.5}
                    share={5}
                    avatar={'Р'}
                />
                <ImgMediaCard
                    url={'http://www.spletnik.ru/img/2015/12/ayna/20151208-star-post.jpg'}
                    date={'15 november 2017'}
                    title={'Star Wars'}
                    description={'Fantasy'}
                    stars={7.5}
                    share={5}
                    avatar={'Р'}
                />
            </section>
        )
    }
}

export default FilmsPage
