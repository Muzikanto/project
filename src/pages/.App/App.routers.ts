import {ComponentClass} from "react";
import RegisterPage from "../RegisterPage/RegisterPage";
import LoginPage from "../LoginPage/LoginPage";
import FilmsPage from "../FilmsPage/FilmsPage";

const AppRouters: Array<{ url: string, el: ComponentClass }> = [
    {url: '/films', el: FilmsPage},
    {url: '/register', el: RegisterPage},
    {url: '/login', el: LoginPage},
];

export default AppRouters;
