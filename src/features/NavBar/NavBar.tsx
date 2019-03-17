import * as React from 'react';
import {cn} from "@bem-react/classname";
import {Link} from "react-router-dom";

import {shortText} from "./NavBar.helpers/index";
import {INavBar, INavBarItem} from "./NavBar.typings/index";

import './NavBar.css'


const cnNav = cn('NavBar');

class NavBar extends React.Component<INavBar> {
    protected getItems() {
        return this.props.items.map((el: INavBarItem) => {
            if (!el.popup) {
                return (<li key={el.text + 'nav'} className={cnNav('Item')}><Link to={el.url}>{el.text}</Link></li>)
            } else {
                return (
                    <li key={el.text + 'nav'} className={cnNav('Item')}><Link to={el.url}>{el.text}</Link>
                        <ul className={cnNav('DropDown')}>
                            {
                                el.popup.map((el2: { url: string, text: string }) => {
                                    return ( <li key={el2.text + 'nav'} className={cnNav('Item')}><Link to={el2.url}>{el2.text}</Link></li>)
                                })
                            }
                        </ul>
                    </li>
                )
            }
        });
    }

    protected getRight() {
        return !this.props.user ?
            <ul className={cnNav('Right')}>
                <li className={cnNav('Item')}><Link to={'#'}>Войти</Link></li>
                <li className={cnNav('Item')}><Link to={'#'}>Регистрация</Link></li>
            </ul>
            : <ul className={cnNav('Right')}>
                <li className={cnNav('Item')}><Link to={'$'}>{shortText(this.props.user.name, 8)}</Link></li>
                <li className={cnNav('Item')}><Link to="#" onClick={this.props.dropSession}>Выйти</Link></li>
            </ul>;
    }

    public render() {
        return (
            <header className={cnNav()}>
                <Link to="/" className={cnNav('Brand')}>
                    <div className={cnNav('Logo')}/>
                </Link>
                <ul className={cnNav('List')}>
                    {this.getItems()}
                </ul>
                {this.getRight()}
            </header>
        )
    }
}

export default NavBar;
