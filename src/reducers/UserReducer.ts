export interface IUser {
    id: number;
    email: string;
    name: string;
    surname: string;
    patronymic: string;
}

export interface IUserOptions {
    user: IUser | null;
}

const initialState: IUserOptions = {
    user: null
};

const UserReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_USER':
            return {...state, ...action.data};
        default:
            return state
    }
};

export default UserReducer;
