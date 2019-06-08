import {IUserOptions} from "../User.typings";
import {USER_ACTIONS} from "./keys";

export const actionUserSetProps = (data: Partial<IUserOptions>) => ({
    data,
    type: USER_ACTIONS.SET
} as const);
