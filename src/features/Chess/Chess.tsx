import * as React from 'react';
import {cn} from '@bem-react/classname';
import {IChessFigure, IChessHashMap, IChessState} from "./Chess.typings";
import './Chess.css'

const cnChess = cn('Chess');

class Chess extends React.Component {
    state: IChessState;
    private hashMap = this.getHashMap();

    constructor(props: any) {
        super(props);
        this.state = {
            arr: this.getStartField(),
            next: [],
        }
    }

    private getStartField() {
        const field = new Array(64)
            .fill('');

        for (const v of [0, 7, 56, 63, 34]) {
            field[v] = 'Ладья';
        }
        for (const v of [1, 6, 57, 62]) {
            field[v] = 'Конь';
        }
        for (const v of [2, 5, 58, 61]) {
            field[v] = 'Слон';
        }
        for (const v of [3, 59]) {
            field[v] = 'Ферзь';
        }
        for (const v of [4, 60]) {
            field[v] = 'Король';
        }
        for (const v of [8, 9, 10, 11, 12, 13, 14, 15, 48, 49, 50, 51, 52, 53, 54, 55]) {
            field[v] = 'Пешка';
        }

        return field;
    }

    public render() {
        return (
            <div className={cnChess('Container')}>
                {
                    this.state.arr.map((el: IChessFigure, index: number) => {
                        const mix = {
                            ...this.getColorMix(index),
                            active: this.state.next[index] === 1,
                            attack: this.state.next[index] === 2,
                            current: this.state.current === index,
                        };

                        return (
                            <div key={'ChessCell' + index} className={cnChess('Cell', mix)}
                                 onClick={this.onClick(el, index)}>
                                <div className={cnChess('Item')}>{el}</div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    private onClick(figure: IChessFigure, index: number) {
        return () => {
            const next = [];
            const hashFigure = this.hashMap[figure];

            if (hashFigure) {
                const hod = hashFigure.hod(index);
                for (const v of hod.active) {
                    next[v] = 1;
                }
                for (const v of hod.attack) {
                    next[v] = 2;
                }
            }

            this.setState({
                next,
                current: hashFigure && index,
            });
        }
    }

    private getColorMix(index: number) {
        const calcColor = (index - (index % 8)) / 8 % 2;

        return calcColor === 0 && index % 2 === 0 || calcColor === 1 && index % 2 === 1 ?
            {white: true} : {black: true}
    }

    private getHashMap() {
        return {
            'Ладья': {
                text: 'Л',
                hod: (index: number) => {
                    const result: {
                        attack: number[],
                        active: number[],
                    } = {
                        attack: [],
                        active: [],
                    };
                    for(const v of [{step: 8, check: (i: number)=> i < 64}, {step: -8, check: (i: number)=> i >= 0}]) {
                        for (let i = index; v.check(i); i += v.step) {
                            if (i !== index) {
                                if (!this.state.arr[i]) {
                                    result.active.push(i);
                                } else {
                                    break;
                                }
                            }
                        }
                    }

                    return result;
                }
            },
            'Конь': {
                text: 'К',
                hod: (index: number) => {
                    return {
                        attack: [],
                        active: [index],
                    };
                }
            },
            'Слон': {
                text: 'С',
                hod: (index: number) => {
                    return {
                        attack: [],
                        active: [index],
                    };
                }
            },
            'Ферзь': {
                text: 'Ф',
                hod: (index: number) => {
                    return {
                        attack: [],
                        active: [index],
                    };
                }
            },
            'Король': {
                text: 'К',
                hod: (index: number) => {
                    return {
                        attack: [],
                        active: [index],
                    };
                }
            },
            'Пешка': {
                text: 'П',
                hod: (index: number) => {
                    return {
                        attack: [],
                        active: [index],
                    };
                }
            },
        } as IChessHashMap;
    }
}

export {
    Chess
};
