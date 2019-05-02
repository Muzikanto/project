import IntroPage from "../IntroPage/IntroPage";
import Register from "../Register/Register";
import Login from "../Login/Login";

const AppRoutes = [
    {url: '/page1', el: IntroPage},
    {url: '/register', el: Register},
    {url: '/login', el: Login},
];

export default AppRoutes;
