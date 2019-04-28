import * as React from 'react';
import {cn} from '@bem-react/classname';
import {
    IChessField,
    IChessFigure,
    IChessItem,
    IChessNewAction,
    IChessPos,
    IChessProps,
    IChessState
} from "./Chess.typings";
import './Chess.css'

const cnChess = cn('Chess');

class Chess extends React.Component<IChessProps> {
    state: IChessState;

    constructor(props: IChessProps) {
        super(props);
        this.state = {
            field: this.getStartField(),
            playerHod: 'white',
            check: '',
            current: undefined,
            king: {
                white: {
                    x: 4,
                    y: 7
                },
                black: {
                    x: 4,
                    y: 0
                }
            }
        }
    }

    private getStartField(): IChessField {
        const field = new Array(8).fill(0);
        for (let y = 0; y < 8; y++) {
            field[y] = new Array(8).fill('');
        }
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                field[y][x] = {type: '', action: ''}
            }
        }

        for (const v of [{x: 0, y: 0}, {x: 0, y: 7}, {x: 7, y: 0}, {x: 7, y: 7}]) {
            field[v.y][v.x].type = 'rook';
        }
        for (const v of [{x: 1, y: 0}, {x: 6, y: 0}, {x: 1, y: 7}, {x: 6, y: 7}]) {
            field[v.y][v.x].type = 'knight';
        }
        for (const v of [{x: 2, y: 0}, {x: 5, y: 0}, {x: 2, y: 7}, {x: 5, y: 7}]) {
            field[v.y][v.x].type = 'bishop';
        }
        for (const v of [{x: 3, y: 0}, {x: 3, y: 7}]) {
            field[v.y][v.x].type = 'queen';
        }
        for (const v of [{x: 4, y: 0}, {x: 4, y: 7}]) {
            field[v.y][v.x].type = 'king';
        }
        const pawnPositions = [];
        for (let i = 0; i < 8; i++) {
            pawnPositions.push({x: i, y: 1});
            pawnPositions.push({x: i, y: 6});
        }
        for (const v of pawnPositions) {
        field[v.y][v.x].type = 'pawn';
        }

        for (let y = 0; y < 2; y++) {
            for (let x = 0; x < 8; x++) {
                field[y + 6][x].player = 'white';
                field[y][x].player = 'black';
            }
        }

        return field as IChessField;
    }

    public render() {
        return (
            <div className={cnChess('Container', {
                hod: this.props.rotate && this.state.playerHod
            })}>
                {
                    this.state.field.map((row: IChessItem[], y: number) => {
                        return row.map((el: IChessItem, x: number) => {
                            const cellMix = {
                                ...(x + y % 2) % 2 === 0 ? {white: true} : {black: true},
                                action: this.props.helper && el.action,
                                current: this.state.current && this.state.current.pos.y === y && this.state.current.pos.x === x,
                            };
                            const itemMix = {
                                color: el.player,
                                hod: this.props.rotate && this.state.playerHod,
                                figure: el.type
                            };

                            return (
                                <div key={`ChessCell${y}-${x}`} className={cnChess('Cell', cellMix)}
                                     onClick={this.onClick(el, {y, x})}>
                                    <div className={cnChess('Item', itemMix)}/>
                                </div>
                            )
                        });
                    })
                }
            </div>
        )
    }

    private onClick(item: IChessItem, pos: IChessPos) {
        return () => {
            const current = this.state.current;
            const isMyChess = !current && item.player === this.state.playerHod ||
                current && (item.action || item.player === this.state.playerHod);

            if (isMyChess) {
                if (item.action && current) {
                    this.moveFigure(item, pos);
                } else {
                    this.setState({
                        current: {pos, item},
                        field: this.getNewField(item, pos)
                    });
                }
            }
        }
    }

    protected moveFigure(item: IChessItem, pos: IChessPos) {
        const current = this.state.current;

        if (current && item.type !== 'king') {
            const field = this.copyField();

            if(current.item.type === 'pawn' && (this.state.playerHod === 'white' && pos.y === 0 || this.state.playerHod === 'black' && pos.y === 7)){
                let newFigure: IChessFigure = '';
                while(true) {
                    const value = prompt('Enter new Figure: rook, queen, knight, bishop') as IChessFigure;
                    if (value === 'rook' || value === 'queen' || value === 'knight' || value === 'bishop'){
                        newFigure = value;
                        break;
                    } else {
                        alert('Please enter valid figure');
                    }
                }
                field[pos.y][pos.x] = {type: newFigure, action: '', player: current.item.player};
            } else {
                field[pos.y][pos.x] = {type: current.item.type, action: '', player: current.item.player};
            }
            field[current.pos.y][current.pos.x] = {type: '', action: '', player: ''};


            const newKingPos: any = {};
            if (current.item.type === 'king') {
                newKingPos[this.state.playerHod] = pos;
            }

            const kingPos = current.item.type === 'king' ? pos : this.state.king[this.state.playerHod];
            const isShah = this.checkShah(kingPos, field);

            if (!isShah) {
                this.setState({
                    current: undefined,
                    field,
                    king: {...this.state.king, ...newKingPos},
                    playerHod: this.state.playerHod === 'black' ? 'white' : 'black',
                });
            }
        }
    }

    private getFieldActions(figure: IChessItem, pos: IChessPos, field: IChessField) {
        const listActions: IChessNewAction[] = [];

        const {
            lineVectors,
            diagonalVectors,
            kingVectors,
            horseVectors,
            pawnActions,
            easyActions,
            hardActions,
        } = this.getVectorsAndActions();
        const player = figure.player as 'white' | 'black';

        switch (figure.type) {
            case 'rook':
                listActions.push.apply(listActions, hardActions(lineVectors(), player, pos, field));
                break;
            case 'knight':
                listActions.push.apply(listActions, easyActions(horseVectors(), player, pos, field));
                break;
            case 'bishop':
                listActions.push.apply(listActions, hardActions(diagonalVectors(), player, pos, field));
                break;
            case 'queen':
                listActions.push.apply(listActions, hardActions([...diagonalVectors(), ...lineVectors()], player, pos, field));
                break;
            case 'king':
                listActions.push.apply(listActions, easyActions(kingVectors(), player, pos, field));
                break;
            case 'pawn':
                listActions.push.apply(listActions, pawnActions(player, pos, field));
                break;
        }

        const checkedActions = [];
        for (let i = 0; i < listActions.length; i++) {
            const action = listActions[i];
            const secondField = this.copyField();
            secondField[action.y][action.x] = {...figure};
            secondField[pos.y][pos.x] = {type: '', player: '', action: ''};
            !this.checkShah(figure.type === 'king' ? action : this.state.king[this.state.playerHod], secondField) && checkedActions.push(action);
        }

        return checkedActions;
    }

    private checkShah(pos: IChessPos, field: IChessField) {
        const {
            lineVectors,
            diagonalVectors,
            kingVectors,
            horseVectors,
            pawnActions,
            easyActions,
            hardActions,
        } = this.getVectorsAndActions();

        const line = hardActions(lineVectors(), this.state.playerHod, pos, field)
            .filter(el => el.figure === 'queen' || el.figure === 'rook');
        const diagonal = hardActions(diagonalVectors(), this.state.playerHod, pos, field)
            .filter(el => el.figure === 'queen' || el.figure === 'bishop');
        const horse = easyActions(horseVectors(), this.state.playerHod, pos, field)
            .filter(el => el.figure === 'knight');
        const king = easyActions(kingVectors(), this.state.playerHod, pos, field)
            .filter(el => el.figure === 'king');
        const pawn = pawnActions(this.state.playerHod, pos, field)
            .filter(el => el.figure === 'pawn');

        return [...line, ...diagonal, ...horse, ...king, ...pawn].filter(el => el.action === 'attack').length !== 0;
    }

    private getVectorsAndActions() {
        const lineVectors = () => {
            return [
                {
                    step: {x: 0, y: 1},
                    check: (_: number, y: number) => y < 8
                },
                {
                    step: {x: 0, y: -1},
                    check: (_: number, y: number) => y >= 0
                },
                {
                    step: {x: 1, y: 0},
                    check: (x: number, _: number) => x < 8
                },
                {
                    step: {x: -1, y: 0},
                    check: (x: number, _: number) => x >= 0
                }
            ];
        };
        const diagonalVectors = () => {
            return [
                {
                    step: {x: 1, y: 1},
                    check: (x: number, y: number) => y < 8 && x < 8
                },
                {
                    step: {x: 1, y: -1},
                    check: (x: number, y: number) => y >= 0 && x < 8
                },
                {
                    step: {x: -1, y: 1},
                    check: (x: number, y: number) => x >= 0 && y < 8
                },
                {
                    step: {x: -1, y: -1},
                    check: (x: number, y: number) => x >= 0 && y >= 0
                }
            ];
        };
        const kingVectors = () => {
            return [
                {x: -1, y: -1},
                {x: 0, y: -1},
                {x: 1, y: -1},
                {x: -1, y: 0},
                {x: 1, y: 0},
                {x: -1, y: 1},
                {x: 0, y: 1},
                {x: 1, y: 1}
            ];
        };
        const horseVectors = () => {
            return [
                {x: -1, y: -2},
                {x: -1, y: 2},
                {x: -2, y: -1},
                {x: -2, y: 1},
                {x: 1, y: 2},
                {x: 1, y: -2},
                {x: 2, y: -1},
                {x: 2, y: 1}
            ];
        };

        const pawnActions = (player: 'white' | 'black', pos: IChessPos, field: IChessField) => {
            const actions: IChessNewAction[] = [];

            const steps = player === 'black' ? 1 : -1;
            if (field[pos.y + steps] && !field[pos.y + steps][pos.x].type) {
                actions.push({
                    x: pos.x,
                    y: pos.y + steps,
                    action: 'active',
                    figure: field[pos.y + steps][pos.x].type
                });
                if (pos.y === (player === 'black' ? 1 : 6) && field[pos.y + steps * 2] && !field[pos.y + steps * 2][pos.x].type) {
                    actions.push({
                        x: pos.x,
                        y: pos.y + steps * 2,
                        action: 'active',
                        figure: field[pos.y + steps * 2][pos.x].type
                    });
                }
            }
            for (const v of [1, -1]) {
                if (field[pos.y + steps] && field[pos.y + steps][pos.x + v] &&
                    field[pos.y + steps][pos.x + v].type && field[pos.y + steps][pos.x + v].player !== player) {
                    actions.push({
                        x: pos.x + v,
                        y: pos.y + steps,
                        action: 'attack',
                        figure: field[pos.y + steps][pos.x + v].type
                    });
                }
            }

            return actions;
        };
        const easyActions = (vectors: any, player: 'white' | 'black', pos: IChessPos, field: IChessField) => {
            const actions: IChessNewAction[] = [];

            for (const vector of vectors) {
                const y = pos.y + vector.y;
                const x = pos.x + vector.x;

                if (field[y] && field[y][x]) {
                    const item = field[y][x];
                    if (!item.type) {
                        actions.push({x, y, action: 'active', figure: item.type});
                    } else {
                        if (item.player !== player) {
                            actions.push({x, y, action: 'attack', figure: item.type});
                        }
                    }
                }
            }
            return actions;
        };
        const hardActions = (vectors: any, player: 'white' | 'black', pos: IChessPos, field: IChessField) => {
            const actions: IChessNewAction[] = [];

            for (const vector of vectors) {
                for (let y = pos.y + vector.step.y, x = pos.x + vector.step.x; vector.check(y, x); x += vector.step.x, y += vector.step.y) {
                    if (field[y] && field[y][x]) {
                        const item = field[y][x];
                        if (!item.type) {
                            actions.push({x, y, action: 'active', figure: item.type});
                        } else {
                            if (item.player !== player) {
                                actions.push({x, y, action: 'attack', figure: item.type});
                            }
                            break;
                        }
                    } else {
                        break;
                    }
                }
            }

            return actions;
        };

        return {
            lineVectors,
            diagonalVectors,
            kingVectors,
            horseVectors,
            pawnActions,
            easyActions,
            hardActions,
        }
    }

    private getNewField(figure: IChessItem, pos: IChessPos) {
        const field = this.copyField();
        const listActions = this.getFieldActions(figure, pos, field);

        for (const item of listActions) {
            field[item.y][item.x].action = item.action;
        }

        return field
    }

    private copyField() {
        const field: IChessField = [];

        for (let y = 0; y < 8; y++) {
            field[y] = [];
            for (let x = 0; x < 8; x++) {
                field[y][x] = {...this.state.field[y][x], action: ''};
            }
        }

        return field;
    }
}

export {
    Chess
};
