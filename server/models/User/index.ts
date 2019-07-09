export interface IUserModel {
    id: string;
    email: string;
    hashed_password: string;
    salt: string;
    nick: string;
}
