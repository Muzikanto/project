import * as React from 'react';
import {cn} from "@bem-react/classname";
import {Link} from "react-router-dom";
import {shortText} from "./NavBar.helpers";
import {INavBarProps, INavBarItem} from "./NavBar.typings";
import './NavBar.css'

const cnNav = cn('NavBar');

class NavBar extends React.Component<INavBarProps> {

    protected getItems() {
        return this.props.items.map((el: INavBarItem) => {
            if (!el.popup) {
                return this.getItem(el);
            } else {
                return (
                    <li key={el.text + 'nav'} className={cnNav('Item')}><Link to={el.url}>{el.text}</Link>
                        <ul className={cnNav('DropDown')}>
                            {
                                el.popup.map((el2: { url: string, text: string }) => {
                                    return this.getItem(el2);
                                })
                            }
                        </ul>
                    </li>
                )
            }
        });
    }

    protected getItem(el: INavBarItem, onClick?: () => void) {
        return (
            <li
                key={el.text + 'nav'}
                onClick={onClick}
                className={cnNav('Item')}
            >
                <Link to={el.url}>{el.text}</Link>
            </li>
        );
    }

    protected getRight() {
        return !this.props.user ?
            <ul className={cnNav('Right')}>
                {this.getItem({text: 'Войти', url: '/login'})}
                {this.getItem({text: 'Регистрация', url: '/register'})}
            </ul>
            : <ul className={cnNav('Right')}>
                {this.getItem({text: shortText(this.props.user.nick, 10), url: '#'})}
                {this.getItem({text: 'Выйти', url: '#'}, this.props.dropSession)}
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
