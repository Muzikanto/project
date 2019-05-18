import {IFilmsOptions} from "./Films.typings";
import {IReducerAction} from "../typings";
import {actionFilmsTypes} from "../../actions/Films";
import {IThumbProps} from "../../components/Thumb/Thumb.typings";

const initialState: IFilmsOptions = {
    arr: [
        {
            id: 'test',
            title: 'Avangers',
            avatar: 'М',
            date: '26 april 2019',
            url: 'https://cdnimg.rg.ru/img/content/167/02/68/kinopoisk.ru-Avengers_3A-Endgame-3193444_d_850.jpg',
            genres: ['Fantasy', 'Thriller'],
            stars: 3,
            share: 1,
            isLiked: true,
        },
        {
            id: 'test2',
            title: 'Star Wars',
            avatar: 'F',
            date: '15 november 2017',
            url: 'http://www.spletnik.ru/img/2015/12/ayna/20151208-star-post.jpg',
            genres: ['Fantasy'],
            stars: 7.5,
            share: 5,
            isLiked: false,
        }
    ]
};

for (let i = 0; i < 10; i++) {
    initialState.arr.push(initialState.arr[0]);
    initialState.arr.push(initialState.arr[1]);
}

const FilmsReducer = (state = initialState, action: IReducerAction) => {
    switch (action.type) {
        case actionFilmsTypes.FILMS_SET_STAR:
            const arr: IThumbProps[] = state.arr.map(el=>{
                if (el.id === action.data.id) {
                    el.isLiked = true;
                    el.stars = action.data.star;
                }
                el.isLiked = true;

                return el;
            });

            return {...state, ...{arr}};
        default:
            return state
    }
};

export default FilmsReducer;
