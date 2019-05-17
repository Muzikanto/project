import {IactionChessJoin, IactionChessSend, IactionChessStartGame} from "../../../../../actions/Chess";

export interface IChessState {
    field: IChessField;
    current?: {
        pos: IChessPos;
        item: IChessItem;
    };
    playerHod: 'white' | 'black';
    player: 'white' | 'black';
    check: 'white' | 'black' | '';
    king: {
        white: IChessPos;
        black: IChessPos;
    }
}

export type IChessField = IChessItem[][];

export interface IChessPos {
    x: number;
    y: number;
}

export type IChessFigure = 'bishop' | 'rook' | 'knight' | 'pawn' | 'queen' | 'king' | '';
export type IChessAction = '' | 'active' | 'attack';

export interface IChessItem {
    type: IChessFigure;
    action: IChessAction;
    player: 'black' | 'white' | '';
}

export interface IChessNewAction extends IChessPos {
    action: IChessAction;
    figure: IChessFigure;
}

export interface IChessProps {
    actionChessSend: IactionChessSend;
    actionChessStartGame: IactionChessStartGame;
    actionChessJoin: IactionChessJoin;

    state: IChessState;
    users: { [key: string]: string };

    helper?: boolean;
}

export interface IChessStart {
    users: { [key: string]: string };
    room: string;
}