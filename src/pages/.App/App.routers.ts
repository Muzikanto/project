import {ComponentClass} from "react";
import RegisterPage from "../RegisterPage/RegisterPage";
import LoginPage from "../LoginPage/LoginPage";
import ChessPage from "../ChessPage/ChessPage";
import GamePage from "../GamePage/GamePage";
import FilmsPage from "../FilmsPage/FilmsPage";
import MarketPage from "../MarketPage/MarketPage";

const AppRouters: Array<{ url: string, el: ComponentClass }> = [
    {url: '/films', el: FilmsPage},
    {url: '/market', el: MarketPage},
    {url: '/register', el: RegisterPage},
    {url: '/login', el: LoginPage},
    {url: '/games/chess', el: ChessPage},
    {url: '/games/test', el: GamePage}
];

export default AppRouters;
