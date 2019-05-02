import {authError, IAuthError} from "../models/postgreSql/base";

interface IData {
    nick?: string;
    password?: string;
    email?: string;
    password_repeat?: string;
}

export function checkValid(obj: IData) {
    return new Promise((resolve: () => void, reject: (err: IAuthError) => void) => {
        if (typeof obj.nick === "string") {
            const v = checkOtherValid("Nick", obj.nick);
            if (v) reject(new authError(v));
        }
        if (typeof obj.email === "string") {
            const v = checkEmailValid(obj.email);
            if (v) reject(new authError(v));
        }
        if (typeof obj.password === "string") {
            const v = checkOtherValid("Password", obj.password);
            if (v) reject(new authError(v));
        }
        if (typeof obj.password_repeat === "string") {
            const v = checkOtherValid("Password Repeat", obj.password_repeat);
            if (v) reject(new authError(v));
        }
        if (obj.password && obj.password_repeat)
            if (obj.password !== obj.password_repeat)
                reject(new authError("Passwords Not Equals"));
        resolve();
    });
}

function checkEmailValid(text: string) {
    if (!text.match(/[a-z0-9_]+@[a-z]{2,8}.[a-z]{2,8}$/i)) return "Email is Not Valid";
    else if (text.split('@')[0].length < 5) return "Email is short, need len > 4";
    else if (text.split('@')[0].length > 12) return "Email is big, need len < 12";
    return null;
}

function checkOtherValid(key: string, text: string | undefined) {
    if (!text) return `${key} is not valid`;
    if (!text.match(/[a-z0-9_]+$/i)) return `${key} is Not Valid`;
    else if (text.length < 5) return `${key} is short, need len > 4`;
    else if (text.length > 12) return `${key} is big, need len < 12`;
    return null;
}
