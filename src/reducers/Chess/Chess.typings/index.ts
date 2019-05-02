import {IChessState} from "../../../features/Chess/Chess.typings";

export type IChessOptions = {
    state: IChessState;
    room: string;
    users: { [key: string]: string };
};
