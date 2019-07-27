import {LocalAuth} from "./local_auth";
import {YandexAuthCB} from "./yandex_auth_cb";
import {YandexAuth} from "./yandex_auth";
import {GoogleAuthCB} from "./google_auth_cb";
import {Logout} from "./logout";
import {GoogleAuth} from "./google_auth";
import {LocalRegister} from "./register";
import {VkAuthCB} from "./vkontakte_auth_cb";
import {VkAuth} from "./vkontakte_auth";

const AuthorizeRouters = {
    GoogleAuth,
    GoogleAuthCB,
    LocalAuth,
    Logout,
    LocalRegister,
    VkAuth,
    VkAuthCB,
    YandexAuth,
    YandexAuthCB,
};

export default AuthorizeRouters;