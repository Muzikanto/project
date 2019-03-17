import {cn} from '@bem-react/classname';
import * as React from 'react';

import './Paginator.css'


const cnPagin = cn('Paginator');

interface IPaginator {
    count: number;
    max: number;
}

class Paginator extends React.Component<IPaginator> {
    public state: { current: number, skip: number };

    constructor(props: any) {
        super(props);
        if (this.props.count < this.props.max)
            throw Error('Need count > max');
        this.state = {
            current: 0,
            skip: 0
        };
    }

    public render() {
        const items = [];
        this.state.skip = this.state.skip + this.props.max <= this.props.count ? this.state.skip : this.state.skip - 1;
        for (let i = this.state.skip, j = 0; j < this.props.max; i++, j++) {
            items.push(
                <div key={i}>
                    <input className="hide" type="radio" name="currentPage" id={`pag_${i}`} value={i}
                           onChange={this.change(i)} checked={i === this.state.current}/>
                    <button onClick={this.change(i)}
                            className={cnPagin('Item', {active: i === this.state.current})}>{i + 1}</button>
                </div>);
        }
        return (
            <div className={cnPagin()}>
                <button className={cnPagin('Button')} onClick={this.decrement}>{'<'}</button>
                {items}
                <button className={cnPagin('Button')} onClick={this.increment}>{'>'}</button>
            </div>)
    }

    private change = (value: any) => (_: any) => {
        this.setState({current: value})
    };
    private increment = () => {
        this.setState({current: this.state.current + 1 < this.props.count ? this.state.current + 1 : this.state.current});
        if (this.state.current >= this.props.max - 1 && this.state.current + 1 < this.props.count)
            this.state.skip++;
    };
    private decrement = () => {
        this.setState({current: this.state.current - 1 >= 0 ? this.state.current - 1 : this.state.current});
        if (this.state.current - 1 >= 0 && this.state.skip > 0)
            this.state.skip--;
    }
}

export default Paginator