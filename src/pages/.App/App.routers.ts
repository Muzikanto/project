import {ComponentClass} from "react";
import IntroPage from "../IntroPage/IntroPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import LoginPage from "../LoginPage/LoginPage";
import ChessPage from "../ChessPage/ChessPage";
import GamePage from "../GamePage/GamePage";

const AppRouters: Array<{ url: string, el: ComponentClass }> = [
    {url: '/page1', el: IntroPage},
    {url: '/register', el: RegisterPage},
    {url: '/login', el: LoginPage},
    {url: '/games/chess', el: ChessPage},
    {url: '/games/test', el: GamePage}
];

export default AppRouters;