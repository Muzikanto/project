import {IChessState} from "../../../pages/ChessPage/ChessPage.components/Chess/Chess.typings";

export interface IChessOptions {
    state: IChessState;
    room: string;
    users: { [key: string]: string };
}
