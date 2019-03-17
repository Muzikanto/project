import * as React from 'react';
import './WithLeftMenu.css'
import {cn} from "@bem-react/classname";
import Timer = NodeJS.Timer;
import {RefObject} from "react";
import {classnames} from "@bem-react/classnames";

const cnLeftMenu = cn('LeftMenu');

interface IWithLeftMenu {
    test?: boolean;
}

class WithLeftMenu extends React.Component<IWithLeftMenu> {
    public state: { isShow: boolean, timer: Timer | null } = {isShow: false, timer: null};
    private ref: RefObject<HTMLDivElement>;

    constructor(props: any) {
        super(props);
        this.ref = React.createRef();
    }

    public render() {
        return (
            <div className={cnLeftMenu('Container')}>
                <div ref={this.ref} className={classnames(cnLeftMenu(),cnLeftMenu({hide: !this.state.isShow, show: this.state.isShow}))}>
                    <div className={cnLeftMenu('Menu')}>
                        <h1>text text text</h1>
                    </div>
                    <button onClick={this.nextIsShowMenu}>Hide</button>
                </div>
                <div className={cnLeftMenu('Content')}>
                    <button className={cnLeftMenu('Btn')} onClick={this.nextIsShowMenu}>Show</button>
                    {this.props.children}
                </div>
            </div>
        );
    };

    public nextIsShowMenu = () => {
        const el = this.ref.current;
        const obj: { timer: Timer | null } = {timer: null};
        if (el) {
            if (!this.state.isShow) {
                if (this.state.timer)
                    clearTimeout(this.state.timer);
                el.style.display = 'block';
            } else {
                obj.timer = setTimeout(() => {
                    el.style.display = 'none';
                }, 700);
            }
        }
        this.setState({isShow: !this.state.isShow, ...obj})
    }
}

export default WithLeftMenu;
