export interface IUser {
    id: number;
    email: string;
    nick: string;
}

export interface IUserOptions {
    user: IUser | null;
}
