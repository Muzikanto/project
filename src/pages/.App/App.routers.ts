import IntroPage from "../IntroPage/IntroPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import LoginPage from "../LoginPage/LoginPage";
import ChessPage from "../ChessPage/ChessPage";

const AppRouters = [
    {url: '/page1', el: IntroPage},
    {url: '/register', el: RegisterPage},
    {url: '/login', el: LoginPage},
    {url: '/chess', el: ChessPage}
];

export default AppRouters;
