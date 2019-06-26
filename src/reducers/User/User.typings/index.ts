export interface IUser {
    id: string;
    email: string;
    nick: string;
}

export interface IUserOptions {
    user: IUser | null;
}
